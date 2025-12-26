"use client"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface AddToCartButtonProps {
  productId: number
  productName: string
  price: number
  productImage?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  fullWidth?: boolean
  iconOnly?: boolean
}

export function AddToCartButton({
  productId,
  productName,
  price,
  productImage,
  variant = "default",
  size = "default",
  className = "",
  fullWidth = false,
  iconOnly = false,
}: AddToCartButtonProps) {
  const { toast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Get current cart
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    
    // Check if item already exists
    const existingItemIndex = cart.findIndex((item: any) => item.id === productId)
    
    if (existingItemIndex > -1) {
      // Increment quantity
      cart[existingItemIndex].quantity += 1
    } else {
      // Add new item
      cart.push({
        id: productId,
        name: productName,
        price: price,
        image: productImage,
        quantity: 1,
        addedAt: new Date().toISOString(),
      })
    }
    
    localStorage.setItem("cart", JSON.stringify(cart))
    
    // Dispatch custom event to update navbar counter
    window.dispatchEvent(new Event("cartUpdated"))
    
    toast({
      title: "Added to Cart",
      description: `${productName} (KSh${price.toLocaleString()}) has been added to your cart.`,
    })
  }

  return (
    <Button
      onClick={handleAddToCart}
      variant={variant}
      size={size}
      className={`${fullWidth ? "w-full" : ""} ${className}`}
    >
      <ShoppingCart className={`h-4 w-4 ${!iconOnly ? "mr-2" : ""}`} />
      {!iconOnly && "Add to Cart"}
    </Button>
  )
}
