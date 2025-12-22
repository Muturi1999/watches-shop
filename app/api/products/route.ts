import { promises as fs } from 'fs'
import path from 'path'
import { products as seedProducts, type Product } from '@/lib/products'
import { NextResponse } from 'next/server'

const dataPath = path.join(process.cwd(), 'data', 'products.json')

async function ensureSeed() {
  try {
    await fs.access(dataPath)
  } catch (e) {
    // seed file from lib/products
    await fs.mkdir(path.dirname(dataPath), { recursive: true })
    await fs.writeFile(dataPath, JSON.stringify(seedProducts, null, 2), 'utf-8')
  }
}

export async function GET(req: Request) {
  await ensureSeed()
  const url = new URL(req.url)
  const id = url.searchParams.get('id')
  const category = url.searchParams.get('category')
  const q = url.searchParams.get('q')

  const raw = await fs.readFile(dataPath, 'utf-8')
  let data: Product[] = JSON.parse(raw)

  if (id) {
    const found = data.find((p) => String(p.id) === id)
    return NextResponse.json(found || null)
  }

  if (category) {
    data = data.filter((p) => (p.category || '').toLowerCase() === category.toLowerCase())
  }

  if (q) {
    const ql = q.toLowerCase()
    data = data.filter((p) => (p.name || '').toLowerCase().includes(ql) || (p.tags || []).some((t) => t.toLowerCase().includes(ql)))
  }

  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = await req.json()
  const newProduct: Product = body
  await ensureSeed()
  const raw = await fs.readFile(dataPath, 'utf-8')
  const data: Product[] = JSON.parse(raw)
  const maxId = data.reduce((m, p) => Math.max(m, p.id || 0), 0)
  newProduct.id = (newProduct.id && newProduct.id > 0) ? newProduct.id : maxId + 1
  data.push(newProduct)
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf-8')
  return NextResponse.json(newProduct, { status: 201 })
}

export async function PUT(req: Request) {
  const body = await req.json()
  const id = Number(body.id)
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  await ensureSeed()
  const raw = await fs.readFile(dataPath, 'utf-8')
  const data: Product[] = JSON.parse(raw)
  const idx = data.findIndex((p) => p.id === id)
  if (idx === -1) return NextResponse.json({ error: 'not found' }, { status: 404 })
  data[idx] = { ...data[idx], ...body }
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf-8')
  return NextResponse.json(data[idx])
}

export async function DELETE(req: Request) {
  const url = new URL(req.url)
  const id = Number(url.searchParams.get('id'))
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  await ensureSeed()
  const raw = await fs.readFile(dataPath, 'utf-8')
  let data: Product[] = JSON.parse(raw)
  data = data.filter((p) => p.id !== id)
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf-8')
  return NextResponse.json({ success: true })
}

export const runtime = 'nodejs'
