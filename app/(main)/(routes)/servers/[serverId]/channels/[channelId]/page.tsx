import ChatHeader from '@/components/chat/chat-header'
import { currentProfile } from '@/lib/current-profile'
import { prisma } from '@/lib/db'
import { redirectToSignIn } from '@clerk/nextjs'
import { channel } from 'diagnostics_channel'
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

  const server = await prisma.server.findUnique({
    where: {
      id: params.serverId,
    },
  })

  const member = await prisma.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  })

  if (!server || !member) {
    return redirect(`/`)
  }

  return (
    <div className="flex h-full flex-col bg-white dark:bg-[#313338]">
      <ChatHeader serverId={server.id} type="channel" name={channel.name} />
    </div>
  )
}
