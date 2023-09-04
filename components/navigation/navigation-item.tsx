'use client'

import ActionTooltip from '@/components/action-tooltip'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

export default function NavigationItem({
  id,
  imageUrl,
  name,
}: {
  id: string
  imageUrl: string
  name: string
}) {
  const params = useParams()
  const router = useRouter()

  return (
    <ActionTooltip align="center" side="right" label={name}>
      <button onClick={() => {}} className="group relative flex items-center">
        <div
          className={cn(
            'absolute left-0 w-[4px] rounded-r-full bg-primary transition-all',
            params?.serverId !== id && 'group-hover:h-[20px]',
            params?.serverId === id ? 'h-[36px]' : 'h-[8px]',
          )}
        />

        <div
          className={cn(
            'group relative mx-3 flex h-[48px] w-[48px] overflow-hidden rounded-[24px] transition-all group-hover:rounded-[16px]',
            params?.serverId === id &&
              'rounded-[16px] bg-primary/10 text-primary',
          )}
        >
          <Image fill alt="server" src={imageUrl} />
        </div>
      </button>
    </ActionTooltip>
  )
}
