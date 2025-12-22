import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ShoppingCart, Heart, Share2, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getProductById, products } from "@/lib/products"
import { imageSrc } from "@/lib/utils"

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const productId = Number.parseInt(id)
  const product = getProductById(productId)

  if (!product) {
    // Show 404 for unknown product ids instead of silently falling back
    notFound()
  }

  const relatedProducts = products.filter((p) => p.id !== product!.id).slice(0, 3)

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
          <Link href="/shop" className="hover:text-primary">
            Shop
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <Image src={imageSrc(product, 600, 600)} alt={product.name} fill className="object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer">
                  <Image
                    src={imageSrc(product, 150, 150, `angle ${i}`)}
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
              <span className="text-sm text-muted-foreground">{product.brand}</span>
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

            <p className="text-muted-foreground mb-8 leading-relaxed">{product.description}</p>

            {/* Product Specifications */}
            <Card className="p-6 mb-8">
              <h3 className="font-bold text-foreground mb-4">Specifications</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Material:</span>
                  <span className="font-medium">{product.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Water Resistance:</span>
                  <span className="font-medium">{product.waterResistance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Warranty:</span>
                  <span className="font-medium">{product.warranty}</span>
                </div>
              </div>
            </Card>

            {/* Features */}
            <div className="mb-8">
              <h3 className="font-bold text-foreground mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.features?.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <Button size="lg" className="flex-1">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Delivery Info */}
            <Card className="p-4 bg-muted/30">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Free Delivery:</strong> On orders over 3 items nationwide
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                <strong className="text-foreground">Same Day Delivery:</strong> Available in Nairobi
              </p>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                <Card className="group overflow-hidden cursor-pointer transition-all hover:shadow-xl">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <Image src={imageSrc(relatedProduct, 400, 400)} alt={relatedProduct.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
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
      </div>

      <Footer />
    </div>
  )
}
