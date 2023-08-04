import { NextRequest, NextResponse } from 'next/server'
import { api } from '@/utils/api'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.nextUrl)
  const id = searchParams.get('id')

  await api.delete(`/memories/${id}`, {
    headers: {
      Authorization: `Bearer ${cookies().get('token')?.value}`,
    },
  })

  const redirectUrl = new URL('/', request.url)
  return NextResponse.redirect(redirectUrl)
}
