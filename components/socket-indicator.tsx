'use client'

import { useSocket } from '@/components/providers/socket-provider'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export default function SocketIndicator() {
  const { isConnected } = useSocket()

  if (!isConnected) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="h-2 w-2 rounded-full bg-yellow-600"></div>
          </TooltipTrigger>

          <TooltipContent>
            <div className="text-xs">Polling every 1s</div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="h-2 w-2 rounded-full bg-emerald-600"></div>
        </TooltipTrigger>

        <TooltipContent>
          <div className="text-xs">Real time updates</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
