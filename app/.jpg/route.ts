import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const query = url.searchParams.get('query') || 'product'
  const width = url.searchParams.get('width') || '400'
  const height = url.searchParams.get('height') || '400'

  // Proxy to Unsplash Source which returns a relevant image for the given query.
  // Redirecting keeps the implementation small and avoids streaming binary here.
  const unsplash = `https://source.unsplash.com/featured/${width}x${height}?${encodeURIComponent(
    query,
  )}`

  return NextResponse.redirect(unsplash, 307)
}

export const runtime = 'edge'
