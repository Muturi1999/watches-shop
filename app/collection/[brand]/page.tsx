import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

const brandCollections = {
  rolex: { name: "Rolex", description: "Timeless luxury and precision" },
  omega: { name: "Omega", description: "Excellence in watchmaking since 1848" },
  "tag-heuer": { name: "TAG Heuer", description: "Swiss avant-garde since 1860" },
  cartier: { name: "Cartier", description: "The jeweler of kings" },
  "patek-philippe": { name: "Patek Philippe", description: "You never actually own a Patek Philippe" },
}

export default async function BrandCollection({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params
  const brandInfo = brandCollections[brand as keyof typeof brandCollections]

  if (!brandInfo) {
    notFound()
  }

  const products = Array.from({ length: 8 }, (_, i) => ({
    id: 200 + i,
    name: `${brandInfo.name} ${i + 1}`,
    price: `KSh${(15000 + i * 2500).toLocaleString()}.00`,
  }))

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-6">{brandInfo.name}</h1>
          <p className="text-xl text-muted-foreground">{brandInfo.description}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">{brandInfo.name} Collection</h2>
          <p className="text-muted-foreground">
            Discover our exclusive selection of {brandInfo.name} timepieces, each representing the pinnacle of
            horological craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <Card className="group overflow-hidden cursor-pointer transition-all hover:shadow-xl">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image
                    src={`/.jpg?height=400&width=400&query=${encodeURIComponent(
                      `${brandInfo.name.toLowerCase()} luxury watch ${product.id}`
                    )}`}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-foreground mb-2">{product.name}</h3>
                  <p className="text-lg font-semibold text-primary">{product.price}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
