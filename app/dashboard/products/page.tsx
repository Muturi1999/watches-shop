import React from 'react'
import ProductList from '@/components/dashboard/ProductList'
import { products as seedProducts } from '@/lib/products'

export default function ProductsPage({ searchParams }: { searchParams?: { category?: string } }) {
  // Server-side initial data from the canonical source
  const initial = seedProducts
  const category = searchParams?.category

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Products</h1>
      {category ? <div className="mb-4 text-sm text-slate-600">Filtering by category: <strong>{category}</strong></div> : null}
      <ProductList initialProducts={initial} filterCategory={category} />
    </div>
  )
}
