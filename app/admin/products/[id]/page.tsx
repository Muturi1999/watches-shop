import React from 'react'
import Link from 'next/link'

type Props = { params: { id: string } }

export default async function ProductDetail({ params }: Props) {
  const id = params.id
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/products?id=${id}`, { cache: 'no-store' })
  const product = await res.json()

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <div className="mb-3">ID: {product.id}</div>
      <div className="mb-2"><strong>Brand:</strong> {product.brand}</div>
      <div className="mb-2"><strong>Category:</strong> {product.category} / {product.subcategory}</div>
      <div className="mb-2"><strong>Price:</strong> {product.price}</div>
      <div className="mb-2"><strong>Tags:</strong> {(product.tags || []).join(', ')}</div>
      <div className="mb-2"><strong>Badges:</strong> {(product.badges || []).join(', ')}</div>
      <div className="mb-2"><strong>Inventory:</strong> {product.inventory ? `${product.inventory.stock ?? '-'} pcs (SKU: ${product.inventory.sku ?? '-'})` : '-'}</div>
      <div className="mb-4"><strong>Description:</strong><div className="mt-1 text-sm text-slate-700">{product.description}</div></div>

      <div className="flex gap-2">
        <Link href="/admin/products" className="btn btn-ghost">Back</Link>
        <Link href={`/admin/products`} className="btn">Edit (open list)</Link>
      </div>
    </div>
  )
}
