import { prisma } from '../../../../lib/prisma';

export default async function handler(req, res) {
  const { uid, uiMode  } = req.body
  const session = null //replace with clerk
  if (session === null) {
    res.status(401).json({ error: 'user is not logged in' })
    return
  }
  if (session.user.id !== uid) {
    res.status(403).json({ error: 'unauthorized access' })
    return
  }

  const result = await prisma.user.update({
    where: {
      id: uid
    },
    data: {
      uiMode: uiMode,
    }
  })

  res.status(200).json(result)
}