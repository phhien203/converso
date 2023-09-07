'use client'

import React from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import UserAvatar from '@/components/user-avatar'
import { useModal } from '@/hooks/use-modal-store'
import { ServerWithMembersWithProfiles } from '@/types'

export default function MembersModal() {
  const { isOpen, onClose, onOpen, type, data } = useModal()
  const { server } = data as { server: ServerWithMembersWithProfiles }

  const [isLoading, setIsLoading] = React.useState(false)

  const isModalOpen = isOpen && type === 'members'

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
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
              {member.profile.name}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
