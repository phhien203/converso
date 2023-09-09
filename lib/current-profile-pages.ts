import { getAuth } from '@clerk/nextjs/server'
import { NextApiRequest } from 'next'

import { prisma } from '@/lib/db'

export async function currentProfilePages(req: NextApiRequest) {
  const { userId } = getAuth(req)

  if (!userId) {
    return null
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId,
    },
  })

  return profile
}
