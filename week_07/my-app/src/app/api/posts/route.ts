import { NextRequest, NextResponse } from 'next/server'

// https://nextjs.org/docs/app/api-reference/file-conventions/route
export async function GET() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await res.json()

  return NextResponse.json({ data })
}

