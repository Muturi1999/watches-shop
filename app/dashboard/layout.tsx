import React from 'react'
import './dashboard.css'
import { products as seedProducts } from '@/lib/products'
import CategoryList from '@/components/dashboard/CategoryList'

export const metadata = {
  title: 'Admin Dashboard',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-root min-h-screen bg-slate-50 text-slate-900">
      <aside className="dashboard-sidebar">
        <div className="p-6 font-bold text-xl">Admin</div>
        <nav className="p-4">
          <a href="/dashboard" className="block py-2 px-3 rounded hover:bg-slate-100">Overview</a>
          <a href="/dashboard/products" className="block py-2 px-3 rounded hover:bg-slate-100">Products</a>
          <a href="/dashboard/settings" className="block py-2 px-3 rounded hover:bg-slate-100">Settings</a>
        </nav>

        <div className="p-4 border-t">
          <div className="px-3 py-2 text-sm font-semibold">Categories</div>
          {/* Client-side category list with active highlighting */}
          <div className="mt-2">
            {/* @ts-ignore Server -> Client: pass array of categories */}
            <CategoryList categories={[...new Map(seedProducts.map((p) => [p.category, p])).keys()]} />
          </div>
        </div>
      </aside>
      <main className="dashboard-main p-6">{children}</main>
    </div>
  )
}
