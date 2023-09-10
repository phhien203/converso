'use client'

import { useUser } from '@clerk/nextjs'
import { LiveKitRoom, VideoConference } from '@livekit/components-react'
import '@livekit/components-styles'
import { Loader2Icon } from 'lucide-react'
import React from 'react'

interface Props {
  chatId: string
  video: boolean
  audio: boolean
}

export default function MediaRoom({ audio, chatId, video }: Props) {
  const { user } = useUser()
  const [token, setToken] = React.useState('')

  React.useEffect(() => {
    if (!user?.firstName || !user?.lastName) return

    const name = `${user.firstName} ${user.lastName}`

    ;(async () => {
      try {
        const res = await fetch(`/api/livekit?room=${chatId}&username=${name}`)
        const data = await res.json()
        setToken(data.token)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [chatId, user?.firstName, user?.lastName])

  if (token === '') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Loader2Icon className="my-4 h-7 w-7 animate-spin text-zinc-500" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    )
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect={true}
      video={video}
      audio={audio}
    >
      <VideoConference />
    </LiveKitRoom>
  )
}
