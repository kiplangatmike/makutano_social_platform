import { z } from 'zod'
import { prisma } from '$lib/config/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const id = z.string().parse(req.query.id)

        if (req.method === 'GET') {
            try {
                const post = await prisma.chapters.findUnique({
                    where: { id: id },
                    include: {
                        posts: {
                            select: {
                                id: true,
                                input: true,
                                media: true,
                                createdAt: true,
                                updatedAt: true,
                                author: {
                                    select: {
                                        email: true,
                                        id: true,
                                        image: true,
                                        name: true,
                                    },
                                },
                            },
                        },
                        users: {
                            select: {
                                email: true,
                                id: true,
                                image: true,
                                name: true,
                                ComprehensiveProfile: true
                            }
                        }
                    }
                })
                return res.status(200).json(post)
            } catch (error) {
                console.error(error)
                return res.status(500).json(error)
            }
        }
        // join or leave chapter
        if (req.method === 'POST') {
            try {
                const { userId, actionType } = z
                    .object({
                        userId: z.string().min(1).trim(),
                        actionType: z.string().min(1).trim(),
                    })
                    .parse(req.body)
                if (actionType === 'join') {
                    // add userId to chapter.usersId
                    const chapter = await prisma.chapters.update({
                        where: { id: id },
                        data: {
                            userIds: {
                                push: userId
                            },
                        },
                    })

                    return res.status(200).json(chapter)
                }
                else {
                    // remove userId from chapter.usersId
                    const chapter = await prisma.chapters.update({
                        where: { id: id },
                        data: {
                            userIds: {
                                set: (await prisma.chapters.findUnique({ where: { id: id } }))?.userIds.filter(
                                    (user) => user !== userId
                                )
                            },
                        },
                    })

                    return res.status(200).json(chapter)
                }
            }
            catch (error) {
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