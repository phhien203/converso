import { redirect } from 'next/navigation'

import ServerHeader from '@/components/server/server-header'
import { currentProfile } from '@/lib/current-profile'
import { prisma } from '@/lib/db'
import { ChannelType } from '@prisma/client'

export default async function ServerSidebar({
  serverId,
}: {
  serverId: string
}) {
  const profile = await currentProfile()

  if (!profile) {
    return redirect('/')
  }

  const server = await prisma.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc',
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: 'asc',
        },
      },
    },
  })

  if (!server) {
    return redirect('/')
  }

  const textChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.TEXT,
  )
  const audioChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO,
  )
  const videoChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO,
  )

  const members = server.members.filter(
    (member) => member.profileId !== profile.id,
  )

  const role = server.members.find((member) => member.profileId === profile.id)
    ?.role

  return (
    <div className="flex h-full w-full flex-col bg-[#f2f3f5] text-primary dark:bg-[#2b2d31]">
      <ServerHeader server={server} role={role} />
    </div>
  )
}
