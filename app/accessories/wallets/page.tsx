import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"

const products = [
  { id: 111, name: "Leather Bi-Fold Wallet", price: "KSh3,500.00" },
  { id: 112, name: "Slim Card Holder", price: "KSh2,200.00" },
  { id: 113, name: "Executive Leather Wallet", price: "KSh4,800.00" },
  { id: 114, name: "RFID Blocking Wallet", price: "KSh3,900.00" },
  { id: 115, name: "Money Clip Wallet", price: "KSh2,800.00" },
  { id: 116, name: "Travel Document Wallet", price: "KSh5,200.00" },
]

export default function Wallets() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10" />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">Wallets</h1>
          <p className="text-lg text-muted-foreground">Premium wallets crafted from the finest materials</p>
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
                      `${product.name.toLowerCase()} premium leather`
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
