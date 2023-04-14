import { prisma } from '$lib/config/prisma'
import { z } from 'zod'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => { // get comments for a post - only for feed
    if (req.method === 'GET') {
        const id = z.string().parse(req.query.id)
        try {
            const comments = await prisma.comment.findMany({
                where: {
                    postId: id
                },
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                            image: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
            return res.status(200).json(comments)
        } catch (error) {
            console.error(error)
            return res.status(500).json(error)
        }
    }
}


export default handler;