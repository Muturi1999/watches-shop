"use client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ShoppingCart, Plus, Minus, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"
import { getProductById } from "@/lib/products"

interface CartItem {
  id: number
  name: string
  price: number
  image?: string
  quantity: number
  addedAt: string
}

const ITEMS_PER_PAGE = 5

export default function CartPage() {
  const [mounted, setMounted] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setMounted(true)
    loadCart()
  }, [])

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartItems(cart)
  }

  const totalPages = Math.ceil(cartItems.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentItems = cartItems.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return
    
    const updatedCart = cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    )
    setCartItems(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const removeItem = (itemId: number) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId)
    setCartItems(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    window.dispatchEvent(new Event("cartUpdated"))
    
    // Adjust current page if we're on the last page and it becomes empty
    const newTotalPages = Math.ceil(updatedCart.length / ITEMS_PER_PAGE)
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages)
    }
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
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
            <span className="text-foreground font-medium">Shopping Cart</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 uppercase tracking-tight">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="mb-8">
              <ShoppingCart className="h-24 w-24 mx-auto text-muted-foreground/30 stroke-1" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Add some amazing watches and accessories to your cart and start shopping!
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
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-muted-foreground">
                    Showing {startIndex + 1}-{Math.min(endIndex, cartItems.length)} of {cartItems.length} items
                  </p>
                </div>
                
                <div className="space-y-4 mb-8">
                  {currentItems.map((item) => {
                    const product = getProductById(item.id)
                    return (
                      <Card key={item.id} className="p-4">
                        <div className="flex gap-4">
                          <Link href={`/product/${item.id}`} className="flex-shrink-0">
                            <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted">
                              <Image
                                src={item.image || product?.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </Link>
                          <div className="flex-1 min-w-0">
                            <Link href={`/product/${item.id}`} className="hover:text-primary transition-colors">
                              <h3 className="font-semibold text-lg mb-1 truncate">{item.name}</h3>
                            </Link>
                            <p className="text-muted-foreground mb-3">KSh{item.price.toLocaleString()}</p>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center border rounded-lg">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="px-4 text-sm font-medium">{item.quantity}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-lg">KSh{(item.price * item.quantity).toLocaleString()}</p>
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
              <div>
                <Card className="p-6 sticky top-4">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                      <span>KSh{calculateTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>KSh{calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                  <Link href="/checkout">
                    <Button size="lg" className="w-full uppercase tracking-wide font-bold">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <Link href="/shop" className="block mt-4">
                    <Button variant="outline" size="lg" className="w-full uppercase tracking-wide font-bold">
                      Continue Shopping
                    </Button>
                  </Link>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
