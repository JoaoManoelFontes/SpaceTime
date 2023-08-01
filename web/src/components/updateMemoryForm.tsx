'use client'

import { Memory } from '@/@types/memoryDetail'
import { api } from '@/utils/api'
import cookie from 'js-cookie'
import { useRouter } from 'next/navigation'
import { MediaInput } from './MediaInput'
import { Camera } from 'lucide-react'
import { FormEvent } from 'react'

interface UpdateMemoryProps {
  memory: Memory
}

export function UpdateMemoryForm({ memory }: UpdateMemoryProps) {
  const router = useRouter()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    let media = memory.media

    const fileToUpload = formData.get('media') as File

    if (fileToUpload.size > 0) {
      new FormData().set('media', fileToUpload)

      const uploadResponse = await api.post('/upload', formData)

      media = uploadResponse.data.fileUrl
    }

    const token = cookie.get('token')
    await api.put(
      `/memory/${memory.id}`,
      {
        media,
        title: formData.get('title'),
        content: formData.get('content'),
        isPublic: formData.get('isPublic'),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    router.push('/')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-1 flex-col gap-4 rounded-lg border-opacity-10 p-4 "
    >
      <div className="flex flex-col gap-2 py-2">
        <label htmlFor="title" className="text-sm tracking-widest ">
          Título
        </label>
        <input
          type="text"
          defaultValue={memory.title}
          name="title"
          id="title"
          className="text-md rounded border-gray-800 bg-transparent font-thin  text-gray-100 placeholder-gray-500 focus:border-gray-700 focus:ring-0 focus:ring-offset-0"
          placeholder='Ex: "Meu primeiro dia de aula"'
        />
      </div>
      <div className="flex items-center justify-around gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center  gap-1.5 text-sm hover:text-gray-50 hover:underline"
        >
          <Camera className="h-4 w-4" />
          Anexar imagens, fotos, etc
        </label>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            defaultChecked={memory.isPublic}
            className="focus:ring-gray-5 h-4 w-4 rounded border-2 border-gray-400 bg-gray-700 text-white  focus:ring-0 focus:ring-offset-0"
          />
          <label
            htmlFor="isPublic"
            className=" flex cursor-pointer items-center  gap-1.5 text-sm hover:text-gray-50 hover:underline"
          >
            Tornar memória pública
          </label>
        </div>
      </div>
      <MediaInput previewUrl={memory.media} />
      <label htmlFor="content" className="text-sm tracking-widest">
        Conteúdo
      </label>
      <textarea
        name="content"
        id="content"
        spellCheck={false}
        placeholder="Escreva aqui sua memória..."
        defaultValue={memory.content}
        rows={10}
        className="text-md ml-3 w-full resize-none rounded border-none bg-transparent p-0 font-thin leading-relaxed text-gray-100 placeholder:text-gray-500 focus:ring-0 focus:ring-offset-0"
      ></textarea>

      <button
        type="submit"
        className="mt-4 inline-block  self-end rounded-full bg-gray-800  px-5 py-3 font-secondary text-sm uppercase leading-none tracking-widest text-white hover:bg-slate-500"
      >
        Atualizar
      </button>
    </form>
  )
}
