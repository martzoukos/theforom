import { prisma, prismaNamespace } from '../../../lib/prisma';

export default async function handler(req, res) {
  const { uid, user  } = req.body
  const session = null //replace with clerk
  if (session === null) {
    res.status(401).json({ error: 'user is not logged in' })
    return
  }
  if (session.user.id !== uid) {
    res.status(403).json({ error: 'unauthorized access' })
    return
  }
  try {
    const result = await prisma.user.update({
      where: {
        id: uid
      },
      data: {
        name: user.name,
        handle: user.handle,
        shortBio: user.shortBio,
        longBio: user.longBio,
        twitterURL: user.twitterURL,
        facebookURL: user.facebookURL,
        linkedInURL: user.linkedInURL,
      }
    })
    res.status(200).json(result)
  } catch (e) {
    if (e instanceof prismaNamespace.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        res.status(409).json({ error: 'The handle is already taken' })
        return
      }
      return
    }
    res.status(400).json({ error: 'There was an issue, please try again' })
    throw e
  }
}