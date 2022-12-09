import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from '../../../lib/prisma'
import { generateFromEmail } from "unique-username-generator";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: '/sign-in',
    verifyRequest: '/auth/verify-request',
    error: '/auth/error'
  },
  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }) => {
      // @TODO: check database for user with this email
      // if email exists and profile.email_verified
      // then return true
      // update user.name with profile.name
      return true
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub
        session.user.image = token.picture
        session.user.name = token.name
      }
      return session;
    },
  },
  events: {
    createUser: async ({ user }) => {
      const handle = generateFromEmail(user.email, 4)
      user.handle = handle
      const result = await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          handle: handle
        }
      })
      return user
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)