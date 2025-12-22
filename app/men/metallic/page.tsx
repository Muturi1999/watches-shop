import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"

const products = [
  { id: 31, name: "Steel Master Silver", price: "KSh10,500.00" },
  { id: 32, name: "Titanium Pro Black", price: "KSh12,200.00" },
  { id: 33, name: "Chrome Elite Gold", price: "KSh11,800.00" },
  { id: 34, name: "Metal Fusion Gray", price: "KSh10,800.00" },
  { id: 35, name: "Alloy Supreme Rose Gold", price: "KSh11,500.00" },
  { id: 36, name: "Steel Precision Two-Tone", price: "KSh11,000.00" },
]

export default function MenMetallic() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10" />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">Men's Metallic Collection</h1>
          <p className="text-lg text-muted-foreground">Premium metal watches with exceptional craftsmanship</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <Card className="group overflow-hidden cursor-pointer transition-all hover:shadow-xl">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image
                    src={`/.jpg?height=400&width=400&query=${encodeURIComponent(
                      `mens ${product.name.toLowerCase()} metallic watch`
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
