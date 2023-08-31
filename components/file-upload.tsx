'use client'

import { UploadDropzone } from '@/lib/uploadthing'
import '@uploadthing/react/styles.css'
import { X } from 'lucide-react'
import Image from 'next/image'

export default function FileUpload({
  value,
  onChange,
  endpoint,
}: {
  value: string
  onChange: (url?: string) => void
  endpoint: 'messageFile' | 'serverImage'
}) {
  const fileType = value?.split('.').pop()

  if (value && fileType !== 'pdf') {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          type="button"
          className="absolute right-0 top-0 rounded-full bg-rose-500 p-1 text-white shadow-sm"
          onClick={() => onChange('')}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => onChange(res?.[0].url)}
      onUploadError={(error: Error) => {
        console.log(error)
      }}
    />
  )
}
