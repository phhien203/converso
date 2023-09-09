'use client'

import React from 'react'

import CreateChannelModal from '@/components/modals/create-channel-modal'
import CreateServerModal from '@/components/modals/create-server-modal'
import DeleteChannelModal from '@/components/modals/delete-channel-modal'
import DeleteServerModal from '@/components/modals/delete-server-modal'
import EditServerModal from '@/components/modals/edit-server-modal'
import InviteModal from '@/components/modals/invite-modal'
import LeaveServerModal from '@/components/modals/leave-server-modal'
import MembersModal from '@/components/modals/members-modal'

export default function ModalProvider() {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
    </>
  )
}
