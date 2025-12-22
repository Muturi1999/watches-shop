import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"

const products = [
  { id: 81, name: "Gold Chain Bracelet", price: "KSh4,500.00" },
  { id: 82, name: "Silver Bangle Set", price: "KSh3,800.00" },
  { id: 83, name: "Rose Gold Charm Bracelet", price: "KSh5,200.00" },
  { id: 84, name: "Leather Wrap Bracelet", price: "KSh2,900.00" },
  { id: 85, name: "Diamond Tennis Bracelet", price: "KSh8,500.00" },
  { id: 86, name: "Pearl Beaded Bracelet", price: "KSh3,500.00" },
]

export default function Bracelets() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10" />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">Bracelets</h1>
          <p className="text-lg text-muted-foreground">Elegant bracelets to complement your style</p>
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
                      `${product.name.toLowerCase()} luxury jewelry`
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
