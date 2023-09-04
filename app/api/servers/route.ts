import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

import { currentProfile } from '@/lib/current-profile'
import { prisma } from '@/lib/db'
import { MemberRole } from '@prisma/client'

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json()
    const profile = await currentProfile()

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const server = await prisma.server.create({
      data: {
        name,
        imageUrl,
        inviteCode: uuidv4(),
        profileId: profile.id,
        members: {
          create: [
            {
              role: MemberRole.ADMIN,
              profileId: profile.id,
            },
          ],
        },
        channels: {
          create: [
            {
              name: 'General',
              profileId: profile.id,
            },
          ],
        },
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.error('SERVERS_POST', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
