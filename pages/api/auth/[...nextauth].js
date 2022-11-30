import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from '../../../lib/prisma'

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
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)