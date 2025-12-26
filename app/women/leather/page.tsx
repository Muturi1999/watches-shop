"use client"

import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { WishlistButton } from "@/components/wishlist-button"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { BuyNowButton } from "@/components/buy-now-button"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Search, SlidersHorizontal } from "lucide-react"
import { useState } from "react"

const products = [
  { id: 41, name: "Rose Gold Diamond Watch", price: 8200, category: "Watches", brand: "Rolex", size: "36mm", limited: false, image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=400&q=80" },
  { id: 42, name: "Pink Ceramic Smart Watch", price: 8800, category: "Smart Watches", brand: "Apple", size: "40mm", limited: true, image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&q=80" },
  { id: 43, name: "White Leather Strap Watch", price: 8500, category: "Watches", brand: "Omega", size: "34mm", limited: false, image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&q=80" },
  { id: 44, name: "Brown Leather Classic Watch", price: 8900, category: "Watches", brand: "TAG Heuer", size: "36mm", limited: false, image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=400&q=80" },
  { id: 45, name: "Beige Leather Elegant Watch", price: 8300, category: "Watches", brand: "Patek Philippe", size: "32mm", limited: true, image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=400&q=80" },
  { id: 46, name: "Black Steel Luxury Watch", price: 9000, category: "Watches", brand: "Rolex", size: "34mm", limited: false, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" },
  { id: 47, name: "Galaxy Smart Watch Rose", price: 4500, category: "Smart Watches", brand: "Samsung", size: "42mm", limited: false, image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&q=80" },
  { id: 48, name: "Huawei GT Elegant Watch", price: 3800, category: "Smart Watches", brand: "Huawei", size: "42mm", limited: false, image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&q=80" },
  { id: 49, name: "Gold Chain Bracelet", price: 5200, category: "Bracelets", brand: "Cartier", size: "Medium", limited: false, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80" },
  { id: 50, name: "Diamond Tennis Bracelet", price: 12000, category: "Bracelets", brand: "Tiffany & Co", size: "Small", limited: true, image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&q=80" },
  { id: 51, name: "Silver Bangle Set", price: 3800, category: "Bangles", brand: "Pandora", size: "Medium", limited: false, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80" },
  { id: 52, name: "Rose Gold Bangle", price: 4200, category: "Bangles", brand: "Cartier", size: "Medium", limited: false, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&q=80" },
  { id: 53, name: "Gold Anklet Chain", price: 2800, category: "Anklets", brand: "Tiffany & Co", size: "9 inch", limited: false, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80" },
  { id: 54, name: "Silver Anklet Charm", price: 2200, category: "Anklets", brand: "Pandora", size: "10 inch", limited: false, image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&q=80" },
  { id: 55, name: "Leather Watch Strap Set", price: 1500, category: "Straps", brand: "Universal", size: "20mm", limited: false, image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=400&q=80" },
  { id: 56, name: "Stainless Steel Strap", price: 1800, category: "Straps", brand: "Universal", size: "22mm", limited: false, image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&q=80" },
  { id: 57, name: "Pearl Diamond Earrings", price: 6500, category: "Earrings", brand: "Cartier", size: "Small", limited: true, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80" },
  { id: 58, name: "Gold Hoop Earrings", price: 3500, category: "Earrings", brand: "Tiffany & Co", size: "Medium", limited: false, image: "https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?w=400&q=80" },
  { id: 59, name: "Pearl Necklace Classic", price: 7200, category: "Necklaces", brand: "Tiffany & Co", size: "18 inch", limited: false, image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&q=80" },
  { id: 60, name: "Diamond Pendant Necklace", price: 9500, category: "Necklaces", brand: "Cartier", size: "16 inch", limited: true, image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&q=80" },
]

const brands = ["Rolex", "Cartier", "Omega", "TAG Heuer", "Patek Philippe", "Tiffany & Co", "Pandora", "Apple", "Samsung", "Huawei", "Universal"]
const categories = ["Watches", "Smart Watches", "Bracelets", "Bangles", "Anklets", "Earrings", "Necklaces", "Straps"]
const sizes = ["30mm", "32mm", "34mm", "36mm", "40mm", "42mm", "Small", "Medium", "16 inch", "18 inch", "9 inch", "10 inch", "20mm", "22mm"]

export default function WomenLeather() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [showLimitedOnly, setShowLimitedOnly] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 20000])
  const [showFilters, setShowFilters] = useState(true)

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(product.size)
    const matchesLimited = !showLimitedOnly || product.limited
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    
    return matchesSearch && matchesBrand && matchesCategory && matchesSize && matchesLimited && matchesPrice
  })

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    )
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    )
  }

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=1200&q=80')] bg-cover bg-center opacity-30" />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 uppercase tracking-tight">Women's Collection</h1>
          <p className="text-lg text-white/90">Elegant watches and accessories for the modern woman</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-semibold">Women</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search watches, jewelry, and accessories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden"
          >
            <SlidersHorizontal className="h-5 w-5 mr-2" />
            Filters
          </Button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 space-y-6 flex-shrink-0`}>
            {/* Categories */}
            <div className="border rounded-lg p-4 bg-card">
              <h3 className="font-bold text-foreground mb-4 uppercase tracking-wide">Categories</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category} className="flex items-center gap-2">
                    <Checkbox 
                      id={`cat-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <label htmlFor={`cat-${category}`} className="text-sm cursor-pointer flex-1">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="border rounded-lg p-4 bg-card">
              <h3 className="font-bold text-foreground mb-4 uppercase tracking-wide">Brands</h3>
              <div className="space-y-3">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center gap-2">
                    <Checkbox 
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() => toggleBrand(brand)}
                    />
                    <label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer flex-1">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="border rounded-lg p-4 bg-card">
              <h3 className="font-bold text-foreground mb-4 uppercase tracking-wide">Size</h3>
              <div className="space-y-3">
                {sizes.map((size) => (
                  <div key={size} className="flex items-center gap-2">
                    <Checkbox 
                      id={`size-${size}`}
                      checked={selectedSizes.includes(size)}
                      onCheckedChange={() => toggleSize(size)}
                    />
                    <label htmlFor={`size-${size}`} className="text-sm cursor-pointer flex-1">
                      {size}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Limited Edition */}
            <div className="border rounded-lg p-4 bg-card">
              <h3 className="font-bold text-foreground mb-4 uppercase tracking-wide">Edition</h3>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="limited"
                  checked={showLimitedOnly}
                  onCheckedChange={(checked) => setShowLimitedOnly(checked as boolean)}
                />
                <label htmlFor="limited" className="text-sm cursor-pointer flex-1">
                  Limited Edition Only
                </label>
              </div>
            </div>

            {/* Price Range */}
            <div className="border rounded-lg p-4 bg-card">
              <h3 className="font-bold text-foreground mb-4 uppercase tracking-wide">Price Range</h3>
              <div className="space-y-4">
                <Slider
                  min={0}
                  max={20000}
                  step={100}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>KSh{priceRange[0].toLocaleString()}</span>
                  <span>KSh{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Reset Filters */}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setSelectedBrands([])
                setSelectedCategories([])
                setSelectedSizes([])
                setShowLimitedOnly(false)
                setPriceRange([0, 20000])
                setSearchQuery("")
              }}
            >
              Reset All Filters
            </Button>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} of {products.length} products
              </p>
              {(selectedBrands.length > 0 || selectedCategories.length > 0 || selectedSizes.length > 0 || showLimitedOnly) && (
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedBrands.map(brand => (
                    <Badge key={brand} variant="secondary" className="cursor-pointer" onClick={() => toggleBrand(brand)}>
                      {brand} ✕
                    </Badge>
                  ))}
                  {selectedCategories.map(cat => (
                    <Badge key={cat} variant="secondary" className="cursor-pointer" onClick={() => toggleCategory(cat)}>
                      {cat} ✕
                    </Badge>
                  ))}
                  {selectedSizes.map(size => (
                    <Badge key={size} variant="secondary" className="cursor-pointer" onClick={() => toggleSize(size)}>
                      {size} ✕
                    </Badge>
                  ))}
                  {showLimitedOnly && (
                    <Badge variant="secondary" className="cursor-pointer" onClick={() => setShowLimitedOnly(false)}>
                      Limited Edition ✕
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">No products found matching your filters</p>
                <Button className="mt-4" onClick={() => {
                  setSelectedBrands([])
                  setSelectedCategories([])
                  setSelectedSizes([])
                  setShowLimitedOnly(false)
                  setPriceRange([0, 20000])
                  setSearchQuery("")
                }}>
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="relative">
                    <Link href={`/product/${product.id}?from=women`}>
                      <Card className="group overflow-hidden cursor-pointer transition-all hover:shadow-xl border-2">
                        <div className="relative">
                          {product.limited && (
                            <Badge className="absolute top-2 left-2 z-10 bg-amber-500 hover:bg-amber-600">
                              Limited Edition
                            </Badge>
                          )}
                          <div className="absolute top-2 right-2 z-10">
                            <WishlistButton
                              productId={product.id}
                              productName={product.name}
                              productPrice={product.price}
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
                          <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">{product.brand} • {product.category}</div>
                          <h3 className="text-base font-bold text-foreground uppercase tracking-wide">{product.name}</h3>
                          <div className="flex items-center justify-between">
                            <p className="text-lg font-semibold text-primary">KSh{product.price.toLocaleString()}</p>
                            <span className="text-xs text-muted-foreground">{product.size}</span>
                          </div>
                          <AddToCartButton
                            productId={product.id}
                            productName={product.name}
                            price={product.price}
                            productImage={product.image}
                            fullWidth
                            size="sm"
                          />
                          <BuyNowButton
                            productId={product.id}
                            productName={product.name}
                            price={product.price}
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
