import { z } from 'zod'
import { prisma } from '$lib/config/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { extractKeywords, getRecommendedPosts } from '$lib/utils/recommender.utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  // Get all users
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
      })

      return res.status(200).json(users)

    } catch (error) {
      console.error(error)
      res.status(500).json(error)
    }
  }

  return res.status(405).end()
}

export default handler;