import { z } from 'zod'
import { prisma } from '$lib/config/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = z.string().parse(req.query.id)

    if (req.method === 'GET') {
      try {
        const user = await prisma.user.findUnique({
          where: { id: id },
          select: {
            email: true,
            id: true,
            image: true,
            name: true,
          }
        })
        return res.status(200).json(user)
      } catch (error) {
        console.error(error)
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