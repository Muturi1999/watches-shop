"use client"
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Edit, Trash2, Tag } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'

interface Brand {
  id: string
  name: string
  slug: string
  logo?: string
  description?: string
  country?: string
  createdAt: string
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    logo: '',
    description: '',
    country: ''
  })
  const { toast } = useToast()

  useEffect(() => {
    loadBrands()
  }, [])

  const loadBrands = () => {
    const stored = localStorage.getItem('admin_brands')
    if (stored) {
      setBrands(JSON.parse(stored))
    } else {
      // Initialize with default brands
      const defaultBrands: Brand[] = [
        { id: '1', name: 'Rolex', slug: 'rolex', country: 'Switzerland', createdAt: new Date().toISOString() },
        { id: '2', name: 'Omega', slug: 'omega', country: 'Switzerland', createdAt: new Date().toISOString() },
        { id: '3', name: 'Casio', slug: 'casio', country: 'Japan', createdAt: new Date().toISOString() },
        { id: '4', name: 'Seiko', slug: 'seiko', country: 'Japan', createdAt: new Date().toISOString() },
        { id: '5', name: 'TAG Heuer', slug: 'tag-heuer', country: 'Switzerland', createdAt: new Date().toISOString() },
      ]
      localStorage.setItem('admin_brands', JSON.stringify(defaultBrands))
      setBrands(defaultBrands)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingBrand) {
      const updated = brands.map(brand => 
        brand.id === editingBrand.id 
          ? { ...brand, ...formData }
          : brand
      )
      setBrands(updated)
      localStorage.setItem('admin_brands', JSON.stringify(updated))
      toast({ title: 'Brand updated successfully' })
    } else {
      const newBrand: Brand = {
        id: Date.now().toString(),
        ...formData,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
        createdAt: new Date().toISOString()
      }
      const updated = [...brands, newBrand]
      setBrands(updated)
      localStorage.setItem('admin_brands', JSON.stringify(updated))
      toast({ title: 'Brand created successfully' })
    }
    
    resetForm()
  }

  const handleEdit = (brand: Brand) => {
    setEditingBrand(brand)
    setFormData({
      name: brand.name,
      slug: brand.slug,
      logo: brand.logo || '',
      description: brand.description || '',
      country: brand.country || ''
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this brand?')) {
      const updated = brands.filter(brand => brand.id !== id)
      setBrands(updated)
      localStorage.setItem('admin_brands', JSON.stringify(updated))
      toast({ title: 'Brand deleted successfully' })
    }
  }

  const resetForm = () => {
    setFormData({ name: '', slug: '', logo: '', description: '', country: '' })
    setEditingBrand(null)
    setIsDialogOpen(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Brands</h1>
          <p className="text-muted-foreground">Manage watch and accessory brands</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Brand
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingBrand ? 'Edit Brand' : 'Create New Brand'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Brand Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Rolex"
                  required
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="rolex"
                />
              </div>
              <div>
                <Label htmlFor="logo">Logo URL</Label>
                <Input
                  id="logo"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="Switzerland"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Optional description"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                <Button type="submit">{editingBrand ? 'Update' : 'Create'}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {brands.map(brand => (
          <Card key={brand.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {brand.logo ? (
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted">
                    <Image src={brand.logo} alt={brand.name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Tag className="h-6 w-6 text-primary" />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-lg">{brand.name}</h3>
                  {brand.country && <p className="text-sm text-muted-foreground">{brand.country}</p>}
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(brand)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(brand.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {brand.description && (
              <p className="text-sm text-muted-foreground">{brand.description}</p>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
