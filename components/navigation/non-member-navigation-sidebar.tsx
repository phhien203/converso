import { UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { ModeToggle } from '@/components/mode-toggle'
import { currentProfile } from '@/lib/current-profile'

export default async function NonMemberNavigationSidebar() {
  const profile = await currentProfile()

  if (!profile) {
    redirect('/')
  }

  return (
    <div className="flex h-full w-full flex-col items-center space-y-4 bg-[#e3e5e8] py-3 text-primary dark:bg-[#1E1F22]">
      <div className="flex-1"></div>

      <div className="mt-auto flex flex-col items-center gap-y-4 pb-3">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: 'h-[48px] w-[48px]',
            },
          }}
        />
      </div>
    </div>
  )
}
