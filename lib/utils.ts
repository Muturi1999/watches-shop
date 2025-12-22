import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Build an image src for a product. If the product.image looks like a URL/path
// (starts with '/' or 'http'), return it directly. Otherwise, fall back to the
// internal dynamic image generator route `/.jpg` with a safe, encoded query.
import type { Product } from "./products"

export function imageSrc(product: Product, width = 400, height = 400, querySuffix = "") {
  const maybe = product.image?.trim()

  // If image is a URL or absolute path, use as-is
  if (maybe && (maybe.startsWith("/") || maybe.startsWith("http"))) return maybe

  const query = encodeURIComponent((product.images?.[0] || product.image || product.name) + (querySuffix ? ` ${querySuffix}` : ""))
  return `/.jpg?height=${height}&width=${width}&query=${query}`
}
