import { z } from 'zod'
import { prisma } from '$lib/config/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = z.string().parse(req.query.id)

    if (req.method === 'GET') {
      try {
        const user = await prisma.user.findUnique({
          where: { id: id },
          include: {
            posts: true,
            ComprehensiveProfile: true,
          }
        })
        if (user && user?.ComprehensiveProfile?.length > 0) {
          // get education and experience with profileId (user.ComprehensiveProfile.id)
          const education = await prisma.education.findMany({
            where: {
              profileId: user.ComprehensiveProfile[0].id
            }
          })
          const experience = await prisma.experience.findMany({
            where: {
              profileId: user.ComprehensiveProfile[0].id
            }
          })
          // add education and experience to user object
          // @ts-ignore
          user.education = education
          // @ts-ignore
          user.experience = experience
        }


        return res.status(200).json(user)
      } catch (error) {
        console.error(error)
        return res.status(500).json(error)
      }
    }
    if (req.method === "PATCH") {
      // save ComprehensiveProfile (userId, bio, location) first
      const profile = await prisma.comprehensiveProfile.create({
        data: {
          bio: req.body.bio,
          location: req.body.currentLocation,
          user: {
            connect: {
              id: id
            }
          }
        }
      })
      // get profile id then save education(profileId, school, degree) and experience(profileId, company, position, location)
      const education = await prisma.education.create({
        data: {
          school: req.body.education[0].schoolName,
          degree: req.body.education[0].degree,
          profileId: profile.id
        }
      })

      const experience = await prisma.experience.create({
        data: {
          company: req.body.experience[0].company,
          position: req.body.experience[0].role,
          location: req.body.experience[0].location,
          profileId: profile.id
        }
      })

      return res.status(200).json({ profile, education, experience })

    }
  } catch (error) {
    console.error(error)
    return res.status(404).json(error)
  }

  return res.status(405).end()
}


export default handler;