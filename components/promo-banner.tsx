"use client"

import { X, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

export function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted || !isVisible) return null

  const promos = [
    { icon: "🚚", text: "FREE Country Delivery", subtext: "FOR OVER 3 ORDERS" },
    { icon: "⚡", text: "Same day delivery", subtext: "NAIROBI ORDERS ONLY" },
    { icon: "💰", text: "Get Ksh500 Voucher", subtext: "REFER A FRIEND" },
  ]

  return (
    <div className="bg-primary text-primary-foreground py-2 px-4 relative">
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-8 text-sm">
          {promos.map((promo, index) => (
            <div key={index} className="hidden md:flex items-center gap-2">
              <span className="text-lg">{promo.icon}</span>
              <div className="flex items-center gap-1">
                <span className="font-semibold">{promo.text}</span>
                <span className="text-xs opacity-90">{promo.subtext}</span>
              </div>
              {index < promos.length - 1 && <ChevronRight className="h-4 w-4 ml-2" />}
            </div>
          ))}
          <div className="md:hidden flex items-center gap-2">
            <span className="text-lg">🚚</span>
            <span className="font-semibold">FREE Delivery on 3+ Orders</span>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-80 transition-opacity"
          aria-label="Close banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
