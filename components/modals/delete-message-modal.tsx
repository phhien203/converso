'use client'

import axios from 'axios'
import qs from 'query-string'
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

export default function DeleteMessageModal() {
  const { isOpen, onClose, type, data } = useModal()
  const { apiUrl, query } = data
  const [isLoading, setIsLoading] = React.useState(false)
  const isModalOpen = isOpen && type === 'deleteMessage'

  const deleteMessage = async () => {
    try {
      setIsLoading(true)
      const url = qs.stringifyUrl({
        url: apiUrl as string,
        query,
      })
      await axios.delete(url)

      onClose()
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
            Delete Message
          </DialogTitle>

          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this?
            <br />
            The message will be permanently deleted.
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
              onClick={deleteMessage}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
