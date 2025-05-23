import { prisma } from '../../lib/prisma'
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (session === null) {
    res.status(401).json({ error: 'user is not logged in' })
    return
  }

  const { tid, post, uploadedMedia } = req.body
  const connectUser = { id: session?.user?.id }
  const result = await prisma.thread.update({
    where: {
      id: parseInt(tid)
    },
    data: {
      posts: {
        create: {
          content: post,
          uploadedMedia: uploadedMedia,
          User: { connect: connectUser }
        },
      },
    }
  })

  res.status(200).json(result)
}