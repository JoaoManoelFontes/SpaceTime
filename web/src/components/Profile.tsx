import { getUser } from '@/utils/auth'
import Image from 'next/image'

export function Profile() {
  const { name, avatar } = getUser()

  return (
    <div className="flex items-center gap-3 rounded-full bg-gray-800 p-3 text-left hover:bg-gray-700">
      <a href={avatar} target="blank">
        <Image
          src={avatar}
          width={40}
          height={40}
          alt=""
          className="h-10 w-10 rounded-full"
        />
      </a>
      <p className="max-w-[140px]  text-sm leading-snug ">
        <span>Bem-vindo, {name}!</span>
        <br />
        <a
          href="/api/auth/logout"
          className="block text-xs text-red-800  hover:text-red-900  hover:underline"
        >
          {' '}
          Quero sair
        </a>
      </p>
    </div>
  )
}
