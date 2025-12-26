"use client"
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Edit, Trash2, Folder } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Category {
  id: string
  name: string
  slug: string
  parentId?: string
  description?: string
  createdAt: string
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    parentId: '',
    description: ''
  })
  const { toast } = useToast()

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = () => {
    const stored = localStorage.getItem('admin_categories')
    if (stored) {
      setCategories(JSON.parse(stored))
    } else {
      // Initialize with default categories
      const defaultCategories: Category[] = [
        { id: '1', name: 'Men', slug: 'men', createdAt: new Date().toISOString() },
        { id: '2', name: 'Women', slug: 'women', createdAt: new Date().toISOString() },
        { id: '3', name: 'Accessories', slug: 'accessories', createdAt: new Date().toISOString() },
        { id: '4', name: 'Leather', slug: 'leather', parentId: '1', createdAt: new Date().toISOString() },
        { id: '5', name: 'Canvas', slug: 'canvas', parentId: '1', createdAt: new Date().toISOString() },
        { id: '6', name: 'Metallic', slug: 'metallic', parentId: '1', createdAt: new Date().toISOString() },
        { id: '7', name: 'Ceramic', slug: 'ceramic', parentId: '2', createdAt: new Date().toISOString() },
        { id: '8', name: 'Leather', slug: 'leather-women', parentId: '2', createdAt: new Date().toISOString() },
      ]
      localStorage.setItem('admin_categories', JSON.stringify(defaultCategories))
      setCategories(defaultCategories)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingCategory) {
      // Update existing category
      const updated = categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, ...formData }
          : cat
      )
      setCategories(updated)
      localStorage.setItem('admin_categories', JSON.stringify(updated))
      toast({ title: 'Category updated successfully' })
    } else {
      // Create new category
      const newCategory: Category = {
        id: Date.now().toString(),
        ...formData,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
        createdAt: new Date().toISOString()
      }
      const updated = [...categories, newCategory]
      setCategories(updated)
      localStorage.setItem('admin_categories', JSON.stringify(updated))
      toast({ title: 'Category created successfully' })
    }
    
    resetForm()
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      slug: category.slug,
      parentId: category.parentId || '',
      description: category.description || ''
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      const updated = categories.filter(cat => cat.id !== id)
      setCategories(updated)
      localStorage.setItem('admin_categories', JSON.stringify(updated))
      toast({ title: 'Category deleted successfully' })
    }
  }

  const resetForm = () => {
    setFormData({ name: '', slug: '', parentId: '', description: '' })
    setEditingCategory(null)
    setIsDialogOpen(false)
  }

  const getParentCategories = () => categories.filter(cat => !cat.parentId)
  const getSubcategories = (parentId: string) => categories.filter(cat => cat.parentId === parentId)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Categories</h1>
          <p className="text-muted-foreground">Organize your products into categories and subcategories</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCategory ? 'Edit Category' : 'Create New Category'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Category Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Leather Watches"
                  required
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="leather-watches"
                />
              </div>
              <div>
                <Label htmlFor="parent">Parent Category</Label>
                <select
                  id="parent"
                  value={formData.parentId}
                  onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">None (Top Level)</option>
                  {getParentCategories().map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
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
                <Button type="submit">{editingCategory ? 'Update' : 'Create'}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {getParentCategories().map(parent => (
          <Card key={parent.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Folder className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="text-xl font-semibold">{parent.name}</h3>
                  <p className="text-sm text-muted-foreground">{parent.description || `/${parent.slug}`}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(parent)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(parent.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {getSubcategories(parent.id).length > 0 && (
              <div className="ml-8 space-y-2">
                {getSubcategories(parent.id).map(sub => (
                  <div key={sub.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                    <div>
                      <p className="font-medium">{sub.name}</p>
                      <p className="text-sm text-muted-foreground">/{parent.slug}/{sub.slug}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(sub)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(sub.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
