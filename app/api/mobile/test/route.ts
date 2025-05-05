import { NextRequest } from 'next/server'
import applyCorsForMobiles from '@/tools/api/applyCorsForMobile'

export async function OPTIONS(request: NextRequest) {
  return applyCorsForMobiles(request, null, 204)
}

export async function GET(request: NextRequest) {
  return applyCorsForMobiles(request, {
    success: true,
    message: 'GET : accès autorisé depuis le mobile.',
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  return applyCorsForMobiles(request, {
    success: true,
    message: 'POST : données reçues avec succès.',
    data: body,
  })
}

export async function PUT(request: NextRequest) {
    const body = await request.json()
    
    return applyCorsForMobiles(request, {
        success: true,
        message: 'PUT : données mises à jour avec succès.',
        data: body,
    })
}
