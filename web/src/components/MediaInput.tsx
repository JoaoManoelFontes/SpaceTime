'use client'

import { Trash } from 'lucide-react'
import Image from 'next/image'
import { ChangeEvent, useState, MouseEvent } from 'react'

interface IMediaPickerProps {
  previewUrl?: string
}

export function MediaInput({ previewUrl }: IMediaPickerProps) {
  const [preview, setPreview] = useState<string | null>(previewUrl ?? null)

  function onFileClicked(
    event: MouseEvent<HTMLInputElement, globalThis.MouseEvent>,
  ) {
    const element = event.target as HTMLInputElement
    element.value = ''
  }

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return
    }

    setPreview(URL.createObjectURL(event.target.files[0]))
  }

  function onRemove() {
    setPreview('')
  }

  return (
    <>
      <input
        type="file"
        name="media"
        id="media"
        className="invisible h-0 w-0"
        onChange={onFileSelected}
        onClick={onFileClicked}
        accept="image/*"
      />

      {preview && (
        <div className="flex flex-col gap-2">
          <Image
            src={preview}
            alt={preview}
            width={592}
            height={280}
            className="aspect-video w-full rounded-lg object-cover"
          />
          <Trash
            className="h-4 w-4 cursor-pointer self-end text-right text-gray-400 hover:text-gray-200"
            onClick={onRemove}
          />
        </div>
      )}
    </>
  )
}
