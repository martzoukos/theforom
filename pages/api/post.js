import prisma from '../../lib/prisma'
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
  const session = await getSession({ req });
  const { tid, post } = req.body
  const connectUser = { id: session?.user?.id }

  

  const result = await prisma.thread.update({
    where: {
      id: parseInt(tid)
    },
    data: {
      posts: {
        create: {
          content: post,
          User: { connect: connectUser }
        },
      },
    }
  })

  res.status(200).json(result)
}