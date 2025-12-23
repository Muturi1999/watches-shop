import React from 'react'
import Link from 'next/link'

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Platform Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded shadow">
          <h2 className="font-semibold">Products</h2>
          <p className="text-sm text-muted-foreground">Manage products in the store.</p>
          <Link href="/admin/products">
            <button className="mt-4 btn">Open products →</button>
          </Link>
        </div>
        <div className="p-6 bg-white rounded shadow">
          <h2 className="font-semibold">Settings</h2>
          <p className="text-sm text-muted-foreground">Platform-wide settings and preferences.</p>
          <Link href="/admin/settings">
            <button className="mt-4 btn">Open settings →</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
