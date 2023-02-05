import { prisma } from '../../lib/prisma'
import slugify from 'slugify';

export default async function handler(req, res) {
  const session = null //replace with clerk
  if (session === null) {
    res.status(401).json({ error: 'user is not logged in' })
    return
  }

  const { title, content, uploadedMedia, categories } = req.body
  const categoriesQuery = categories.length > 0 
  ? categories.map(c => {
    return({
      Category: {
        connectOrCreate:{
          where: {
            id: c.id
          },
          create: {
            name: c.description
          }
        }
      }
    })
  }) 
  : []
  const connectUser = { id: session?.user?.id }
  const result = await prisma.thread.create({
    data: {
      subject: title,
      slug: slugify(title, {
        lower: true
      }),
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