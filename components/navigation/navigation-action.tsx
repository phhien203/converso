'use client'

import { PlusIcon } from 'lucide-react'

import ActionTooltip from '@/components/action-tooltip'

export default function NavigationAction() {
  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add new server">
        <button className="group flex items-center">
          <div className="mx-3 flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-[24px] bg-background transition-all group-hover:rounded-[16px] group-hover:bg-emerald-500 dark:bg-neutral-700">
            <PlusIcon
              size={25}
              className="text-emerald-500 transition group-hover:text-white"
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  )
}
