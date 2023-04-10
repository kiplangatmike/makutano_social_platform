import { prisma } from '$lib/config/prisma'
import { withAuthApi } from '$lib/utils/api'
import { z } from 'zod'


export default withAuthApi(async ({ method, query }, res) => {

    // get comments for a post - only for feed
    if (method === 'GET') {
        const id = z.string().parse(query.id)
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
})