import { SearchProfile } from './SearchProfile'

export function EmptyMemories() {
  return (
    <div className="flex flex-col items-center gap-[110px] p-16">
      <SearchProfile />
      <hr className="border-gray-800" />

      <div>
        <p className="w-[360px] text-center leading-relaxed">
          Você ainda não registrou nenhuma lembrança,{' '}
          <a
            href="/memories/create"
            className="hover:text-gray-50 hover:underline"
          >
            comece a criar agora!
          </a>
        </p>
      </div>
    </div>
  )
}
