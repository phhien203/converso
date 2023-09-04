import { currentProfile } from '@/lib/current-profile'
import { prisma } from '@/lib/db'
import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

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

  try {
    const server = await prisma.server.update({
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

    if (server) {
      return redirect(`/servers/${server.id}`)
    }
  } catch {
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

  return (
    <div className="mx-auto mt-4 flex max-w-lg flex-col space-y-2">
      <h2 className="text-2xl font-semibold">Invalid invite code</h2>
      <p className="text-sm">
        The current invite code is invalid. Please contact your admin for
        support.
      </p>
    </div>
  )
}
