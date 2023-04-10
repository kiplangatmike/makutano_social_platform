import { z } from 'zod'
import { prisma } from '$lib/config/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

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
      res.status(200).json(posts)
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
        const post = await prisma.post.create({
          data: {
            input,
            media,
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