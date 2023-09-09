import { ChannelType, MemberRole } from '@prisma/client'
import {
  HashIcon,
  MicIcon,
  ShieldAlertIcon,
  ShieldCheckIcon,
  VideoIcon,
} from 'lucide-react'
import { redirect } from 'next/navigation'

import ServerHeader from '@/components/server/server-header'
import ServerSearch from '@/components/server/server-search'
import { ScrollArea } from '@/components/ui/scroll-area'
import { currentProfile } from '@/lib/current-profile'
import { prisma } from '@/lib/db'

const iconMap = {
  [ChannelType.TEXT]: <HashIcon className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <MicIcon className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <VideoIcon className="mr-2 h-4 w-4" />,
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheckIcon className="mr-2 h-4 w-4 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: (
    <ShieldAlertIcon className="mr-2 h-4 w-4 text-rose-500" />
  ),
}

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

      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: 'Text Channels',
                type: 'channel',
                data: textChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: 'Voice Channels',
                type: 'channel',
                data: audioChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: 'Video Channels',
                type: 'channel',
                data: videoChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: 'Members',
                type: 'member',
                data: members.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIconMap[member.role],
                })),
              },
            ]}
          />
        </div>
      </ScrollArea>
    </div>
  )
}
