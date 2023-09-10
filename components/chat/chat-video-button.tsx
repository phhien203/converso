'use client'

import ActionTooltip from '@/components/action-tooltip'
import { VideoIcon, VideoOffIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'

export default function ChatVideoButton() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const isVideo = searchParams?.get('video')
  const Icon = isVideo ? VideoOffIcon : VideoIcon
  const tooltipLabel = isVideo ? 'End video call' : 'Start video'

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname || '',
        query: {
          video: isVideo ? undefined : true,
        },
      },
      { skipNull: true },
    )

    router.push(url)
  }

  return (
    <ActionTooltip side="bottom" label={tooltipLabel}>
      <button onClick={onClick} className="mr-4 transition hover:opacity-75">
        <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
      </button>
    </ActionTooltip>
  )
}
