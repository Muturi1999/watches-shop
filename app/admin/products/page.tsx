"use client"
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Edit, Trash2, Search, Filter, Package } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'
import { products as seedProducts } from '@/lib/products'

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
  categoryId?: string
  brandId?: string
  createdAt: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [brands, setBrands] = useState<any[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterBrand, setFilterBrand] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    priceNum: 0,
    category: '',
    brand: '',
    size: '',
    image: '',
    description: '',
    features: '',
    material: '',
    waterResistance: '',
    warranty: '',
    stock: 0,
    sku: '',
    categoryId: '',
    brandId: ''
  })
  const { toast } = useToast()

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    // Load categories and brands after products are loaded
    if (products.length > 0) {
      loadCategories()
      loadBrands()
    }
  }, [products])

  useEffect(() => {
    filterProducts()
  }, [products, searchTerm, filterCategory, filterBrand])

  const loadProducts = () => {
    const stored = localStorage.getItem('admin_products')
    if (stored) {
      setProducts(JSON.parse(stored))
    } else {
      // Initialize with seed data
      const initialProducts = seedProducts.map(p => ({
        ...p,
        stock: 10,
        sku: `SKU-${p.id}`,
        createdAt: new Date().toISOString()
      }))
      localStorage.setItem('admin_products', JSON.stringify(initialProducts))
      setProducts(initialProducts)
    }
  }

  const loadCategories = () => {
    const stored = localStorage.getItem('admin_categories')
    if (stored) {
      setCategories(JSON.parse(stored))
    } else {
      // Extract unique categories from products
      const productCategories = products.map(p => p.category).filter(Boolean)
      const uniqueCategories = [...new Set(productCategories)].map((cat, index) => ({
        id: index + 1,
        name: cat,
        slug: cat.toLowerCase().replace(/\s+/g, '-')
      }))
      setCategories(uniqueCategories)
    }
  }

  const loadBrands = () => {
    const stored = localStorage.getItem('admin_brands')
    if (stored) {
      setBrands(JSON.parse(stored))
    } else {
      // Extract unique brands from products
      const productBrands = products.map(p => p.brand).filter(Boolean) as string[]
      const uniqueBrands = [...new Set(productBrands)].map((brand, index) => ({
        id: index + 1,
        name: brand,
        slug: brand.toLowerCase().replace(/\s+/g, '-')
      }))
      setBrands(uniqueBrands)
    }
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

    if (filterCategory) {
      filtered = filtered.filter(p => p.category === filterCategory)
    }

    if (filterBrand) {
      filtered = filtered.filter(p => p.brand === filterBrand)
    }

    setFilteredProducts(filtered)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const productData = {
      ...formData,
      price: `KSh${formData.priceNum.toLocaleString()}`,
      features: formData.features ? formData.features.split('\n').filter(f => f.trim()) : [],
    }

    if (editingProduct) {
      const updated = products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...productData }
          : p
      )
      setProducts(updated)
      localStorage.setItem('admin_products', JSON.stringify(updated))
      toast({ title: 'Product updated successfully' })
    } else {
      const newProduct: Product = {
        id: Date.now(),
        ...productData,
        createdAt: new Date().toISOString()
      }
      const updated = [...products, newProduct]
      setProducts(updated)
      localStorage.setItem('admin_products', JSON.stringify(updated))
      toast({ title: 'Product created successfully' })
    }
    
    resetForm()
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      priceNum: product.priceNum,
      category: product.category,
      brand: product.brand || '',
      size: product.size || '',
      image: product.image,
      description: product.description || '',
      features: product.features?.join('\n') || '',
      material: product.material || '',
      waterResistance: product.waterResistance || '',
      warranty: product.warranty || '',
      stock: product.stock || 0,
      sku: product.sku || '',
      categoryId: product.categoryId || '',
      brandId: product.brandId || ''
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updated = products.filter(p => p.id !== id)
      setProducts(updated)
      localStorage.setItem('admin_products', JSON.stringify(updated))
      toast({ title: 'Product deleted successfully' })
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      priceNum: 0,
      category: '',
      brand: '',
      size: '',
      image: '',
      description: '',
      features: '',
      material: '',
      waterResistance: '',
      warranty: '',
      stock: 0,
      sku: '',
      categoryId: '',
      brandId: ''
    })
    setEditingProduct(null)
    setIsDialogOpen(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Products</h1>
          <p className="text-muted-foreground">{filteredProducts.length} products in inventory</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="name">Product Name *</Label>
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
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
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
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
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
                <div>
                  <Label htmlFor="waterResistance">Water Resistance</Label>
                  <Input
                    id="waterResistance"
                    value={formData.waterResistance}
                    onChange={(e) => setFormData({ ...formData, waterResistance: e.target.value })}
                  />
                </div>
                <div className="col-span-2">
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
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

      {/* Products Grid */}
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
                {product.stock < 5 && (
                  <div className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Low
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
                  </div>
                </div>
                <div className="flex gap-4 text-sm text-muted-foreground mb-3">
                  <span>SKU: {product.sku || 'N/A'}</span>
                  <span>Category: {product.category}</span>
                  <span>Stock: <span className={product.stock < 5 ? 'text-red-600 font-semibold' : ''}>{product.stock}</span></span>
                  {product.size && <span>Size: {product.size}</span>}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
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
      </div>

      {filteredProducts.length === 0 && (
        <Card className="p-12 text-center">
          <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or add a new product</p>
        </Card>
      )}
    </div>
  )
}
