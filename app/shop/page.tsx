"use client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { WishlistButton } from "@/components/wishlist-button"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { BuyNowButton } from "@/components/buy-now-button"
import { Search, X } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { products, type Product } from "@/lib/products"

export default function ShopPage() {
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 15000])
  const [limitedOnly, setLimitedOnly] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const categories = Array.from(new Set(products.map(p => p.category)))
  const brands = Array.from(new Set(products.map(p => p.brand).filter(Boolean))) as string[]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    const matchesBrand = selectedBrands.length === 0 || (product.brand && selectedBrands.includes(product.brand))
    const matchesPrice = product.priceNum >= priceRange[0] && product.priceNum <= priceRange[1]
    const matchesLimited = !limitedOnly || product.limited
    return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesLimited
  })

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    )
  }

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    )
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setSelectedBrands([])
    setPriceRange([0, 15000])
    setLimitedOnly(false)
  }

  const activeFiltersCount = selectedCategories.length + selectedBrands.length + (limitedOnly ? 1 : 0)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
            SHOP ALL
          </h1>
          <p className="text-xl text-white/90 font-light">
            Explore Our Complete Collection
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Shop</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Filters Sidebar */}
          <div className="space-y-6">
            {/* Search */}
            <div>
              <h3 className="text-sm font-bold mb-3 uppercase tracking-wide">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-sm font-bold mb-3 uppercase tracking-wide">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category} className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div>
              <h3 className="text-sm font-bold mb-3 uppercase tracking-wide">Brands</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {brands.map(brand => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() => toggleBrand(brand)}
                    />
                    <span className="text-sm">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Limited Edition */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={limitedOnly}
                  onCheckedChange={() => setLimitedOnly(!limitedOnly)}
                />
                <span className="text-sm font-semibold">Limited Edition Only</span>
              </label>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-sm font-bold mb-3 uppercase tracking-wide">Price Range</h3>
              <Slider
                min={0}
                max={15000}
                step={100}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>KSh{priceRange[0].toLocaleString()}</span>
                <span>KSh{priceRange[1].toLocaleString()}</span>
              </div>
            </div>

            {/* Clear Filters */}
            {activeFiltersCount > 0 && (
              <Button onClick={clearFilters} variant="outline" className="w-full">
                Clear All Filters ({activeFiltersCount})
              </Button>
            )}
          </div>

          {/* Products Grid */}
          <div>
            {/* Active Filters */}
            {(selectedCategories.length > 0 || selectedBrands.length > 0 || limitedOnly) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategories.map(cat => (
                  <Badge key={cat} variant="secondary" className="gap-1">
                    {cat}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleCategory(cat)} />
                  </Badge>
                ))}
                {selectedBrands.map(brand => (
                  <Badge key={brand} variant="secondary" className="gap-1">
                    {brand}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleBrand(brand)} />
                  </Badge>
                ))}
                {limitedOnly && (
                  <Badge variant="secondary" className="gap-1">
                    Limited Edition
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setLimitedOnly(false)} />
                  </Badge>
                )}
              </div>
            )}

            {/* Results Count */}
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} products
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground mb-4">No products found</p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="relative">
                    <Link href={`/product/${product.id}?from=shop`}>
                      <Card className="group overflow-hidden cursor-pointer transition-all hover:shadow-xl border-2">
                        <div className="relative">
                          {product.limited && (
                            <Badge className="absolute top-2 left-2 z-10 bg-primary hover:bg-primary/90">
                              Limited Edition
                            </Badge>
                          )}
                          <div className="absolute top-2 right-2 z-10">
                            <WishlistButton
                              productId={product.id}
                              productName={product.name}
                              productPrice={product.priceNum}
                              productImage={product.image}
                              className="bg-background/80 backdrop-blur-sm p-2 rounded-full"
                              iconSize={18}
                            />
                          </div>
                          <div className="relative aspect-square overflow-hidden bg-slate-50">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          </div>
                        </div>
                        <div className="p-4 bg-background space-y-2">
                          <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                            {product.brand} • {product.category}
                          </div>
                          <h3 className="text-base font-bold text-foreground uppercase tracking-wide">
                            {product.name}
                          </h3>
                          <div className="flex items-center justify-between">
                            <p className="text-lg font-semibold text-primary">
                              {product.price}
                            </p>
                            <span className="text-xs text-muted-foreground">{product.size}</span>
                          </div>
                          <AddToCartButton
                            productId={product.id}
                            productName={product.name}
                            price={product.priceNum}
                            productImage={product.image}
                            fullWidth
                            size="sm"
                          />
                          <BuyNowButton
                            productId={product.id}
                            productName={product.name}
                            price={product.priceNum}
                            image={product.image}
                            fullWidth
                            size="sm"
                          />
                        </div>
                      </Card>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
