import { ChannelType, MemberRole } from '@prisma/client'
import { NextResponse } from 'next/server'

import { currentProfile } from '@/lib/current-profile'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const serverId = searchParams.get('serverId')

    if (!serverId) {
      return new NextResponse('Server id missing', { status: 400 })
    }

    const { name, type } = await req.json()

    if (!name) {
      return new NextResponse('Server name is required', { status: 400 })
    }

    if ((name as string).toLowerCase() === 'general') {
      return new NextResponse('Server name should not be "General"', {
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
          create: {
            profileId: profile.id,
            name,
            type: type || ChannelType.TEXT,
          },
        },
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log('CHANNELS_POST', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
