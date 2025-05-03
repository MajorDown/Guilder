// utils/applyCors.ts
import { NextRequest, NextResponse } from 'next/server'

const blacklistedOrigins = [
  'http://192.168.1.66',
  'http://malicious-site.com',
  'exp://evil-host',
  // Ajoute ici d'autres origines à bloquer
]

export function applyCors(request: NextRequest, body: any, status = 200): NextResponse {
  const origin = request.headers.get('origin') || ''
  const isBlacklisted = blacklistedOrigins.some((bad) => origin.startsWith(bad))

  const headers = {
    'Access-Control-Allow-Origin': isBlacklisted ? '' : origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  }

  return new NextResponse(JSON.stringify(body), {
    status: isBlacklisted ? 403 : status,
    headers,
  })
}
