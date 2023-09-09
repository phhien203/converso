'use client'

import ActionTooltip from '@/components/action-tooltip'
import { useModal } from '@/hooks/use-modal-store'
import { ServerWithMembersWithProfiles } from '@/types'
import { ChannelType, MemberRole } from '@prisma/client'
import { PlusIcon, SettingsIcon } from 'lucide-react'

interface Props {
  label: string
  role?: MemberRole
  sectionType: 'channels' | 'members'
  channelType?: ChannelType
  server?: ServerWithMembersWithProfiles
}

export default function ServerSection({
  label,
  role,
  sectionType,
  channelType,
  server,
}: Props) {
  const { onOpen } = useModal()

  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">
        {label}
      </p>

      {role !== MemberRole.GUEST && sectionType === 'channels' && (
        <ActionTooltip label="Create Channel" side="top">
          <button
            className="text-zinc-500 transition hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
            onClick={() => onOpen('createChannel', { channelType })}
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}

      {role === MemberRole.ADMIN && sectionType === 'members' && (
        <ActionTooltip label="Manage Members" side="top">
          <button
            className="text-zinc-500 transition hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
            onClick={() => onOpen('members', { server })}
          >
            <SettingsIcon className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  )
}
