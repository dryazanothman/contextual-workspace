import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Mock database connection for now
const mockWorkspaces = [
  {
    id: '1',
    name: 'Development Team',
    description: 'Main workspace for development projects',
    slug: 'development-team',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Design Team',
    description: 'Workspace for design projects',
    slug: 'design-team',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Marketing',
    description: 'Marketing campaigns and content',
    slug: 'marketing',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function GET() {
  try {
    // In a real app, you would use:
    // const workspaces = await prisma.workspace.findMany()
    
    return NextResponse.json({
      success: true,
      data: mockWorkspaces,
      count: mockWorkspaces.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error fetching workspaces:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch workspaces',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.slug) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
          required: ['name', 'slug'],
        },
        { status: 400 }
      )
    }
    
    // In a real app, you would use:
    // const workspace = await prisma.workspace.create({ data: body })
    
    const newWorkspace = {
      id: `mock-${Date.now()}`,
      name: body.name,
      description: body.description || '',
      slug: body.slug,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    return NextResponse.json(
      {
        success: true,
        data: newWorkspace,
        message: 'Workspace created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating workspace:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create workspace',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}