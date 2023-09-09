'use client'

import UserAvatar from '@/components/user-avatar'
import { cn } from '@/lib/utils'
import { Member, MemberRole, Profile, Server } from '@prisma/client'
import { ShieldAlertIcon, ShieldCheckIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

interface Props {
  member: Member & { profile: Profile }
  server: Server
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheckIcon className="ml-2 h-4 w-4 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: (
    <ShieldAlertIcon className="ml-2 h-4 w-4 text-rose-500" />
  ),
}

export default function ServerMember({ member, server }: Props) {
  const router = useRouter()
  const params = useParams()

  return (
    <button
      className={cn(
        'group mb-1 flex w-full items-center gap-x-2 rounded-md px-2 py-2 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50',
        params?.memberId === member.id && 'bg-zinc-700/20 dark:bg-zinc-700',
      )}
    >
      <UserAvatar
        src={member.profile.imageUrl}
        className="h-8 w-8 md:h-8 md:w-8"
      />

      <p
        className={cn(
          'text-sm font-semibold text-zinc-500 transition group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300',
          member.profileId === server.profileId &&
            'text-primary dark:text-zinc-200 dark:group-hover:text-white',
        )}
      >
        {member.profile.name}
      </p>
    </button>
  )
}
