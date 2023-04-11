import { prisma } from '$lib/config/prisma'
import { withAuthApi } from '$lib/utils/api'
import { z } from 'zod'


export default withAuthApi(async ({ method, query }, res) => {
    // like post
    if (method === 'POST') {
        const postId = z.string().parse(query.id)
        const userId = z.string().parse(query.userId)
        try {

            // add userId to likes array on post
            const updatedPost = await prisma.post.update({
                where: {
                    id: postId
                },
                data: {
                    likes: {
                        push: userId
                    }
                }
            })

            // update user likedPosts to add postId
            await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    likedPosts: {
                        push: postId
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