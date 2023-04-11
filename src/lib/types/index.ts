import type { Post as PrismaPost, User as PrismsUser, Comment as PrismaComment } from '@prisma/client'

export interface Article {
  title: string
  description: string
  postedBy: string
  postedAt: string
}

export type Post = PrismaPost & {
  author: PrismsUser
  createdAt: string
}

export type Comment = PrismaComment & {
  author: PrismsUser
}

export type AddPostFormValues = {
  input: string
  image: File[]
}

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any
