'use client'
import React, { useState } from 'react'
import './dashboard.css'
import Link from 'next/link'
import { LayoutDashboard, Package, ShoppingCart, Users, MessageSquare, Settings, HelpCircle, LogOut, Bell, Search, Menu, User, X } from 'lucide-react'
import Image from 'next/image'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="dashboard-root min-h-screen bg-slate-50 text-slate-900">
      {/* Mobile Overlay */}
      <div 
        className={`sidebar-overlay ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Top Navbar */}
      <nav className="fixed top-0 right-0 lg:left-64 left-0 bg-white border-b border-slate-200 z-10">
        <div className="flex items-center justify-between px-4 lg:px-6 py-3">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 w-48 lg:w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <Link href="/admin/messages" className="relative p-2 hover:bg-slate-100 rounded-lg">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Link>

            <Link href="/admin/account" className="flex items-center gap-2 lg:gap-3 pl-2 lg:pl-4 border-l">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold">Admin User</p>
                <p className="text-xs text-slate-500">admin@watchshop.com</p>
              </div>
              <div className="relative h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-semibold">
                <User className="h-4 w-4 lg:h-5 lg:w-5" />
              </div>
            </Link>
          </div>
        </div>
      </nav>

      <aside className={`dashboard-sidebar flex flex-col ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="p-6 font-bold text-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-slate-900 rounded-lg flex items-center justify-center text-white text-sm">W</div>
            <span>Admin</span>
          </div>
          <button 
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-4 flex-1">
          <Link href="/admin" className="flex items-center gap-2 py-2 px-3 rounded hover:bg-slate-100" onClick={() => setMobileMenuOpen(false)}>
            <LayoutDashboard className="h-4 w-4" />
            <span>Overview</span>
          </Link>
          <Link href="/admin/products" className="flex items-center gap-2 py-2 px-3 rounded hover:bg-slate-100" onClick={() => setMobileMenuOpen(false)}>
            <Package className="h-4 w-4" />
            <span>Products</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-2 py-2 px-3 rounded hover:bg-slate-100" onClick={() => setMobileMenuOpen(false)}>
            <ShoppingCart className="h-4 w-4" />
            <span>Orders</span>
          </Link>
          <Link href="/admin/users" className="flex items-center gap-2 py-2 px-3 rounded hover:bg-slate-100" onClick={() => setMobileMenuOpen(false)}>
            <Users className="h-4 w-4" />
            <span>Users</span>
          </Link>
          <Link href="/admin/messages" className="flex items-center gap-2 py-2 px-3 rounded hover:bg-slate-100" onClick={() => setMobileMenuOpen(false)}>
            <MessageSquare className="h-4 w-4" />
            <span>Messages</span>
          </Link>

          <div className="mt-4 pt-4 border-t">
            <div className="px-3 py-2 text-sm font-semibold text-slate-600">Inventory by Category</div>
            <nav className="mt-2 space-y-1">
              <Link href="/admin/inventory/mens-watches" className="block py-2 px-3 rounded hover:bg-slate-100 text-sm" onClick={() => setMobileMenuOpen(false)}>
                Men's Watch
              </Link>
              <Link href="/admin/inventory/womens-watches" className="block py-2 px-3 rounded hover:bg-slate-100 text-sm" onClick={() => setMobileMenuOpen(false)}>
                Women's Watch
              </Link>
              <Link href="/admin/inventory/smart-watches" className="block py-2 px-3 rounded hover:bg-slate-100 text-sm" onClick={() => setMobileMenuOpen(false)}>
                Smart Watch
              </Link>
              <Link href="/admin/inventory/bracelets" className="block py-2 px-3 rounded hover:bg-slate-100 text-sm" onClick={() => setMobileMenuOpen(false)}>
                Bracelet
              </Link>
              <Link href="/admin/inventory/straps" className="block py-2 px-3 rounded hover:bg-slate-100 text-sm" onClick={() => setMobileMenuOpen(false)}>
                Strap
              </Link>
              <Link href="/admin/inventory/bangles" className="block py-2 px-3 rounded hover:bg-slate-100 text-sm" onClick={() => setMobileMenuOpen(false)}>
                Bangle
              </Link>
              <Link href="/admin/inventory/accessories" className="block py-2 px-3 rounded hover:bg-slate-100 text-sm" onClick={() => setMobileMenuOpen(false)}>
                Accessories
              </Link>
            </nav>
          </div>
        </nav>

        <div className="p-8 border-t mt-auto">
          <Link href="/admin/settings" className="flex items-center gap-2 py-2 px-3 rounded hover:bg-slate-100" onClick={() => setMobileMenuOpen(false)}>
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
          <Link href="/admin/help" className="flex items-center gap-2 py-2 px-3 rounded hover:bg-slate-100" onClick={() => setMobileMenuOpen(false)}>
            <HelpCircle className="h-4 w-4" />
            <span>Help</span>
          </Link>
          <button className="flex items-center gap-2 py-2 px-3 rounded hover:bg-slate-100 w-full text-left text-red-600">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      <main className="dashboard-main pt-20 p-6">{children}</main>
    </div>
  )
}
