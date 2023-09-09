import MobileToggle from '@/components/mobile-toggle'
import { HashIcon } from 'lucide-react'

interface Props {
  serverId: string
  name: string
  type: 'channel' | 'conversation'
  imageUrl?: string
}

export default function ChatHeader({ serverId, name, type, imageUrl }: Props) {
  return (
    <div className="text-md flex h-12 items-center border-b-2 border-neutral-200 px-3 font-semibold dark:border-neutral-800">
      <MobileToggle serverId={serverId} />

      {type === 'channel' && (
        <HashIcon className="mr-2 h-5 w-5 text-zinc-500 dark:text-zinc-400" />
      )}

      <p className="text-md font-semibold text-black dark:text-white">{name}</p>
    </div>
  )
}
