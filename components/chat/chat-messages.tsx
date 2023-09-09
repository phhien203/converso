'use client'

import ChatWelcome from '@/components/chat/chat-welcome'
import { Member } from '@prisma/client'

interface Props {
  name: string
  member: Member
  chatId: string
  apiUrl: string
  socketUrl: string
  socketQuery: Record<string, string>
  paramKey: 'channelId' | 'conversationId'
  paramValue: string
  type: 'channel' | 'conversation'
}

export default function ChatMessages({
  apiUrl,
  chatId,
  member,
  name,
  paramKey,
  paramValue,
  socketQuery,
  socketUrl,
  type,
}: Props) {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto py-4">
      <div className="flex-1"></div>
      <ChatWelcome type={type} name={name} />
    </div>
  )
}
