'use client'

import {
  ChevronDownIcon,
  LogOutIcon,
  PlusCircle,
  SettingsIcon,
  TrashIcon,
  UserPlusIcon,
  UsersIcon,
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ServerWithMembersWithProfiles } from '@/types'
import { MemberRole } from '@prisma/client'

export default function ServerHeader({
  server,
  role,
}: {
  server: ServerWithMembersWithProfiles
  role?: MemberRole
}) {
  const isAdmin = role === MemberRole.ADMIN
  const isModerator = isAdmin || role === MemberRole.MODERATOR

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="text-md flex h-12 w-full items-center border-b-2 border-neutral-200 px-3 font-semibold transition hover:bg-zinc-700/10 dark:border-neutral-800 dark:hover:bg-zinc-700/50">
          {server.name}

          <ChevronDownIcon className="ml-auto h-5 w-5" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 space-y-[2px] text-xs font-medium text-black dark:text-neutral-400">
        {isModerator && (
          <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm text-indigo-600 dark:text-indigo-400">
            Invite People
            <UserPlusIcon className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm">
            Server Settings
            <SettingsIcon className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm">
            Manage Members
            <UsersIcon className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}

        {isModerator && (
          <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm">
            Create Channel
            <PlusCircle className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}

        {isModerator && <DropdownMenuSeparator />}

        {isAdmin && (
          <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm text-rose-500">
            Delete Channel
            <TrashIcon className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}

        {!isAdmin && (
          <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm text-rose-500">
            Leaver Server
            <LogOutIcon className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
