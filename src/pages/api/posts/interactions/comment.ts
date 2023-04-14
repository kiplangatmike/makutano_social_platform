import { prisma } from '$lib/config/prisma'
import { z } from 'zod'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth';
import { authOptions } from '$pages/api/auth/[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // comment on a post
    if (req.method === 'POST') {
        const session = await getServerSession(req, res, authOptions);

        if (!session) return res.status(401).json({ message: 'Unauthorized' })

        const id = z.string().parse(req.body.id)
        const userId = z.string().parse(req.body.userId)
        const comment = z.string().parse(req.body.comment)
        try {

            const createdComment = await prisma.comment.create({
                data: {
                    postId: id,
                    authorId: userId,
                    input: comment
                }
            })

            return res.status(200).json(createdComment)
        } catch (error) {
            console.error(error)
            return res.status(500).json(error)
        }

    }

    // get comments for a post - only for feed
    if (req.method === 'GET') {
        const id = z.string().parse(req.query.id)
        try {
            const comments = await prisma.comment.findMany({
                where: {
                    postId: id
                },
                select: {
                    id: true,
                },
            });
            return res.status(200).json(comments)
        } catch (error) {
            console.error(error)
            return res.status(500).json(error)
        }
    }

}



export default handler;