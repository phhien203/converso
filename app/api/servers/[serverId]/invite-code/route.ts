import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

import { currentProfile } from '@/lib/current-profile'
import { prisma } from '@/lib/db'

export async function PATCH(
  _req: Request,
  { params }: { params: { serverId: string } },
) {
  try {
    if (!params.serverId) {
      return new NextResponse('Server id missing', { status: 400 })
    }

    const profile = await currentProfile()

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const server = await prisma.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log('SERVER_ID_PATCH', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
