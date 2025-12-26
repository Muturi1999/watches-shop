"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu, Search, User, ChevronDown, Watch, Heart } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { PromoBanner } from "./promo-banner"
import Image from "next/image"

export function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    // Load initial counts
    updateCounts()

    // Listen for updates
    const handleWishlistUpdate = () => updateCounts()
    const handleCartUpdate = () => updateCounts()
    
    window.addEventListener("wishlistUpdated", handleWishlistUpdate)
    window.addEventListener("cartUpdated", handleCartUpdate)

    return () => {
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate)
      window.removeEventListener("cartUpdated", handleCartUpdate)
    }
  }, [])

  const updateCounts = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    setWishlistCount(wishlist.length)
    setCartCount(cart.reduce((total: number, item: any) => total + item.quantity, 0))
  }

  const menCategories = [
    { name: "Canvas", href: "/men/canvas" },
    { name: "Leather", href: "/men/leather" },
    { name: "Metallic", href: "/men/metallic" },
  ]

  const womenCategories = [
    { name: "Leather", href: "/women/leather" },
    { name: "Metallic", href: "/women/metallic" },
    { name: "Canvas", href: "/women/canvas" },
    { name: "Ceramic", href: "/women/ceramic" },
  ]

  const accessoriesMenu = {
    jewelry: [
      { name: "Bracelets", href: "/accessories/jewelry/bracelets" },
      { name: "Necklaces", href: "/accessories/jewelry/necklaces" },
      { name: "Earrings", href: "/accessories/jewelry/earrings" },
      { name: "Bangles & Anklets", href: "/accessories/jewelry/bangles" },
    ],
    straps: [
      { name: "Leather Straps", href: "/accessories/straps/leather" },
      { name: "Metal Bracelets", href: "/accessories/straps/metal" },
      { name: "Canvas Straps", href: "/accessories/straps/canvas" },
    ],
  }

  const brands = [
    "Rolex",
    "Omega",
    "TAG Heuer",
    "Cartier",
    "Patek Philippe",
    "Audemars Piguet",
    "Breitling",
    "IWC",
    "Panerai",
    "Jaeger-LeCoultre",
    "Vacheron Constantin",
    "A. Lange & Söhne",
    "Hublot",
    "Zenith",
    "Tudor",
  ]

  return (
    <>
      <PromoBanner />
      <header className="border-b border-border sticky top-0 bg-background z-50 shadow-sm">
        <div className="container mx-auto px-4">
          {/* Top bar with logo, search, and icons */}
          <div className="flex items-center justify-between gap-6 py-4 border-b border-border">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <Watch className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground tracking-tight">City Watches</h1>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for watches, brands, or accessories..."
                  className="w-full pl-10 pr-4 py-2.5 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {/* Wishlist */}
              <Link href="/wishlist" className="relative hover:text-primary transition-colors">
                <Heart className="h-6 w-6" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link href="/cart" className="relative hover:text-primary transition-colors">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  onBlur={() => setTimeout(() => setShowUserDropdown(false), 200)}
                  className="hover:text-primary transition-colors"
                >
                  <User className="h-6 w-6" />
                </button>
                {showUserDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-background border border-border shadow-lg py-2 z-50">
                    <Link
                      href="/auth/login"
                      className="block px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
                    >
                      Sign Up
                    </Link>
                    <div className="border-t border-border my-2" />
                    <Link
                      href="/admin"
                      className="block px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
                    >
                      My Account
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main navigation */}
          <nav className="hidden lg:flex items-center justify-between py-4">
            <div className="flex items-center justify-center gap-8 flex-1">
              <Link
                href="/"
                className="text-sm font-bold uppercase tracking-wide text-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="text-sm font-bold uppercase tracking-wide text-foreground hover:text-primary transition-colors"
              >
                Shop
              </Link>

            {/* Men Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setOpenDropdown("men")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="text-sm font-bold uppercase tracking-wide text-foreground hover:text-primary transition-colors flex items-center gap-1">
                MEN <ChevronDown className="h-3 w-3" />
              </button>
              {openDropdown === "men" && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-background border border-border shadow-lg py-2 z-50">
                  {menCategories.map((category) => (
                    <Link
                      key={category.href}
                      href={category.href}
                      className="block px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Women Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setOpenDropdown("women")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="text-sm font-bold uppercase tracking-wide text-foreground hover:text-primary transition-colors flex items-center gap-1">
                WOMEN <ChevronDown className="h-3 w-3" />
              </button>
              {openDropdown === "women" && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-background border border-border shadow-lg py-2 z-50">
                  {womenCategories.map((category) => (
                    <Link
                      key={category.href}
                      href={category.href}
                      className="block px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Accessories Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setOpenDropdown("accessories")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="text-sm font-bold uppercase tracking-wide text-foreground hover:text-primary transition-colors flex items-center gap-1">
                ACCESSORIES <ChevronDown className="h-3 w-3" />
              </button>
              {openDropdown === "accessories" && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-background border border-border shadow-lg py-2 z-50">
                  {/* Jewelry Section */}
                  <div className="px-4 py-2 text-xs font-bold text-primary uppercase tracking-wider">Jewelry</div>
                  {accessoriesMenu.jewelry.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-6 py-2 text-sm font-medium hover:bg-muted transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {/* Watch Straps Section */}
                  <div className="border-t border-border my-2" />
                  <div className="px-4 py-2 text-xs font-bold text-primary uppercase tracking-wider">Watch Straps</div>
                  {accessoriesMenu.straps.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-6 py-2 text-sm font-medium hover:bg-muted transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {/* Wallets Section */}
                  <div className="border-t border-border my-2" />
                  <Link
                    href="/accessories/wallets"
                    className="block px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
                  >
                    Wallets
                  </Link>
                </div>
              )}
            </div>

            {/* Collection Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setOpenDropdown("collection")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="text-sm font-bold uppercase tracking-wide text-foreground hover:text-primary transition-colors flex items-center gap-1">
                COLLECTIONS <ChevronDown className="h-3 w-3" />
              </button>
              {openDropdown === "collection" && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-background border border-border shadow-lg py-2 max-h-96 overflow-y-auto z-50">
                  {brands.map((brand) => (
                    <Link
                      key={brand}
                      href={`/collection/${brand.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "")}`}
                      className="block px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
                    >
                      {brand}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className="text-sm font-bold uppercase tracking-wide text-foreground hover:text-primary transition-colors"
            >
              Contact Us
            </Link>
            </div>
            
            {/* WhatsApp Link - Far Right */}
            <a
              href="https://wa.me/254728160293"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold uppercase tracking-wide text-foreground hover:text-green-600 transition-colors flex items-center gap-2"
            >
              <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>+254728160293</span>
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border">
              <div className="flex flex-col space-y-3">
                <Link
                  href="/"
                  className="text-sm font-bold uppercase tracking-wide text-foreground hover:text-primary transition-colors px-4 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/shop"
                  className="text-sm font-bold uppercase tracking-wide text-foreground hover:text-primary transition-colors px-4 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop
                </Link>
                <Link
                  href="/men/canvas"
                  className="text-sm font-bold uppercase tracking-wide text-foreground hover:text-primary transition-colors px-4 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  MEN
                </Link>
                <Link
                  href="/women/leather"
                  className="text-sm font-bold uppercase tracking-wide text-foreground hover:text-primary transition-colors px-4 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  WOMEN
                </Link>
                <Link
                  href="/accessories/jewelry/bracelets"
                  className="text-sm font-bold uppercase tracking-wide text-foreground hover:text-primary transition-colors px-4 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ACCESSORIES
                </Link>
                <Link
                  href="/collection/rolex"
                  className="text-sm font-bold uppercase tracking-wide text-foreground hover:text-primary transition-colors px-4 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  COLLECTIONS
                </Link>
                <Link
                  href="/contact"
                  className="text-sm font-bold uppercase tracking-wide text-foreground hover:text-primary transition-colors px-4 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
