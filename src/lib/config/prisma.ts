import { PrismaClient } from '@prisma/client'

const isProd = process.env.NODE_ENV === 'production'

export const prisma =
  global.prisma ||
  new PrismaClient({
    ...(!isProd && { log: ['warn', 'error'] }),
  })

if (!isProd) global.prisma = prisma
