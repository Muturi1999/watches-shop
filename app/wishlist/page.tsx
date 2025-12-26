"use client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, X, ChevronLeft, ChevronRight, Eye, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"
import { getProductById } from "@/lib/products"
import { useToast } from "@/hooks/use-toast"

interface WishlistItem {
  id: number
  name: string
  price?: number
  image?: string
  addedAt: string
}

const ITEMS_PER_PAGE = 5

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false)
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
    loadWishlist()
  }, [])

  const loadWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setWishlistItems(wishlist)
  }

  const totalPages = Math.ceil(wishlistItems.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentItems = wishlistItems.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const removeItem = (itemId: number) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== itemId)
    setWishlistItems(updatedWishlist)
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
    window.dispatchEvent(new Event("wishlistUpdated"))
    
    // Adjust current page if we're on the last page and it becomes empty
    const newTotalPages = Math.ceil(updatedWishlist.length / ITEMS_PER_PAGE)
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages)
    }
    
    toast({
      title: "Removed from Wishlist",
      description: "Item has been removed from your wishlist.",
    })
  }

  const addToCart = (item: WishlistItem) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const existingItemIndex = cart.findIndex((cartItem: any) => cartItem.id === item.id)
    
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
        addedAt: new Date().toISOString(),
      })
    }
    
    localStorage.setItem("cart", JSON.stringify(cart))
    window.dispatchEvent(new Event("cartUpdated"))
    
    // Remove item from wishlist after adding to cart
    const updatedWishlist = wishlistItems.filter(wishItem => wishItem.id !== item.id)
    setWishlistItems(updatedWishlist)
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
    window.dispatchEvent(new Event("wishlistUpdated"))
    
    // Adjust current page if we're on the last page and it becomes empty
    const newTotalPages = Math.ceil(updatedWishlist.length / ITEMS_PER_PAGE)
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages)
    }
    
    toast({
      title: "Moved to Cart",
      description: `${item.name} has been moved from wishlist to cart.`,
    })
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Wishlist</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 uppercase tracking-tight">
          My Wishlist
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="mb-8">
              <Heart className="h-24 w-24 mx-auto text-muted-foreground/30 stroke-1" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Save your favorite watches and accessories to your wishlist and shop them later.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/">
                <Button variant="outline" size="lg" className="uppercase tracking-wide font-bold">
                  Go Home
                </Button>
              </Link>
              <Link href="/shop">
                <Button size="lg" className="uppercase tracking-wide font-bold">
                  Shop More
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(endIndex, wishlistItems.length)} of {wishlistItems.length} items
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              {currentItems.map((item) => {
                const product = getProductById(item.id)
                return (
                  <Card key={item.id} className="p-4">
                    <div className="flex gap-4 items-start">
                      <Link href={`/product/${item.id}`} className="flex-shrink-0">
                        <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-muted">
                          <Image
                            src={item.image || product?.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400"}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform hover:scale-105"
                          />
                          {product?.limited && (
                            <Badge className="absolute top-2 left-2" variant="destructive">
                              Limited
                            </Badge>
                          )}
                        </div>
                      </Link>
                      
                      <div className="flex-1 min-w-0">
                        <Link href={`/product/${item.id}`} className="hover:text-primary transition-colors">
                          <h3 className="font-semibold text-xl mb-2">{item.name}</h3>
                        </Link>
                        {product?.brand && (
                          <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
                        )}
                        <p className="font-bold text-2xl mb-4">
                          {item.price ? `KSh${item.price.toLocaleString()}` : product?.price || "Price unavailable"}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            size="default"
                            onClick={() => addToCart(item)}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                          <Link href="/checkout" onClick={() => {
                            localStorage.setItem("checkoutItem", JSON.stringify({
                              id: item.id,
                              name: item.name,
                              price: item.price,
                              image: item.image,
                              quantity: 1
                            }))
                          }}>
                            <Button size="default" variant="outline">
                              Buy Now
                            </Button>
                          </Link>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Link href={`/product/${item.id}`}>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-9 w-9"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/product/${item.id}`}>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-9 w-9"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-9 w-9 text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="icon"
                      onClick={() => goToPage(page)}
                      className="w-10"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
