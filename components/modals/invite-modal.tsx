'use client'

import { CheckIcon, CopyIcon, RefreshCwIcon } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useModal } from '@/hooks/use-modal-store'
import { useOrigin } from '@/hooks/use-origin'
import axios from 'axios'

export default function InviteModal() {
  const origin = useOrigin()
  const { isOpen, onClose, onOpen, type, data } = useModal()
  const { server } = data

  const [copied, setCopied] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const isModalOpen = isOpen && type === 'invite'
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  const onGenerateNewInviteLink = async () => {
    try {
      setIsLoading(true)

      const res = await axios.patch(`/api/servers/${server?.id}/invite-code`)

      onOpen('invite', { server: res.data })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Invite Friends
          </DialogTitle>
        </DialogHeader>

        <div className="p-6">
          <Label className="text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70">
            Server invite link
          </Label>

          <div className="mt-2 flex items-center gap-x-2">
            <Input
              className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
              value={inviteUrl}
              disabled={isLoading}
            />
            <Button size="icon" disabled={isLoading} onClick={onCopy}>
              {copied ? (
                <CheckIcon className="h-4 w-4" />
              ) : (
                <CopyIcon className="h-4 w-4" />
              )}
            </Button>
          </div>

          <Button
            size="sm"
            variant="link"
            className="mt-4 text-xs text-zinc-500"
            disabled={isLoading}
            onClick={onGenerateNewInviteLink}
          >
            Generate a new link
            <RefreshCwIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
