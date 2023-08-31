import { redirect } from 'next/navigation'

import InitialModal from '@/components/modals/initial-modal'
import { prisma } from '@/lib/db'
import { initialProfile } from '@/lib/initial-profile'

export default async function SetupPage() {
  const profile = await initialProfile()

  const server = await prisma.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  if (server) {
    return redirect(`/servers/${server.id}`)
  }

  return <InitialModal />
}
