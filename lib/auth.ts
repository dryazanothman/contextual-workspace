import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  return session?.user
}

export async function requireAuth() {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error('Authentication required')
  }
  
  return user
}

export async function requireAdmin() {
  const user = await requireAuth()
  
  // In a real app, you would check user.role or similar
  // For now, we'll just return the user
  return user
}

export function hasPermission(user: any, permission: string) {
  // Mock permission check
  // In a real app, you would check user.roles or permissions
  return true
}

export async function getSessionToken() {
  const session = await getServerSession(authOptions)
  return session?.accessToken
}

// Mock auth functions for development
export const mockAuth = {
  async signIn(provider: string, credentials?: any) {
    console.log(`Mock sign in with ${provider}`, credentials)
    return { success: true, user: { id: 'mock-user', email: 'test@example.com' } }
  },
  
  async signOut() {
    console.log('Mock sign out')
    return { success: true }
  },
  
  async register(email: string, password: string, name?: string) {
    console.log('Mock register', { email, name })
    return { 
      success: true, 
      user: { 
        id: 'mock-user', 
        email, 
        name: name || email.split('@')[0],
        emailVerified: new Date()
      } 
    }
  },
  
  async resetPassword(email: string) {
    console.log('Mock reset password for', email)
    return { success: true, message: 'Reset email sent' }
  },
}