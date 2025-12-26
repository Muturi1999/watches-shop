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
import { ChevronRight, Search, X } from "lucide-react"
import { useState } from "react"

const products = [
  { id: 21, name: "Classic Leather Black", price: 8500, category: "Watches", brand: "Rolex", strap: "Leather", size: "42mm", limited: false, image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&q=80" },
  { id: 22, name: "Executive Leather Brown", price: 9200, category: "Watches", brand: "Omega", strap: "Leather", size: "44mm", limited: true, image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=400&q=80" },
  { id: 23, name: "Premium Leather Cognac", price: 9800, category: "Watches", brand: "TAG Heuer", strap: "Leather", size: "40mm", limited: false, image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&q=80" },
  { id: 24, name: "Vintage Leather Navy", price: 8800, category: "Watches", brand: "Patek Philippe", strap: "Leather", size: "42mm", limited: false, image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=400&q=80" },
  { id: 25, name: "Elite Leather Burgundy", price: 9500, category: "Watches", brand: "Cartier", strap: "Leather", size: "41mm", limited: true, image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400&q=80" },
  { id: 26, name: "Heritage Leather Tan", price: 9000, category: "Watches", brand: "Breitling", strap: "Leather", size: "43mm", limited: false, image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&q=80" },
  { id: 27, name: "Sport Chronograph Steel", price: 12500, category: "Watches", brand: "Rolex", strap: "Metal", size: "44mm", limited: true, image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&q=80" },
  { id: 28, name: "Diver Professional", price: 11200, category: "Watches", brand: "Omega", strap: "Rubber", size: "45mm", limited: false, image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=400&q=80" },
  { id: 29, name: "Aviation Pilot Watch", price: 10800, category: "Watches", brand: "IWC", strap: "Canvas", size: "46mm", limited: false, image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&q=80" },
  { id: 30, name: "Leather Wallet Brown", price: 3500, category: "Wallets", brand: "Universal", strap: "N/A", size: "Standard", limited: false, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80" },
  { id: 31, name: "Metal Watch Strap", price: 2800, category: "Straps", brand: "Universal", strap: "Metal", size: "22mm", limited: false, image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=400&q=80" },
  { id: 32, name: "Canvas Strap Set", price: 1500, category: "Straps", brand: "Universal", strap: "Canvas", size: "20mm", limited: false, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" },
  { id: 33, name: "Watch Winder Box", price: 8500, category: "Accessories", brand: "Universal", strap: "N/A", size: "4 Watches", limited: false, image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&q=80" },
  { id: 34, name: "Watch Travel Case", price: 4200, category: "Accessories", brand: "Universal", strap: "N/A", size: "6 Watches", limited: false, image: "https://images.unsplash.com/photo-1608889476518-738c9b1dcb4e?w=400&q=80" },
  { id: 35, name: "Cufflinks Silver", price: 2500, category: "Accessories", brand: "Universal", strap: "N/A", size: "Standard", limited: false, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80" },
]

const brands = ["Rolex", "Omega", "TAG Heuer", "Patek Philippe", "Cartier", "Breitling", "IWC", "Universal"]
const categories = ["Watches", "Straps", "Wallets", "Accessories"]
const strapTypes = ["Leather", "Metal", "Canvas", "Rubber"]
const sizes = ["40mm", "41mm", "42mm", "43mm", "44mm", "45mm", "46mm", "20mm", "22mm", "Standard"]

export default function MenLeather() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedStraps, setSelectedStraps] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [showLimitedOnly, setShowLimitedOnly] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 15000])

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    const matchesStrap = selectedStraps.length === 0 || selectedStraps.includes(product.strap)
    const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(product.size)
    const matchesLimited = !showLimitedOnly || product.limited
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    return matchesSearch && matchesBrand && matchesCategory && matchesStrap && matchesSize && matchesLimited && matchesPrice
  })

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand])
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category])
  }

  const toggleStrap = (strap: string) => {
    setSelectedStraps(prev => prev.includes(strap) ? prev.filter(s => s !== strap) : [...prev, strap])
  }

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedBrands([])
    setSelectedCategories([])
    setSelectedStraps([])
    setSelectedSizes([])
    setShowLimitedOnly(false)
    setPriceRange([0, 15000])
  }

  const activeFiltersCount = selectedBrands.length + selectedCategories.length + selectedStraps.length + selectedSizes.length + (showLimitedOnly ? 1 : 0)
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=1200&q=80')] bg-cover bg-center opacity-30" />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 uppercase tracking-tight">Men's Collection</h1>
          <p className="text-lg text-white/90">Watches, Accessories & More</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Men's Collection</span>
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

            {/* Strap Types */}
            <div>
              <h3 className="text-sm font-bold mb-3 uppercase tracking-wide">Strap Types</h3>
              <div className="space-y-2">
                {strapTypes.map(strap => (
                  <label key={strap} className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={selectedStraps.includes(strap)}
                      onCheckedChange={() => toggleStrap(strap)}
                    />
                    <span className="text-sm">{strap}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-sm font-bold mb-3 uppercase tracking-wide">Sizes</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {sizes.map(size => (
                  <label key={size} className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={selectedSizes.includes(size)}
                      onCheckedChange={() => toggleSize(size)}
                    />
                    <span className="text-sm">{size}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Limited Edition */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={showLimitedOnly}
                  onCheckedChange={() => setShowLimitedOnly(!showLimitedOnly)}
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
            {activeFiltersCount > 0 && (
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
                {selectedStraps.map(strap => (
                  <Badge key={strap} variant="secondary" className="gap-1">
                    {strap}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleStrap(strap)} />
                  </Badge>
                ))}
                {selectedSizes.map(size => (
                  <Badge key={size} variant="secondary" className="gap-1">
                    {size}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleSize(size)} />
                  </Badge>
                ))}
                {showLimitedOnly && (
                  <Badge variant="secondary" className="gap-1">
                    Limited Edition
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setShowLimitedOnly(false)} />
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
                {filteredProducts.map((product) => (
                  <div key={product.id} className="relative">
                    <Link href={`/product/${product.id}?from=men`}>
                      <Card className="group overflow-hidden cursor-pointer transition-all hover:shadow-xl border-2">
                        <div className="relative">
                          {product.limited && (
                            <Badge className="absolute top-2 left-2 z-10 bg-slate-800 hover:bg-slate-900">
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
