import { redirectToSignIn } from '@clerk/nextjs'
import { Server } from '@prisma/client'
import { redirect } from 'next/navigation'

import { currentProfile } from '@/lib/current-profile'
import { prisma } from '@/lib/db'

export default async function InviteCodePage({
  params,
}: {
  params: { inviteCode: string }
}) {
  if (!params.inviteCode) {
    return redirect('/')
  }

  const profile = await currentProfile()

  if (!profile) {
    return redirectToSignIn()
  }

  const existingServer = await prisma.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}}`)
  }

  let server: Server | null = null

  try {
    server = await prisma.server.update({
      where: {
        inviteCode: params.inviteCode,
      },
      data: {
        members: {
          create: [
            {
              profileId: profile.id,
            },
          ],
        },
      },
    })
  } catch (error) {
    console.log('[InviteCodePage]', error)
    return (
      <div className="mx-auto mt-4 flex max-w-lg flex-col space-y-2">
        <h2 className="text-center text-2xl font-semibold">
          Invalid invite code
        </h2>
        <p className="text-sm">
          The current invite code is invalid. Please contact your admin for
          support.
        </p>
      </div>
    )
  }

  if (server) {
    return redirect(`/servers/${server.id}`)
  } else {
    return null
  }
}
