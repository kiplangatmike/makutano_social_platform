import { z } from 'zod'
import { prisma } from '$lib/config/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  // Get all chapters
  if (req.method === 'GET') {
    try {

      const chapters = await prisma.chapters.findMany({
        select: {
          id: true,
          name: true,
          image: true,
          postIds: true,
          userIds: true,
        },
        orderBy: { createdAt: 'desc' },
      })

      res.status(200).json(chapters)
    } catch (error) {
      console.error(error)
      res.status(500).json(error)
    }
  }

  if (req.method === 'POST') {
    try {
      // name, description, createdBy
      const { name, description, createdBy } = z
        .object({
          name: z.string().min(1).trim(),
          description: z.string().min(1).trim(),
          createdBy: z.string().min(1).trim(),
        })
        .parse(req.body)

      const chapter = await prisma.chapters.create({
        data: {
          name,
          description,
          createdBy,
          image: "",
          userIds: [createdBy],
        },
      })

      return res.status(201).json(chapter)

    } catch (error) {
      console.error(error)
      return res.status(400).json(error)
    }
  }

  // edit a chapter
  if (req.method === 'PATCH') {
    try {
      const { id, name, description, image } = z
        .object({
          id: z.string().min(1).optional(),
          name: z.string().min(1).trim().optional(),
          description: z.string().min(1).trim().optional(),
          image: z.string().min(1).trim().optional(),
        })
        .parse(req.body)

      const chapter = await prisma.chapters.update({
        where: {
          id: id,
        },
        data: {
          name,
          description,
          image,
        },
      })

      return res.status(201).json(chapter)

    } catch (error) {
      console.error(error)
      return res.status(400).json(error)
    }
  }

  // delete a chapter
  if (req.method === 'DELETE') {
    try {
      const { id } = z
        .object({
          id: z.string().min(1),
        })
        .parse(req.body)

      const chapter = await prisma.chapters.delete({
        where: {
          id: id,
        },
      })

      return res.status(201).json(chapter)

    } catch (error) {
      console.error(error)
      return res.status(400).json(error)
    }
  }

  return res.status(405).end()
}

export default handler;