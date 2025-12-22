"use client"
import React, { useEffect, useMemo, useState } from "react"
import Filters from "@/components/shop/Filters"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import ProductGrid from "@/components/shop/ProductGrid"
import { products as allProducts, type Product } from "@/lib/products"
import { useSearchParams, useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Copy, X } from "lucide-react"

type Props = {
  category?: string | null
}

function parsePrice(price?: string) {
  if (!price) return 0
  const n = Number(price.replace(/[^0-9.]/g, ""))
  return Number.isNaN(n) ? 0 : n
}

export default function CategoryShop({ category }: Props) {
  const initialCategory = category ? category : undefined

  // build base set
  const baseProducts = useMemo(() => {
    if (!initialCategory) return allProducts
    return allProducts.filter((p) => p.category?.toLowerCase() === initialCategory.toLowerCase())
  }, [initialCategory])

  const prices = baseProducts.map((p) => parsePrice(p.price))
  const minPrice = Math.min(0, ...(prices.length ? prices : [0]))
  const maxPrice = Math.max(0, ...(prices.length ? prices : [0]))

  const searchParams = useSearchParams()
  const router = useRouter()

  // Initialize from query params when available
  const qMin = searchParams?.get("min")
  const qMax = searchParams?.get("max")
  const qStraps = searchParams?.get("straps")
  const qAccessories = searchParams?.get("accessories")

  const parsedMin = qMin ? Number(qMin) : minPrice
  const parsedMax = qMax ? Number(qMax) : maxPrice

  const [priceRange, setPriceRange] = useState<[number, number]>([parsedMin, parsedMax])
  const straps = ["Leather", "Canvas", "Metallic"]
  const [selectedStraps, setSelectedStraps] = useState<string[]>(qStraps ? qStraps.split(",") : [])
  const [showAccessories, setShowAccessories] = useState(qAccessories === "1" || qAccessories === "true")

  // If category (and therefore min/max) changes and there are no explicit query params, reset price range
  useEffect(() => {
    if (!qMin && !qMax) {
      setPriceRange([minPrice, maxPrice])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minPrice, maxPrice, initialCategory])

  const toggleStrap = (s: string) => {
    setSelectedStraps((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))
  }

  const filtered = useMemo(() => {
    let set = baseProducts.slice()

    // include accessories if requested
    if (showAccessories && initialCategory) {
      const accessories = allProducts.filter((p) => p.category === "Jewelry" || p.category === "Wallets")
      set = set.concat(accessories)
    }

    // price filter
    set = set.filter((p) => {
      const n = parsePrice(p.price)
      return n >= priceRange[0] && n <= priceRange[1]
    })

    // strap filter
    if (selectedStraps.length) {
      set = set.filter((p) => {
        const name = (p.material || p.name || "").toLowerCase()
        return selectedStraps.some((s) => name.includes(s.toLowerCase()))
      })
    }

    return set
  }, [baseProducts, priceRange, selectedStraps, showAccessories, initialCategory])

  const [openMobileFilters, setOpenMobileFilters] = useState(false)
  const { toast } = useToast()

  function clearFilters() {
    setPriceRange([minPrice, maxPrice])
    setSelectedStraps([])
    setShowAccessories(false)

    // Build clean URL: keep category if present
    const params = new URLSearchParams()
    if (initialCategory) params.set("category", initialCategory)
    const base = window.location.pathname
    const url = params.toString() ? `${base}?${params.toString()}` : base
    router.replace(url)
    setOpenMobileFilters(false)
    toast({ title: "Filters cleared" })
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setOpenMobileFilters(false)
      toast({ title: "Link copied to clipboard" })
    } catch (e) {
      toast({ title: "Unable to copy link" })
    }
  }

  // Persist to URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    if (initialCategory) params.set("category", initialCategory)
    if (priceRange[0] !== minPrice) params.set("min", String(priceRange[0]))
    if (priceRange[1] !== maxPrice) params.set("max", String(priceRange[1]))
    if (selectedStraps.length) params.set("straps", selectedStraps.join(","))
    if (showAccessories) params.set("accessories", "1")

    const base = window.location.pathname
    const query = params.toString()
    const url = query ? `${base}?${query}` : base

    // use replace so we don't clutter history
    router.replace(url)
  }, [priceRange, selectedStraps, showAccessories, initialCategory, minPrice, maxPrice, router])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <Filters
            minPrice={minPrice}
            maxPrice={maxPrice}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            straps={straps}
            selectedStraps={selectedStraps}
            onToggleStrap={toggleStrap}
            showAccessories={showAccessories}
            onToggleAccessories={() => setShowAccessories((s) => !s)}
          />
        </div>

        <main>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-foreground">{initialCategory ? initialCategory : "All Products"}</h2>
            <div className="flex items-center gap-3">
              <div className="text-sm text-muted-foreground">{filtered.length} products</div>
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={clearFilters} title="Clear filters">
                  <X className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={copyLink} title="Copy link">
                  <Copy className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
              {/* Mobile filters button */}
              <div className="lg:hidden">
                <Button variant="outline" size="sm" onClick={() => setOpenMobileFilters(true)}>
                  Filters
                </Button>
              </div>
            </div>
          </div>

          <ProductGrid products={filtered} />
        </main>

        {/* Mobile sheet for filters */}
        <Sheet open={openMobileFilters} onOpenChange={setOpenMobileFilters}>
          <SheetContent className="w-full max-w-md p-0">
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Filters</h3>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={clearFilters} title="Clear filters">
                    <X className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={copyLink} title="Copy link">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Filters
                minPrice={minPrice}
                maxPrice={maxPrice}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                straps={straps}
                selectedStraps={selectedStraps}
                onToggleStrap={toggleStrap}
                showAccessories={showAccessories}
                onToggleAccessories={() => setShowAccessories((s) => !s)}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
