import { Memory } from '@/@types/memoryDetail'
import { api } from '@/utils/api'
import dayjs from 'dayjs'
import { ArrowBigLeft } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

interface Params {
  params: {
    id: string
  }
}

export default async function Page({ params }: Params) {
  const { id } = params
  const token = cookies().get('token')?.value

  const response = await api.get(`/memories/public/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memories: Array<Memory> = response.data

  if (memories.length === 0 || !memories) {
    return <div>Perfil não existe ou não há nenhuma memória pública nele</div>
  }
  return (
    <div className="flex flex-col gap-10 p-16">
      <Link
        href="/"
        className="text-gray200 flex items-center gap-1 text-sm hover:text-gray-50"
      >
        <ArrowBigLeft className="h-7 w-7" />
      </Link>
      {memories.map((memory) => {
        return (
          <div key={memory.id} className="space-y-4">
            <div className="flex flex-col">
              <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-3 before:bg-gray-100 ">
                {dayjs(memory.createdAt).format('D[ de ]MMM[, ]YYYY')}
              </time>
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
              {memory.content}
            </p>
            <hr className="border-gray-800" />
          </div>
        )
      })}
    </div>
  )
}
