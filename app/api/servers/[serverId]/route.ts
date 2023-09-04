import { NextResponse } from 'next/server'

import { currentProfile } from '@/lib/current-profile'
import { prisma } from '@/lib/db'

export async function PATCH(
  req: Request,
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

    const { name, imageUrl } = await req.json()

    if (!name || !imageUrl) {
      return new NextResponse('Missing required field', { status: 400 })
    }

    const server = await prisma.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.error('[SERVER_ID_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
