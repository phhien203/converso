'use client'

import {
  CheckIcon,
  GavelIcon,
  Loader2,
  MoreVerticalIcon,
  ShieldAlertIcon,
  ShieldCheckIcon,
  ShieldIcon,
  ShieldQuestionIcon,
} from 'lucide-react'
import qs from 'query-string'
import React from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import UserAvatar from '@/components/user-avatar'
import { useModal } from '@/hooks/use-modal-store'
import { ServerWithMembersWithProfiles } from '@/types'
import { MemberRole } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheckIcon className="ml-2 h-4 w-4 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: (
    <ShieldAlertIcon className="ml-2 h-4 w-4 text-rose-500" />
  ),
}

export default function MembersModal() {
  const router = useRouter()
  const { isOpen, onClose, onOpen, type, data } = useModal()
  const { server } = data as { server: ServerWithMembersWithProfiles }
  const [loadingId, setLoadingId] = React.useState('')
  const isModalOpen = isOpen && type === 'members'

  const onRoleChange = async (memberId: string, newRole: MemberRole) => {
    try {
      setLoadingId(memberId)
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      })

      const res = await axios.patch(url, { role: newRole })

      router.refresh()
      onOpen('members', { server: res.data })
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingId('')
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Manage Members
          </DialogTitle>

          <DialogDescription className="text-center text-zinc-500">
            {server?.members?.length} Member(s)
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.members?.map((member) => (
            <div key={member.id} className="mb-6 flex items-center gap-x-2">
              <UserAvatar src={member.profile.imageUrl} />

              <div className="flex flex-col gap-y-1">
                <div className="flex items-center text-xs font-semibold">
                  {member.profile.name}
                  {roleIconMap[member.role]}
                </div>

                <p className="text-xs text-zinc-500">{member.profile.email}</p>
              </div>

              {server.profileId !== member.profileId &&
                loadingId !== member.id && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVerticalIcon className="h-4 w-4 text-zinc-500" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center">
                            <ShieldQuestionIcon className="mr-2 h-4 w-4" />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>

                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() => onRoleChange(member.id, 'GUEST')}
                              >
                                <ShieldIcon className="mr-2 h-4 w-4" />
                                Guest
                                {member.role === 'GUEST' && (
                                  <CheckIcon className="ml-auto h-4 w-4" />
                                )}
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() =>
                                  onRoleChange(member.id, 'MODERATOR')
                                }
                              >
                                <ShieldCheckIcon className="mr-2 h-4 w-4" />
                                Moderator
                                {member.role === 'MODERATOR' && (
                                  <CheckIcon className="ml-auto h-4 w-4" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                          <GavelIcon className="mr-2 h-4 w-4" />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}

              {loadingId === member.id && (
                <Loader2 className="ml-auto h-4 w-4 animate-spin text-zinc-500" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
