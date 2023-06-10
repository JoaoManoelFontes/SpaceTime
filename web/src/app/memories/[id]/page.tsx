import { cookies } from 'next/headers'
import { api } from '@/utils/api'
import { Memory } from '@/@types/memoryDetail'

interface Params {
  params: {
    id: string
  }
}

export default async function DetailsMemoryPage({ params }: Params) {
  const { id } = params
  const token = cookies().get('token')?.value

  const response = await api.get(`/memory/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memory: Memory = response.data

  return <h1>{memory.title}</h1>
}
