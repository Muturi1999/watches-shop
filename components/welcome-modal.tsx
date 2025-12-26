"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useEffect, useState } from "react"

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Show modal after a short delay on first visit
    const hasSeenModal = sessionStorage.getItem("hasSeenWelcomeModal")
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        sessionStorage.setItem("hasSeenWelcomeModal", "true")
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <div className="relative bg-gradient-to-br from-primary/10 to-background p-8">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          
          <DialogHeader className="text-center mb-6">
            <DialogTitle className="text-3xl font-bold mb-4">WELCOME TO CITY WATCHES</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 text-center">
            <p className="text-base leading-relaxed text-muted-foreground">
              We are a premium brand providing executive watches for both men and women. 
              City Watches offers the finest collection of luxury timepieces from around the world.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              We pride ourselves with excellent products and customer service. All our watches are 
              original with a <strong>1 year warranty</strong> and we offer <strong>free lifetime battery replacement</strong>.
            </p>
            <p className="text-base font-semibold text-foreground">
              Looking forward to serving you
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <Button size="lg" onClick={() => setIsOpen(false)} className="px-8">
              Start Shopping
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
