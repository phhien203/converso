import { currentProfile } from '@/lib/current-profile'
import { prisma } from '@/lib/db'
import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function ServerIdPage({
  params,
}: {
  params: { serverId: string }
}) {
  const profile = await currentProfile()

  if (!profile) {
    return redirectToSignIn()
  }

  const server = await prisma.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: 'general',
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  })

  const initialChannel = server?.channels[0]

  if (!initialChannel || initialChannel.name.toLowerCase() !== 'general') {
    return null
  }

  return redirect(`/servers/${params.serverId}/channels/${initialChannel.id}`)
}
