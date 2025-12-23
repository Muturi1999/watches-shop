"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

export default function CategoryList({ categories }: { categories: string[] }) {
  const pathname = usePathname() || ''
  const sp = useSearchParams()
  const active = sp?.get('category') || null

  const isProductsPage = pathname.startsWith('/admin/products') || pathname === '/admin/products'

  return (
    <ul>
      <li className="px-3 py-1"><Link href="/admin/products" className={isProductsPage && !active ? 'text-sm font-semibold' : 'text-sm'}>All</Link></li>
      {categories.map((cat) => (
        <li key={cat} className="px-3 py-1">
          <Link href={`/admin/products?category=${encodeURIComponent(cat)}`} className={active === cat ? 'text-sm font-semibold' : 'text-sm'}>{cat}</Link>
        </li>
      ))}
    </ul>
  )
}
