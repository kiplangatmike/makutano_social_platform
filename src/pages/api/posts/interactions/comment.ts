import { prisma } from '$lib/config/prisma'
import { withAuthApi } from '$lib/utils/api'
import { z } from 'zod'


export default withAuthApi(async ({ method, query, body }, res) => {
    // comment on a post
    if (method === 'POST') {
        const postId = z.string().parse(query.id)
        const userId = z.string().parse(query.userId)
        const comment = z.string().parse(body.comment)
        try {

            const createdComment = await prisma.comments.create({
                data: {
                    postId: postId,
                    userId: userId,
                    comment: comment
                }
            })
            return res.status(200).json(createdComment)
        } catch (error) {
            console.error(error)
            return res.status(500).json(error)
        }

    }
})