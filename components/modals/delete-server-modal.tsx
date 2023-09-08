'use client'

import React from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useModal } from '@/hooks/use-modal-store'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function DeleteServerModal() {
  const router = useRouter()
  const { isOpen, onClose, onOpen, type, data } = useModal()
  const { server } = data
  const [isLoading, setIsLoading] = React.useState(false)
  const isModalOpen = isOpen && type === 'deleteServer'

  const deleteServer = async () => {
    try {
      setIsLoading(true)
      await axios.delete(`/api/servers/${server?.id}`)

      onClose()
      router.refresh()
      router.push('/')
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
            Delete Server
          </DialogTitle>

          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this?
            <br />
            Server{' '}
            <span className="font-semibold text-indigo-500">
              {server?.name}
            </span>{' '}
            will be permanently deleted.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex w-full items-center justify-end gap-x-2">
            <Button variant="ghost" disabled={isLoading} onClick={onClose}>
              Cancel
            </Button>

            <Button
              variant="primary"
              disabled={isLoading}
              onClick={deleteServer}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
