"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import type { Product } from "@/lib/products"
import { imageSrc } from "@/lib/utils"

type Props = {
  products: Product[]
}

export default function ProductGrid({ products }: Props) {
  if (!products.length) {
    return <div className="p-6">No products found.</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`}>
          <Card className="group overflow-hidden hover:shadow-xl transition-all cursor-pointer">
            <div className="relative aspect-square overflow-hidden bg-muted">
              <Image
                src={imageSrc(product, 400, 400)}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
              <h3 className="font-semibold text-lg mb-2 text-foreground">{product.name}</h3>
              <p className="text-primary font-bold text-xl">{product.price}</p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
