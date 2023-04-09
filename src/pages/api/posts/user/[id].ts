import { z } from 'zod'
import { prisma } from '$lib/config/prisma'
import { withAuthApi } from '$lib/utils/api'

export default withAuthApi(async ({ query }, res) => {
  // get user posts
  try {
    const id = z.string().parse(query.id)
    const posts = await prisma.post.findMany({
      where: { authorId: id },
    })
    return res.status(200).json(posts)

  } catch (error) {
    console.error(error)
    return res.status(404).json(error)
  }
})
