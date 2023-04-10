import { z } from 'zod'
import { prisma } from '$lib/config/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { extractKeywords, getRecommendedPosts } from '$lib/utils/recommender.utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  // Get all posts
  if (req.method === 'GET') {
    try {
      const posts = await prisma.post.findMany({
        include: {
          author: {
            select: {
              id: true,
              image: true,
              name: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      })

      // recommendation logic
      const user = await prisma.user.findUnique({
        where: {
          id: session?.user?.uid ?? '',
        },
        select: {
          likedPosts: true,
        },
      })

      const recommendedPosts = getRecommendedPosts(user?.likedPosts ?? [], posts);

      console.log(`Total posts: ${posts?.length} Found ${recommendedPosts?.length} recommended posts for user ${session?.user?.uid ?? ''}`)

      res.status(200).json(recommendedPosts?.length > 0 ? recommendedPosts : posts)
    } catch (error) {
      console.error(error)
      res.status(500).json(error)
    }
  }

  // Create a new post
  if (req.method === 'POST') {
    try {
      const { input, media } = z
        .object({
          input: z.string().min(1).trim(),
          media: z.array(z.string().url()).optional(),
        })
        .parse(req.body)

      try {
        const keywords = extractKeywords(input);
        const post = await prisma.post.create({
          data: {
            input,
            media,
            keywords,
            authorId: session?.user?.uid ?? '',
          },
          include: {
            author: {
              select: {
                id: true,
                image: true,
                name: true,
              },
            },
          },
        })
        res.status(201).json(post)
      } catch (error) {
        console.error(error)
        res.status(500).json(error)
      }
    } catch (error) {
      console.error(error)
      return res.status(400).json(error)
    }
  }

  return res.status(405).end()
}

export default handler;