import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/utils/api'
import { cookies } from 'next/headers'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Trash } from 'lucide-react'
import { SearchProfile } from '@/components/SearchProfile'

interface Memory {
  id: string
  title: string
  media: string
  excerpt: string
  createdAt: string
}

export default async function Home() {
  if (!cookies().has('token')) {
    return <EmptyMemories />
  }

  const { data } = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${cookies().get('token')?.value}`,
    },
  })

  const memories: Memory[] = data

  if (memories.length === 0) {
    return <EmptyMemories />
  }

  // function handleDeleteMemory(id: string) {
  //   api.delete(`/memory/${id}`, {
  //     headers: {
  //       Authorization: `Bearer ${cookies().get('token')?.value}`,
  //     },
  //   })
  // }

  return (
    <div className="flex flex-col gap-10 p-16">
      <SearchProfile />

      {memories.map((memory) => {
        return (
          <div key={memory.id} className="space-y-4">
            <div className="flex flex-col">
              <div className="flex flex-row justify-between">
                <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-3 before:bg-gray-100 ">
                  {dayjs(memory.createdAt).format('D[ de ]MMM[, ]YYYY')}
                </time>
                <a href={`/api/memories/?id=${memory.id}`}>
                  <Trash className="h-5 w-5 cursor-pointer self-end text-right text-gray-400 hover:text-red-900" />
                </a>
              </div>
              <h1 className="text-center font-secondary text-lg font-bold tracking-widest">
                {memory.title}
              </h1>
            </div>
            <Image
              src={memory.media}
              alt={memory.title}
              width={592}
              height={280}
              className="aspect-video w-full rounded-lg object-cover"
            />

            <br />
            <p className="text-md font-thin leading-relaxed text-gray-300">
              {memory.excerpt}
              <Link
                href={`/memories/${memory.id}`}
                className="flex justify-end gap-2 text-sm text-gray-500 hover:text-gray-300"
              >
                {' '}
                Ler mais
                <ArrowRight className="inline-block h-4 w-4" />
              </Link>
            </p>
            <hr className="border-gray-800" />
          </div>
        )
      })}
    </div>
  )
}
