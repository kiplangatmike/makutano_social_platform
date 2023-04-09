import { prisma } from '$lib/config/prisma'
import { withAuthApi } from '$lib/utils/api'
import { z } from 'zod'


export default withAuthApi(async ({ method, query }, res) => {
    // like post
    if (method === 'POST') {
        const postId = z.string().parse(query.id)
        const userId = z.string().parse(query.userId)
        try {

            const createdLike = await prisma.likes.create({
                data: {
                    postId: postId,
                    userId: userId
                }
            })
            return res.status(200).json(createdLike)
        } catch (error) {
            console.error(error)
            return res.status(500).json(error)
        }

    }
})