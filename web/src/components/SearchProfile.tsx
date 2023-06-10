'use client'

import { Search } from 'lucide-react'
import Link from 'next/link'
import { useState, ChangeEvent } from 'react'

export function SearchProfile() {
  const [search, setSearch] = useState('')

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  return (
    <div className="flex flex-1 flex-col items-center">
      <div
        className="flex gap-2
      "
      >
        <input
          type="text"
          name="title"
          id="title"
          onChange={handleSearch}
          className="text-md max-w-full rounded border-gray-700 bg-transparent  font-thin text-gray-100 placeholder-gray-500 focus:border-gray-500 focus:ring-0 focus:ring-offset-0"
          placeholder="Pesquisar por perfil"
        />
        <button>
          <Link href={`/memories/profile/${search}`}>
            <Search className="h-4 w-6" />
          </Link>
        </button>
      </div>
    </div>
  )
}
