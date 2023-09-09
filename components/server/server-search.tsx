'use client'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { SearchIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

interface Props {
  data: {
    label: string
    type: 'channel' | 'member'
    data:
      | {
          id: string
          name: string
          icon: React.ReactNode
        }[]
      | undefined
  }[]
}

export default function ServerSearch({ data }: Props) {
  const router = useRouter()
  const params = useParams()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)

    return () => document.removeEventListener('keydown', down)
  }, [])

  const onClick = ({
    id,
    type,
  }: {
    id: string
    type: 'channel' | 'member'
  }) => {
    setOpen(false)

    if (type === 'member') {
      router.push(`/servers/${params?.serverId}/conversations/${id}`)
    }
    if (type === 'channel') {
      router.push(`/servers/${params?.serverId}/channels/${id}`)
    }
  }

  return (
    <>
      <button
        className="group flex w-full items-center gap-x-2 rounded-md px-2 py-2 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
        <p className="text-sm font-semibold text-zinc-500 transition group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300">
          Search
        </p>

        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all channels and members" />

        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>

          {data.map(({ label, type, data: innerData }) => {
            if (!innerData) return null

            return (
              <CommandGroup key={label} heading={label}>
                {innerData?.map(({ id, name, icon }) => (
                  <CommandItem key={id} onSelect={() => onClick({ id, type })}>
                    {icon}
                    <span>{name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )
          })}
        </CommandList>
      </CommandDialog>
    </>
  )
}
