import { User } from 'lucide-react'

export function SingIn() {
  return (
    <div>
      <a
        href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}
              `}
        className="flex items-center gap-3 rounded-full bg-gray-800 p-2 text-left hover:bg-gray-700"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
          <User size={24} className="text-gray-700" />
        </div>
        <p className="max-w-[140px]  text-sm leading-snug ">
          <span>Crie sua conta </span> e salve suas memórias!
        </p>
      </a>
    </div>
  )
}
