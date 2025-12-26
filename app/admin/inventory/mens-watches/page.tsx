"use client"
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Edit, Trash2, Search, AlertCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'

interface Product {
  id: number
  name: string
  price: string
  priceNum: number
  category: string
  brand?: string
  size?: string
  image: string
  description?: string
  features?: string[]
  material?: string
  waterResistance?: string
  warranty?: string
  stock: number
  sku?: string
  createdAt: string
}

export default function MensWatchesPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [brands, setBrands] = useState<any[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterBrand, setFilterBrand] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    priceNum: 0,
    brand: '',
    size: '',
    image: '',
    description: '',
    features: '',
    material: '',
    waterResistance: '',
    warranty: '',
    stock: 0,
    sku: ''
  })
  const { toast } = useToast()

  useEffect(() => {
    loadProducts()
    loadBrands()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [products, searchTerm, filterBrand])

  const loadProducts = () => {
    setIsLoading(true)
    try {
      const stored = localStorage.getItem('admin_products')
      if (stored) {
        const allProducts = JSON.parse(stored)
        const mensProducts = allProducts.filter((p: Product) => 
          p.category.toLowerCase().includes('men') && !p.category.toLowerCase().includes('women')
        )
        setProducts(mensProducts)
      }
    } catch (error) {
      console.error('Error loading products:', error)
      toast({ title: 'Error loading products', variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  const loadBrands = () => {
    const stored = localStorage.getItem('admin_brands')
    setBrands(stored ? JSON.parse(stored) : [])
  }

  const filterProducts = () => {
    let filtered = products

    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterBrand) {
      filtered = filtered.filter(p => p.brand === filterBrand)
    }

    setFilteredProducts(filtered)
  }

  const syncToFrontend = (updatedProducts: Product[]) => {
    // Update products in lib/products.ts through localStorage
    const allProducts = JSON.parse(localStorage.getItem('admin_products') || '[]')
    localStorage.setItem('admin_products', JSON.stringify(allProducts))
    
    // Dispatch event to notify frontend
    window.dispatchEvent(new CustomEvent('productsUpdated', { detail: allProducts }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const productData = {
      ...formData,
      category: 'Mens Watches',
      price: `KSh${formData.priceNum.toLocaleString()}`,
      features: formData.features ? formData.features.split('\n').filter(f => f.trim()) : [],
    }

    const allProducts = JSON.parse(localStorage.getItem('admin_products') || '[]')

    if (editingProduct) {
      const updated = allProducts.map((p: Product) => 
        p.id === editingProduct.id 
          ? { ...p, ...productData }
          : p
      )
      localStorage.setItem('admin_products', JSON.stringify(updated))
      syncToFrontend(updated)
      toast({ title: 'Product updated successfully' })
    } else {
      const newProduct: Product = {
        id: Date.now(),
        ...productData,
        createdAt: new Date().toISOString()
      }
      const updated = [...allProducts, newProduct]
      localStorage.setItem('admin_products', JSON.stringify(updated))
      syncToFrontend(updated)
      toast({ title: 'Product created successfully' })
    }
    
    loadProducts()
    resetForm()
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      priceNum: product.priceNum,
      brand: product.brand || '',
      size: product.size || '',
      image: product.image,
      description: product.description || '',
      features: product.features?.join('\n') || '',
      material: product.material || '',
      waterResistance: product.waterResistance || '',
      warranty: product.warranty || '',
      stock: product.stock || 0,
      sku: product.sku || ''
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const allProducts = JSON.parse(localStorage.getItem('admin_products') || '[]')
      const updated = allProducts.filter((p: Product) => p.id !== id)
      localStorage.setItem('admin_products', JSON.stringify(updated))
      syncToFrontend(updated)
      loadProducts()
      toast({ title: 'Product deleted successfully' })
    }
  }

  const toggleOutOfStock = (product: Product) => {
    const allProducts = JSON.parse(localStorage.getItem('admin_products') || '[]')
    const updated = allProducts.map((p: Product) => 
      p.id === product.id 
        ? { ...p, stock: p.stock === 0 ? 1 : 0 }
        : p
    )
    localStorage.setItem('admin_products', JSON.stringify(updated))
    syncToFrontend(updated)
    loadProducts()
    toast({ title: product.stock === 0 ? 'Product marked in stock' : 'Product marked out of stock' })
  }

  const resetForm = () => {
    setFormData({
      name: '',
      priceNum: 0,
      brand: '',
      size: '',
      image: '',
      description: '',
      features: '',
      material: '',
      waterResistance: '',
      warranty: '',
      stock: 0,
      sku: ''
    })
    setEditingProduct(null)
    setIsDialogOpen(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Men's Watches</h1>
          <p className="text-muted-foreground">{filteredProducts.length} products</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Watch
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Edit Watch' : 'Add New Men\'s Watch'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="name">Watch Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="priceNum">Price (KSh) *</Label>
                  <Input
                    id="priceNum"
                    type="number"
                    value={formData.priceNum}
                    onChange={(e) => setFormData({ ...formData, priceNum: Number(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <select
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select brand</option>
                    {brands.map(brand => (
                      <option key={brand.id} value={brand.name}>{brand.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="stock">Stock Quantity *</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="size">Size</Label>
                  <Input
                    id="size"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    placeholder="e.g., 42mm"
                  />
                </div>
                <div>
                  <Label htmlFor="material">Material</Label>
                  <Input
                    id="material"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="image">Image URL *</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                    required
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="features">Features (one per line)</Label>
                  <Textarea
                    id="features"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="waterResistance">Water Resistance</Label>
                  <Input
                    id="waterResistance"
                    value={formData.waterResistance}
                    onChange={(e) => setFormData({ ...formData, waterResistance: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="warranty">Warranty</Label>
                  <Input
                    id="warranty"
                    value={formData.warranty}
                    onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end pt-4 border-t">
                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                <Button type="submit">{editingProduct ? 'Update' : 'Create'}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search men's watches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div>
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">All Brands</option>
              {brands.map(brand => (
                <option key={brand.id} value={brand.name}>{brand.name}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Products List */}
      {isLoading ? (
        <Card className="p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="text-muted-foreground">Loading men's watches...</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredProducts.map(product => (
            <Card key={product.id} className="overflow-hidden">
              <div className="flex gap-4 p-4">
                <div className="relative w-24 h-24 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">OUT OF STOCK</span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.brand}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-bold text-lg">{product.price}</p>
                    {product.stock === 0 ? (
                      <Badge variant="destructive" className="mt-1">Out of Stock</Badge>
                    ) : product.stock < 5 ? (
                      <Badge variant="secondary" className="mt-1 bg-orange-100 text-orange-800">Low Stock</Badge>
                    ) : (
                      <Badge variant="secondary" className="mt-1 bg-green-100 text-green-800">In Stock</Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-4 text-sm text-muted-foreground mb-3">
                  <span>SKU: {product.sku || 'N/A'}</span>
                  <span>Stock: {product.stock}</span>
                  {product.size && <span>Size: {product.size}</span>}
                  {product.material && <span>Material: {product.material}</span>}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => toggleOutOfStock(product)}
                    className={product.stock === 0 ? 'border-green-600 text-green-600' : 'border-red-600 text-red-600'}
                  >
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {product.stock === 0 ? 'Mark In Stock' : 'Mark Out of Stock'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
        {filteredProducts.length === 0 && (
          <Card className="p-12 text-center">
            <h3 className="text-lg font-semibold mb-2">No men's watches found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or add new products</p>
          </Card>
        )}
      </div>
      )}
    </div>
  )
}
