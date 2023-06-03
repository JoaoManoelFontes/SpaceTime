'use client'

import { useSearchParams } from 'next/navigation'
import Cookies from 'js-cookie'
import { api } from '@/utils/api'

export default async function Page() {
  const searchParams = useSearchParams()
  const token = Cookies.get('token')

  const { data } = await api.get(`/memories/public/${searchParams.get('id')}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  console.log(data[0].title)

  return (
    <div className="flex flex-col gap-10 p-16">
      <h1>{data[0].title}</h1>
    </div>
  )
}
