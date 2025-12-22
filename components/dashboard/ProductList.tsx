"use client"
import React, { useState, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'
import type { Product } from '@/lib/products'
import './product-list.css'

export default function ProductList({ initialProducts, filterCategory }: { initialProducts: Product[]; filterCategory?: string }) {
  const [products, setProducts] = useState<Product[]>(() => (filterCategory ? initialProducts.filter((p) => p.category === filterCategory) : initialProducts) || [])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', price: '', category: '', brand: '', subcategory: '', tags: '', badges: '', discountPercentage: '', inventoryStock: '', inventorySku: '' })
  const [createOpen, setCreateOpen] = useState(false)
  const [createErrors, setCreateErrors] = useState<Record<string, string>>({})
  const [selected, setSelected] = useState<Product | null>(null)
  const [mode, setMode] = useState<'view' | 'edit' | null>(null)
  const [editForm, setEditForm] = useState<Partial<Product>>({})
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // fetch latest from API (optionally filtered by category)
    const url = filterCategory ? `/api/products?category=${encodeURIComponent(filterCategory)}` : '/api/products'
    fetch(url).then((r) => r.json()).then(setProducts).catch(() => {})
  }, [filterCategory])

  async function createProduct(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const body: any = {
      name: form.name,
      price: form.price,
      category: form.category,
      brand: form.brand || undefined,
      subcategory: form.subcategory || undefined,
      tags: form.tags ? form.tags.split(',').map((s) => s.trim()).filter(Boolean) : undefined,
      badges: form.badges ? form.badges.split(',').map((s) => s.trim()).filter(Boolean) : undefined,
      discountPercentage: form.discountPercentage ? Number(form.discountPercentage) : undefined,
      inventory: (form.inventoryStock || form.inventorySku) ? { stock: form.inventoryStock ? Number(form.inventoryStock) : undefined, sku: form.inventorySku || undefined } : undefined,
    }

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (res.ok) {
      const data = await res.json()
      // only add to list if it matches current filter (or no filter)
      if (!filterCategory || data.category === filterCategory) {
        setProducts((p) => [...p, data])
      }
      setForm({ name: '', price: '', category: '', brand: '', subcategory: '', tags: '', badges: '', discountPercentage: '', inventoryStock: '', inventorySku: '' })
      toast({ title: 'Product created' })
    }
    setLoading(false)
  }

  async function deleteProduct(id: number) {
    if (!confirm('Delete product ' + id + '?')) return
    const res = await fetch('/api/products?id=' + id, { method: 'DELETE' })
    if (res.ok) {
      setProducts((p) => p.filter((x) => x.id !== id))
      toast({ title: 'Product deleted' })
    }
  }

  function openView(p: Product) {
    setSelected(p)
    setMode('view')
  }

  function openEdit(p: Product) {
    setSelected(p)
    setEditForm({ ...p })
    setMode('edit')
  }

  function closeModal() {
    setMode(null)
    setSelected(null)
    setEditForm({})
    setSaving(false)
  }

  function setField<K extends keyof Product>(key: K, value: Product[K]) {
    setEditForm((s) => ({ ...s, [key]: value }))
  }

  async function submitEdit(e?: React.FormEvent) {
    e?.preventDefault()
    if (!selected?.id) return
    setSaving(true)

    // post the updated fields; transform tags/badges if provided as string
    const body: any = { ...editForm }
    if (typeof body.tags === 'string') {
      body.tags = (body.tags as unknown as string).split(',').map((s: string) => s.trim()).filter(Boolean)
    }
    if (typeof body.badges === 'string') {
      body.badges = (body.badges as unknown as string).split(',').map((s: string) => s.trim()).filter(Boolean)
    }
    // ensure inventory is an object if provided as fields
    if (body.inventory && typeof body.inventory !== 'object') {
      body.inventory = { stock: Number(body.inventory) }
    }

    try {
      const payload = { id: selected.id, ...body }
      const res = await fetch('/api/products?id=' + selected.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        const updated = await res.json()
        setProducts((p) => p.map((x) => (x.id === updated.id ? updated : x)))
        toast({ title: 'Product saved' })
        closeModal()
      } else {
        const text = await res.text()
        toast({ title: 'Save failed', description: text })
      }
    } catch (err) {
      console.error(err)
      toast({ title: 'Save failed' })
    }
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div />
        <div>
          <button className="btn" onClick={() => setCreateOpen(true)}>Add product</button>
        </div>
      </div>

      {/* Create product modal */}
      {createOpen ? (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add Product</h3>
              <button className="btn btn-ghost" onClick={() => { setCreateOpen(false); setCreateErrors({}); }}>Close</button>
            </div>
            <form className="modal-body space-y-3" onSubmit={createProduct}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  {createErrors.name ? <div className="text-red-600 text-sm mt-1">{createErrors.name}</div> : null}
                </div>
                <div>
                  <input className="input" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                  {createErrors.price ? <div className="text-red-600 text-sm mt-1">{createErrors.price}</div> : null}
                </div>
                <div>
                  <input className="input" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                  {createErrors.category ? <div className="text-red-600 text-sm mt-1">{createErrors.category}</div> : null}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input className="input" placeholder="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
                <input className="input" placeholder="Subcategory" value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })} />
                <input className="input" placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
                <input className="input" placeholder="Badges (comma separated)" value={form.badges} onChange={(e) => setForm({ ...form, badges: e.target.value })} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div>
                  <input className="input" placeholder="Discount %" value={form.discountPercentage} onChange={(e) => setForm({ ...form, discountPercentage: e.target.value })} />
                  {createErrors.discountPercentage ? <div className="text-red-600 text-sm mt-1">{createErrors.discountPercentage}</div> : null}
                </div>
                <div>
                  <input className="input" placeholder="Inventory stock" value={form.inventoryStock} onChange={(e) => setForm({ ...form, inventoryStock: e.target.value })} />
                  {createErrors.inventoryStock ? <div className="text-red-600 text-sm mt-1">{createErrors.inventoryStock}</div> : null}
                </div>
                <input className="input" placeholder="Inventory SKU" value={form.inventorySku} onChange={(e) => setForm({ ...form, inventorySku: e.target.value })} />
                <div className="flex gap-2">
                  <button className="btn" disabled={loading}>{loading ? 'Saving…' : 'Add'}</button>
                  <button type="button" className="btn btn-ghost" onClick={() => setForm({ name: '', price: '', category: '', brand: '', subcategory: '', tags: '', badges: '', discountPercentage: '', inventoryStock: '', inventorySku: '' })}>Clear</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <div className="overflow-auto bg-white rounded shadow">
        <table className="w-full text-left table-auto">
          <thead>
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr><td className="p-3" colSpan={5}>No products found.</td></tr>
            ) : products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3 align-top">{p.id}</td>
                <td className="p-3 align-top">{p.name}</td>
                <td className="p-3 align-top">{p.category}</td>
                <td className="p-3 align-top">{p.price}</td>
                <td className="p-3 align-top">
                  <button className="btn btn-ghost mr-2" onClick={() => openView(p)}>View</button>
                  <Link href={`/dashboard/products/${p.id}`} className="btn btn-ghost mr-2">Open</Link>
                  <button className="btn btn-ghost mr-2" onClick={() => openEdit(p)}>Edit</button>
                  <button className="btn btn-ghost mr-2" onClick={() => deleteProduct(p.id!)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for view / edit */}
      {mode && selected ? (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{mode === 'view' ? 'View Product' : 'Edit Product'}</h3>
              <button className="btn btn-ghost" onClick={closeModal}>Close</button>
            </div>

            {mode === 'view' ? (
              <div className="modal-body space-y-2">
                <div><strong>ID:</strong> {selected.id}</div>
                <div><strong>Name:</strong> {selected.name}</div>
                <div><strong>Brand:</strong> {selected.brand}</div>
                <div><strong>Category:</strong> {selected.category}</div>
                <div><strong>Subcategory:</strong> {selected.subcategory}</div>
                <div><strong>Price:</strong> {selected.price}</div>
                <div><strong>Tags:</strong> {(selected.tags || []).join(', ')}</div>
                <div><strong>Badges:</strong> {(selected.badges || []).join(', ')}</div>
                <div><strong>Inventory:</strong> {selected.inventory ? `${selected.inventory.stock ?? '-'} pcs (SKU: ${selected.inventory.sku ?? '-'})` : '-'}</div>
                <div><strong>Description:</strong> {selected.description}</div>
                <div className="mt-3"><Link href={`/dashboard/products/${selected.id}`} className="btn btn-ghost">Open detail page</Link></div>
              </div>
            ) : (
              <form className="modal-body space-y-3" onSubmit={submitEdit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input className="input" value={(editForm.name as string) || ''} onChange={(e) => setField('name', e.target.value as any)} placeholder="Name" />
                  <input className="input" value={(editForm.price as string) || ''} onChange={(e) => setField('price', e.target.value as any)} placeholder="Price" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input className="input" value={(editForm.category as string) || ''} onChange={(e) => setField('category', e.target.value as any)} placeholder="Category" />
                  <input className="input" value={(editForm.brand as string) || ''} onChange={(e) => setField('brand', e.target.value as any)} placeholder="Brand" />
                </div>
                <input className="input" value={(editForm.subcategory as string) || ''} onChange={(e) => setField('subcategory', e.target.value as any)} placeholder="Subcategory" />
                <input className="input" value={Array.isArray(editForm.tags) ? (editForm.tags as string[]).join(', ') : (editForm.tags as string) || ''} onChange={(e) => setField('tags', e.target.value as any)} placeholder="Tags (comma separated)" />
                <input className="input" value={Array.isArray(editForm.badges) ? (editForm.badges as string[]).join(', ') : (editForm.badges as string) || ''} onChange={(e) => setField('badges', e.target.value as any)} placeholder="Badges (comma separated)" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input className="input" value={(editForm.inventory?.stock as any) ?? ''} onChange={(e) => setField('inventory', { ...(editForm.inventory || {}), stock: Number(e.target.value) } as any)} placeholder="Inventory stock" />
                  <input className="input" value={(editForm.inventory?.sku as string) || ''} onChange={(e) => setField('inventory', { ...(editForm.inventory || {}), sku: e.target.value } as any)} placeholder="Inventory SKU" />
                </div>
                <input className="input" value={(editForm.image as string) || ''} onChange={(e) => setField('image', e.target.value as any)} placeholder="Image URL" />
                <textarea className="input" value={(editForm.description as string) || ''} onChange={(e) => setField('description', e.target.value as any)} placeholder="Description" />

                <div className="flex gap-2">
                  <button className="btn" type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
                  <button className="btn btn-ghost" type="button" onClick={closeModal}>Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
