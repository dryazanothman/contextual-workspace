import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Helper functions for common database operations
export async function checkDatabaseConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return { connected: true, message: 'Database connection successful' }
  } catch (error) {
    console.error('Database connection error:', error)
    return { 
      connected: false, 
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export async function getDatabaseStats() {
  try {
    const [userCount, workspaceCount, projectCount, taskCount] = await Promise.all([
      prisma.user.count(),
      prisma.workspace.count(),
      prisma.project.count(),
      prisma.task.count(),
    ])

    return {
      users: userCount,
      workspaces: workspaceCount,
      projects: projectCount,
      tasks: taskCount,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    console.error('Error getting database stats:', error)
    return {
      users: 0,
      workspaces: 0,
      projects: 0,
      tasks: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }
  }
}

// Transaction helpers
export async function withTransaction<T>(
  operation: (tx: PrismaClient) => Promise<T>
): Promise<T> {
  return await prisma.$transaction(async (tx) => {
    return await operation(tx)
  })
}

// Query utilities
export const workspaceQueries = {
  async getUserWorkspaces(userId: string) {
    return await prisma.workspace.findMany({
      where: {
        OR: [
          { ownerId: userId },
          { members: { some: { id: userId } } },
        ],
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        _count: {
          select: {
            members: true,
            projects: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })
  },

  async getWorkspaceWithDetails(workspaceId: string, userId: string) {
    return await prisma.workspace.findFirst({
      where: {
        id: workspaceId,
        OR: [
          { ownerId: userId },
          { members: { some: { id: userId } } },
        ],
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        members: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        projects: {
          include: {
            _count: {
              select: {
                tasks: true,
              },
            },
          },
          orderBy: {
            updatedAt: 'desc',
          },
          take: 10,
        },
      },
    })
  },
}

export const taskQueries = {
  async getUserTasks(userId: string, options: {
    status?: string
    priority?: string
    projectId?: string
    limit?: number
    offset?: number
  } = {}) {
    const { status, priority, projectId, limit = 50, offset = 0 } = options
    
    return await prisma.task.findMany({
      where: {
        project: {
          workspace: {
            OR: [
              { ownerId: userId },
              { members: { some: { id: userId } } },
            ],
          },
        },
        ...(status && { status }),
        ...(priority && { priority }),
        ...(projectId && { projectId }),
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            workspace: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
      },
      orderBy: [
        { dueDate: 'asc' },
        { createdAt: 'desc' },
      ],
      take: limit,
      skip: offset,
    })
  },
}