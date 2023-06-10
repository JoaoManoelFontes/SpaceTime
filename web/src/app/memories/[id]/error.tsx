'use client'

export default function Error({ error }: { error: Error }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold text-gray-100">Unauthorized!</h2>
      <p>{error.message}</p>
      <p>sas</p>
    </div>
  )
}
