'use client'

import React from 'react'

import CreateServerModal from '@/components/modals/create-server-modal'
import EditServerModal from '@/components/modals/edit-server-modal'
import InviteModal from '@/components/modals/invite-modal'
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
    </>
  )
}
