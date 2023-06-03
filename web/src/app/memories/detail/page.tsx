'use client'

import { ArrowBigLeft } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Cookies from 'js-cookie'
import { api } from '@/utils/api'
import dayjs from 'dayjs'
import Image from 'next/image'

export default async function Page() {
  const searchParams = useSearchParams()
  const token = Cookies.get('token')

  const { data } = await api.get(`/memory/${searchParams.get('id')}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <div className="flex flex-col">
        <Link
          href="/"
          className="text-gray200 flex items-center gap-1 text-sm hover:text-gray-50"
        >
          <ArrowBigLeft className="h-7 w-7" />
        </Link>
        <h1 className="text-center font-secondary text-lg font-bold tracking-widest">
          {data.title}
        </h1>
        <time className="p-2 text-right text-xs tracking-wide opacity-40">
          {dayjs(data.createdAt).format('D[ de  ]MMM[, ]YYYY')}
        </time>
        <p className="p-2 text-right text-xs tracking-wide opacity-40">
          {data.isPublic ? 'Memória Pública' : 'Memória Privada'}
        </p>
      </div>
      <Image
        src={data.media}
        alt={data.title}
        width={592}
        height={280}
        className="aspect-video w-full rounded-lg object-cover"
      />
      <br />
      <p className="text-md break-normal font-thin leading-relaxed text-gray-300">
        {data.content}
      </p>

      <hr className="border-gray-600" />
    </div>
  )
}
