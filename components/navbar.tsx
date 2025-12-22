"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu, Search, User, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

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

  const jewelryCategories = [
    { name: "Bracelets", href: "/accessories/jewelry/bracelets" },
    { name: "Earrings", href: "/accessories/jewelry/earrings" },
    { name: "Necklaces", href: "/accessories/jewelry/necklaces" },
  ]

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
    <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <Link href="/">
              <h1 className="text-2xl font-bold text-primary">Chesiro Collection</h1>
            </Link>
            <nav className="hidden lg:flex items-center gap-6">
              <Link href="/" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/shop" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
                Shop
              </Link>

              {/* Men Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown("men")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  Men <ChevronDown className="h-4 w-4" />
                </button>
                {openDropdown === "men" && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-sm py-1">
                    {menCategories.map((category) => (
                      <Link
                        key={category.href}
                        href={category.href}
                        className="block px-4 py-2 text-sm font-semibold hover:bg-muted hover:text-foreground transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Women Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown("women")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  Women <ChevronDown className="h-4 w-4" />
                </button>
                {openDropdown === "women" && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-sm py-1">
                    {womenCategories.map((category) => (
                      <Link
                        key={category.href}
                        href={category.href}
                        className="block px-4 py-2 text-sm font-semibold hover:bg-muted hover:text-foreground transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Accessories Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown("accessories")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  Accessories <ChevronDown className="h-4 w-4" />
                </button>
                {openDropdown === "accessories" && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-sm py-1">
                    <div className="px-4 py-2 text-sm font-bold text-primary">Jewelry</div>
                    {jewelryCategories.map((category) => (
                      <Link
                        key={category.href}
                        href={category.href}
                        className="block px-6 py-2 text-sm font-semibold hover:bg-muted hover:text-foreground transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                    <div className="border-t border-border my-2" />
                    <Link
                      href="/accessories/wallets"
                      className="block px-4 py-2 text-sm font-semibold hover:bg-muted hover:text-foreground transition-colors"
                    >
                      Wallets
                    </Link>
                  </div>
                )}
              </div>

              {/* Collection Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown("collection")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  Collection <ChevronDown className="h-4 w-4" />
                </button>
                {openDropdown === "collection" && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-sm py-1 max-h-96 overflow-y-auto">
                    {brands.map((brand) => (
                      <Link
                        key={brand}
                        href={`/collection/${brand.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "")}`}
                        className="block px-4 py-2 text-sm font-semibold hover:bg-muted hover:text-foreground transition-colors"
                      >
                        {brand}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/contact" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
