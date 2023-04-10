import { z } from 'zod'
import { prisma } from '$lib/config/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = z.string().parse(req.query.id)

    if (req.method === 'GET') {
      try {
        const post = await prisma.post.findUnique({
          where: { id: id },
          include: {
            author: {
              select: {
                email: true,
                id: true,
                image: true,
                name: true,
              },
            },
          },
        })
        return res.status(200).json(post)
      } catch (error) {
        console.error(error)
        return res.status(500).json(error)
      }
    }

    if (req.method === 'PATCH') {
      try {
        const { input, media } = z
          .object({
            input: z.string().min(1).trim().optional(),
            media: z.array(z.string().url()).optional(),
          })
          .parse(req.body)

        const post = await prisma.post.update({
          where: { id: id },
          data: { input, media },
          include: {
            author: {
              select: {
                email: true,
                id: true,
                image: true,
                name: true,
              },
            },
          },
        })
        return res.status(200).json(post)
      } catch (error) {
        console.error(error)
        if (error instanceof z.ZodError) return res.status(400).json(error)
        return res.status(500).json(error)
      }
    }

    if (req.method === 'DELETE') {
      try {
        const post = await prisma.post.delete({ where: { id: id } })
        return res.status(200).json(post)
      } catch (error) {
        return res.status(500).json(error)
      }
    }
  } catch (error) {
    console.error(error)
    return res.status(404).json(error)
  }

  return res.status(405).end()
}


export default handler;