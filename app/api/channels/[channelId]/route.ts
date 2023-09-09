import { currentProfile } from '@/lib/current-profile'
import { prisma } from '@/lib/db'
import { MemberRole } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function DELETE(
  req: Request,
  { params }: { params: { channelId: string } },
) {
  try {
    const { searchParams } = new URL(req.url)
    const serverId = searchParams.get('serverId')

    if (!serverId) {
      return new NextResponse('Server id missing', { status: 400 })
    }

    if (!params.channelId) {
      return new NextResponse('Channel id missing', { status: 400 })
    }

    const profile = await currentProfile()

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const server = await prisma.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: params.channelId,
            name: {
              notIn: ['general', 'General'],
            },
          },
        },
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log('[CHANNELS_ID_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { channelId: string } },
) {
  try {
    const { searchParams } = new URL(req.url)
    const serverId = searchParams.get('serverId')

    if (!serverId) {
      return new NextResponse('Server id missing', { status: 400 })
    }

    if (!params.channelId) {
      return new NextResponse('Channel id missing', { status: 400 })
    }

    const { name, type } = await req.json()

    if (!name || !type) {
      return new NextResponse('name or type is missing', { status: 400 })
    }

    if ((name as string).toLowerCase() === 'general') {
      return new NextResponse('Channel name should not be "general"', {
        status: 400,
      })
    }

    const profile = await currentProfile()

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const server = await prisma.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          update: {
            where: {
              id: params.channelId,
              name: {
                notIn: ['general', 'General'],
              },
            },
            data: {
              name,
              type,
            },
          },
        },
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log('[CHANNELS_ID_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
