import ChatHeader from '@/components/chat/chat-header'
import ChatInput from '@/components/chat/chat-input'
import { currentProfile } from '@/lib/current-profile'
import { prisma } from '@/lib/db'
import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function ChannelIdPage({
  params,
}: {
  params: { channelId: string; serverId: string }
}) {
  const profile = await currentProfile()

  if (!profile) {
    return redirectToSignIn()
  }

  const channel = await prisma.channel.findUnique({
    where: {
      id: params.channelId,
    },
  })

  const member = await prisma.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  })

  if (!channel || !member) {
    return redirect(`/`)
  }

  return (
    <div className="flex h-full flex-col bg-white dark:bg-[#313338]">
      <ChatHeader
        type="channel"
        name={channel.name}
        serverId={channel.serverId}
      />

      <div className="flex-1">Future Messages</div>

      <ChatInput
        name={channel.name}
        type="channel"
        apiUrl="/api/socket/messages"
        query={{ channelId: channel.id, serverId: channel.serverId }}
      />
    </div>
  )
}
