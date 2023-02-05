import { prisma } from '../../lib/prisma'

export default async function handler(req, res) {
  const session = null //replace with clerk
  if (session === null) {
    res.status(401).json({ error: 'user is not logged in' })
    return
  }

  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      _count: {
        select: { threads: true }
      }
    },
    orderBy: [{
      name: 'asc'
    }]
  })

  res.status(200).json(categories)
}