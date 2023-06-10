/* eslint-disable prettier/prettier */
import Image from 'next/image'
import hero from '../assets/logo.png'
import Link from 'next/link'

export function Hero() {
  return (
    <>
      <div className="space-y-5 ">
        <Image src={hero} alt="hero" width={200} />
        <div className="max-w-[420px] space-y-1">
          <h1 className="text-4xl font-bold leading-tight text-gray-50">
            Sua cápsula do tempo
          </h1>
          <br />
          <p className="text-xlg leading-relaxed">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </p>
        </div>
      </div>
      <div>
        <Link
          href="/memories/create"
          className="inline-block rounded-full bg-gray-800 px-5 py-3 font-secondary text-sm uppercase leading-none tracking-widest text-white hover:bg-slate-500"
        >
          ADICIONAR LEMBRANÇA
        </Link>
      </div>
    </>
  )
}
