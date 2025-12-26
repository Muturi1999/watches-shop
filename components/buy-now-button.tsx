"use client"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface BuyNowButtonProps {
  productId: number
  productName: string
  price: number
  image: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
  fullWidth?: boolean
}

export function BuyNowButton({
  productId,
  productName,
  price,
  image,
  variant = "outline",
  size = "default",
  className = "",
  fullWidth = false,
}: BuyNowButtonProps) {
  const router = useRouter()

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Store product in localStorage for checkout
    const checkoutItem = {
      id: productId,
      name: productName,
      price,
      image,
      quantity: 1,
    }
    localStorage.setItem("checkoutItem", JSON.stringify(checkoutItem))
    
    // Redirect to checkout
    router.push("/checkout")
  }

  return (
    <Button
      onClick={handleBuyNow}
      variant={variant}
      size={size}
      className={`${fullWidth ? "w-full" : ""} ${className}`}
    >
      <ShoppingBag className="h-4 w-4 mr-2" />
      Buy Now
    </Button>
  )
}
