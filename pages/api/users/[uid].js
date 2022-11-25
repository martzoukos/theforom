import prisma from '../../../lib/prisma';
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { uid, user  } = req.body
  const session = await getSession({ req });
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
      name: user.name,
      shortBio: user.shortBio,
      longBio: user.longBio,
      twitterURL: user.twitterURL,
      facebookURL: user.facebookURL,
      linkedInURL: user.linkedInURL,
    }
  })

  res.status(200).json(result)
}