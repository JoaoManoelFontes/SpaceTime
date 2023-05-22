import { MemoryForm } from '@/components/MemoryForm'
import { ArrowBigLeft } from 'lucide-react'
import Link from 'next/link'

export default function createMemory() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <div className="flex flex-col">
        <Link
          href="/"
          className="text-gray200 flex items-center gap-1 text-sm hover:text-gray-50"
        >
          <ArrowBigLeft className="h-7 w-7" />
        </Link>
        <h1 className="text-center font-secondary  text-lg font-bold tracking-widest">
          Crie uma nova memória
        </h1>
      </div>
      <hr className="border-gray-600" />

      <MemoryForm />
    </div>
  )
}
