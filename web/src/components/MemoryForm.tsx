'use client'

import { Camera } from 'lucide-react'
import { MediaInput } from './MediaInput'
import { FormEvent } from 'react'
import { api } from '@/utils/api'
import { useRouter } from 'next/navigation'

export function MemoryForm() {
  const router = useRouter()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    console.log(Array.from(formData.entries()))
    const file = formData.get('media')

    file && new FormData().set('media', file)

    const { data } = await api.post('/upload', formData)

    console.log({
      content: formData.get('content'),
      isPublic: formData.get('isPublic'),
      title: formData.get('title'),
      media: data,
    })

    const response = await api.post(
      '/memories',
      {
        content: formData.get('content'),
        isPublic: formData.get('isPublic'),
        title: formData.get('title'),
        media: data,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${document.cookie.substring(6)}`,
        },
      },
    )
    console.log(response)
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
      <MediaInput />
      <label htmlFor="content" className="text-sm tracking-widest">
        Conteúdo
      </label>
      <textarea
        name="content"
        id="content"
        spellCheck={false}
        placeholder="Escreva aqui sua memória..."
        rows={10}
        className="text-md ml-3 w-full resize-none rounded border-none bg-transparent p-0 font-thin leading-relaxed text-gray-100 placeholder:text-gray-500 focus:ring-0 focus:ring-offset-0"
      ></textarea>

      <button
        type="submit"
        className="mt-4 inline-block  self-end rounded-full bg-gray-800  px-5 py-3 font-secondary text-sm uppercase leading-none tracking-widest text-white hover:bg-slate-500"
      >
        Cadastrar
      </button>
    </form>
  )
}
