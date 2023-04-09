import { prisma } from '$lib/config/prisma'
import { withAuthApi } from '$lib/utils/api'
import { z } from 'zod'


export default withAuthApi(async ({ method, body, query }, res) => {
    // comment on a post
    if (method === 'POST') {
        const id = z.string().parse(body.id)
        const userId = z.string().parse(body.userId)
        const comment = z.string().parse(body.comment)
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
    if (method === 'GET') {
        const id = z.string().parse(query.id)
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
})