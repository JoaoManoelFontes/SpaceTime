import { api } from '@/utils/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.nextUrl)
  const code = searchParams.get('code')

  const redirect = request.cookies.get('redirectTo')?.value

  const { data } = await api.post('/auth', { code })

  const cookieExpiration = 60 * 60 * 24 // 1 day
  const redirectUrl = redirect ?? new URL('/', request.url)

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Set-Cookie': `token=${data.token}; Path=/; max-age=${cookieExpiration}; SameSite=Strict`,
    },
  })
}
