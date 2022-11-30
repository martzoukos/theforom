import prisma from '../../lib/prisma'
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (session === null) {
    res.status(401).json({ error: 'user is not logged in' })
    return
  }

  const { title, content, uploadedMedia, categories } = req.body
  const categoriesQuery = categories === null 
  ? []
  : categories.map(c => {
    return({
      Category: {
        connectOrCreate:{
          where: {
            name: c
          },
          create: {
            name: c
          }
        }
      }
    })
  })
  console.log(categoriesQuery)
  const connectUser = { id: session?.user?.id }
  const result = await prisma.thread.create({
    data: {
      subject: title,
      posts: {
        create: {
          content: content,
          uploadedMedia: uploadedMedia,
          User: { connect: connectUser }
        },
      },
      categories: {
        create: categoriesQuery
      },
      User: { connect: connectUser }
    }
  })

  res.status(200).json(result)
}