"use client"
import { Heart } from "lucide-react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

interface WishlistButtonProps {
  productId: number
  productName: string
  productPrice?: number
  productImage?: string
  className?: string
  iconSize?: number
}

export function WishlistButton({ 
  productId, 
  productName, 
  productPrice,
  productImage,
  className = "", 
  iconSize = 20 
}: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Check if item is in wishlist on mount
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    const inWishlist = wishlist.some((item: any) => item.id === productId)
    setIsInWishlist(inWishlist)
  }, [productId])

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    
    if (!isInWishlist) {
      // Add to wishlist
      const newItem = {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        addedAt: new Date().toISOString(),
      }
      wishlist.push(newItem)
      localStorage.setItem("wishlist", JSON.stringify(wishlist))
      setIsInWishlist(true)
      
      // Dispatch custom event to update navbar counter
      window.dispatchEvent(new Event("wishlistUpdated"))
      
      toast({
        title: "Added to Wishlist",
        description: `${productName} has been added to your wishlist.`,
      })
    } else {
      // Remove from wishlist
      const filtered = wishlist.filter((item: any) => item.id !== productId)
      localStorage.setItem("wishlist", JSON.stringify(filtered))
      setIsInWishlist(false)
      
      // Dispatch custom event to update navbar counter
      window.dispatchEvent(new Event("wishlistUpdated"))
      
      toast({
        title: "Removed from Wishlist",
        description: `${productName} has been removed from your wishlist.`,
      })
    }
  }

  return (
    <button
      onClick={toggleWishlist}
      className={`transition-all hover:scale-110 ${className}`}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        className={`${isInWishlist ? "fill-red-500 text-red-500" : "text-white hover:text-red-500"} stroke-[2.5]`}
        size={iconSize}
      />
    </button>
  )
}
