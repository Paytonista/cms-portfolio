import NextAuth from "next-auth"
import Google from "next-auth/providers/google" 

import { prisma } from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    signIn ({ user }) {
      return user.email === process.env.ALLOWED_ADMIN_EMAIL
      },
  },
})