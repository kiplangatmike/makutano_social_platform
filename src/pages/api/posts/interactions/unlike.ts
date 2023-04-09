import { prisma } from '$lib/config/prisma'
import { withAuthApi } from '$lib/utils/api'
import { z } from 'zod'


export default withAuthApi(async ({ method, query }, res) => {
    // like post
    if (method === 'POST') {
        const postId = z.string().parse(query.id)
        const userId = z.string().parse(query.userId)
        try {

            // remove userId to likes array on post
            const updatedPost = await prisma.post.update({
                where: {
                    id: postId
                },
                data: {
                    likes: {
                        set: (await prisma.post.findUnique({ where: { id: postId } }))?.likes.filter(
                            (like) => like !== userId
                        )
                    }
                }
            })
            return res.status(200).json(updatedPost)
        } catch (error) {
            console.error(error)
            return res.status(500).json(error)
        }

    }
})