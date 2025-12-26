"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Package, Tag, Grid3x3, Image, Settings, TrendingUp } from 'lucide-react'

export default function AdminPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalBrands: 0,
    lowStock: 0
  })

  useEffect(() => {
    // Load stats from localStorage
    const products = JSON.parse(localStorage.getItem('admin_products') || '[]')
    const categories = JSON.parse(localStorage.getItem('admin_categories') || '[]')
    const brands = JSON.parse(localStorage.getItem('admin_brands') || '[]')
    
    setStats({
      totalProducts: products.length,
      totalCategories: categories.length,
      totalBrands: brands.length,
      lowStock: products.filter((p: any) => p.stock < 5).length
    })
  }, [])

  const dashboardCards = [
    {
      title: 'Products',
      description: 'Manage watches and accessories inventory',
      icon: Package,
      href: '/admin/products',
      stat: `${stats.totalProducts} items`,
      color: 'text-blue-600'
    },
    {
      title: 'Categories',
      description: 'Organize products into categories',
      icon: Grid3x3,
      href: '/admin/categories',
      stat: `${stats.totalCategories} categories`,
      color: 'text-green-600'
    },
    {
      title: 'Brands',
      description: 'Manage watch and accessory brands',
      icon: Tag,
      href: '/admin/brands',
      stat: `${stats.totalBrands} brands`,
      color: 'text-purple-600'
    },
    {
      title: 'Hero Section',
      description: 'Update homepage hero images and content',
      icon: Image,
      href: '/admin/hero',
      stat: 'Customize',
      color: 'text-orange-600'
    },
    {
      title: 'Low Stock Alert',
      description: 'Products running low on inventory',
      icon: TrendingUp,
      href: '/admin/products?filter=lowstock',
      stat: `${stats.lowStock} items`,
      color: 'text-red-600'
    },
    {
      title: 'Settings',
      description: 'Platform-wide settings and preferences',
      icon: Settings,
      href: '/admin/settings',
      stat: 'Configure',
      color: 'text-gray-600'
    }
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your watch shop inventory and content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardCards.map((card) => (
          <Link key={card.href} href={card.href}>
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
              <div className="flex items-start justify-between mb-4">
                <card.icon className={`h-8 w-8 ${card.color}`} />
                <span className="text-sm font-semibold text-muted-foreground">{card.stat}</span>
              </div>
              <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
              <p className="text-sm text-muted-foreground">{card.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
