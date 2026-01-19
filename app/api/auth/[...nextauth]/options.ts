import { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/db'
import { compare } from 'bcryptjs'

// Mock user for development
const mockUser = {
  id: 'mock-user-id',
  name: 'Test User',
  email: 'test@example.com',
  image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test',
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // GitHub OAuth
    GitHubProvider({
      clientId: process.env.GITHUB_ID || 'mock-github-id',
      clientSecret: process.env.GITHUB_SECRET || 'mock-github-secret',
    }),
    
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'mock-google-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock-google-secret',
    }),
    
    // Email/Password (for development)
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        
        // For development, accept any email/password
        // In production, you would check against database
        if (process.env.NODE_ENV === 'development') {
          return {
            id: 'dev-user',
            email: credentials.email,
            name: credentials.email.split('@')[0],
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + credentials.email,
          }
        }
        
        // Production: Check database
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          })
          
          if (!user) {
            return null
          }
          
          // Check password (you would need to store hashed passwords)
          const isValid = true // Replace with actual password check
          
          if (!isValid) {
            return null
          }
          
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    newUser: '/auth/register',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log('User signed in:', { 
        userId: user.id, 
        email: user.email,
        isNewUser,
        provider: account?.provider 
      })
    },
    async signOut({ token, session }) {
      console.log('User signed out:', { userId: token?.id })
    },
    async createUser({ user }) {
      console.log('New user created:', { userId: user.id, email: user.email })
      
      // Create a default workspace for new users
      try {
        await prisma.workspace.create({
          data: {
            name: 'My Workspace',
            slug: 'my-workspace',
            ownerId: user.id,
            description: 'Your personal workspace',
          },
        })
        console.log('Default workspace created for user:', user.id)
      } catch (error) {
        console.error('Error creating default workspace:', error)
      }
    },
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET || 'development-secret-change-in-production',
}