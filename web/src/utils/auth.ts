import { cookies } from 'next/headers'
import decode from 'jwt-decode'

interface User {
  sub: string
  name: string
  avatar: string
}

export function getUser(): User {
  const token = cookies().get('token')?.value

  if (!token) {
    throw new Error('No token found')
  }

  return decode(token)
}
