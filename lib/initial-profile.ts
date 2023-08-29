import { prisma } from '@/lib/db'

import { currentUser, redirectToSignIn } from '@clerk/nextjs'

export const initialProfile = async () => {
  const user = await currentUser()

  if (!user) {
    return redirectToSignIn()
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: user.id,
    },
  })

  if (profile) {
    return profile
  }

  const newProfile = await prisma.profile.create({
    data: {
      userId: user.id,
      imageUrl: user.imageUrl,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
    },
  })

  return newProfile
}
