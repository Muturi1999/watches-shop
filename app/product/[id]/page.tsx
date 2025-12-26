"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WishlistButton } from "@/components/wishlist-button"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { BuyNowButton } from "@/components/buy-now-button"
import { ShoppingCart, Heart, Share2, Star, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound, useParams, useSearchParams } from "next/navigation"
import { getProductById, products } from "@/lib/products"
import { useEffect, useState } from "react"

export default function ProductDetail() {
  const params = useParams()
  const searchParams = useSearchParams()
  const [product, setProduct] = useState<any>(null)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  
  useEffect(() => {
    const id = params?.id as string
    const productId = Number.parseInt(id)
    const foundProduct = getProductById(productId)
    
    if (!foundProduct) {
      notFound()
    }
    
    setProduct(foundProduct)
    setRelatedProducts(products.filter((p) => p.id !== foundProduct!.id && p.category === foundProduct!.category).slice(0, 3))
  }, [params])

  if (!product) return null

  const from = searchParams?.get('from')
  
  // Determine the breadcrumb path and name based on the source
  let categoryPath = '/shop'
  let categoryName = 'Shop'
  
  if (from === 'women') {
    categoryPath = '/women/leather'
    categoryName = 'Women'
  } else if (from === 'men') {
    categoryPath = '/men/leather'
    categoryName = 'Men'
  } else if (from === 'accessories') {
    categoryPath = '/accessories/jewelry/bracelets'
    categoryName = 'Accessories'
  } else if (from === 'popular-products') {
    categoryPath = '/#popular-products'
    categoryName = 'Popular Products'
  } else if (from === 'collection') {
    categoryPath = '/#collection'
    categoryName = 'City Watches Collection'
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} at City Watches`,
        url: window.location.href,
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link href={categoryPath} className="hover:text-primary">
            {categoryName}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer">
                  <Image
                    src={product.image}
                    alt={`${product.name} view ${i}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-4">
              <span className="text-sm text-muted-foreground">{product.brand || 'City Watches'}</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(48 reviews)</span>
            </div>

            <p className="text-3xl font-bold text-primary mb-6">{product.price}</p>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              {product.description || `Exquisite ${product.name} from our premium collection. Crafted with attention to detail and designed for those who appreciate quality and style.`}
            </p>

            {/* Product Specifications */}
            <Card className="p-6 mb-8">
              <h3 className="font-bold text-foreground mb-4">Specifications</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                {product.material && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Material:</span>
                    <span className="font-medium">{product.material}</span>
                  </div>
                )}
                {product.size && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size:</span>
                    <span className="font-medium">{product.size}</span>
                  </div>
                )}
                {product.waterResistance && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Water Resistance:</span>
                    <span className="font-medium">{product.waterResistance}</span>
                  </div>
                )}
                {product.warranty && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Warranty:</span>
                    <span className="font-medium">{product.warranty}</span>
                  </div>
                )}
              </div>
            </Card>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-8">
                <h3 className="font-bold text-foreground mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <AddToCartButton
                productId={product.id}
                productName={product.name}
                price={product.priceNum}
                productImage={product.image}
                fullWidth
                size="lg"
              />
              
              <BuyNowButton
                productId={product.id}
                productName={product.name}
                price={product.priceNum}
                image={product.image}
                fullWidth
                size="lg"
              />

              <div className="flex gap-2">
                <WishlistButton
                  productId={product.id}
                  productName={product.name}
                  productPrice={product.priceNum}
                  productImage={product.image}
                  className="flex-1 flex items-center justify-center gap-2 border rounded-lg p-3 hover:bg-muted transition-colors"
                  iconSize={20}
                />
                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 border rounded-lg p-3 hover:bg-muted transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                  Share
                </button>
              </div>
            </div>

            {/* Contact Options */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <a
                href="tel:0728160293"
                className="flex items-center justify-center gap-2 bg-black text-white rounded-lg p-3 hover:bg-black/90 transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span>0728160293</span>
              </a>
              <a
                href="https://wa.me/254728160293"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-600 text-white rounded-lg p-3 hover:bg-green-700 transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>+254728160293</span>
              </a>
            </div>

            {/* Free Shipping Notice */}
            <div className="text-sm text-muted-foreground text-center">
              ✓ Free lifetime battery replacement • ✓ 1 Year Warranty
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}?from=${from || 'shop'}`}>
                  <Card className="group overflow-hidden cursor-pointer transition-all hover:shadow-xl">
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <Image src={relatedProduct.image} alt={relatedProduct.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold text-foreground mb-2">{relatedProduct.name}</h3>
                      <p className="text-lg font-semibold text-primary">{relatedProduct.price}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  )
}
