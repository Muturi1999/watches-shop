import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background" />
        <Image src="/luxury-watch-on-wrist.jpg" alt="Hero watch" fill className="object-cover opacity-40" priority />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <p className="text-sm font-medium text-muted-foreground mb-4 tracking-widest uppercase">
            Chic embellishments
          </p>
          <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-8 text-balance">
            Premium Executive Collection
          </h2>
          <Button size="lg" className="text-base px-8 py-6" asChild>
            <Link href="/shop">SHOP NOW</Link>
          </Button>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">WELCOME TO CHESIRO COLLECTION</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We are a premium Kenyan brand providing executive watches, jewelry, and accessories for both men and women.
            We pride ourselves with excellent products and customer service. All our watches are original with a 1 year
            warranty and we offer free lifetime battery replacement. Looking forward to serving you.
          </p>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-12">POPULAR CATEGORIES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Link href="/shop?category=Men">
              <Card className="group overflow-hidden cursor-pointer transition-all hover:shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/mens-luxury-watch-black-dial.jpg"
                    alt="Men's watches"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-4">MEN</h3>
                  <Button variant="outline">View Products</Button>
                </div>
              </Card>
            </Link>

            <Link href="/shop?category=Women">
              <Card className="group overflow-hidden cursor-pointer transition-all hover:shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/womens-luxury-watch-rose-gold.jpg"
                    alt="Women's watches"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-4">WOMEN</h3>
                  <Button variant="outline">View Products</Button>
                </div>
              </Card>
            </Link>

            <Link href="/shop?category=Jewelry">
              <Card className="group overflow-hidden cursor-pointer transition-all hover:shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/luxury-jewelry.png"
                    alt="Jewelry"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-4">JEWELRY</h3>
                  <Button variant="outline">View Products</Button>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <h3 className="text-xl font-bold text-foreground mb-2">FREE Country Delivery</h3>
              <p className="text-muted-foreground">FOR OVER 3 ORDERS</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-foreground mb-2">Same day delivery</h3>
              <p className="text-muted-foreground">NAIROBI ORDERS ONLY</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-foreground mb-2">Get Ksh500 Voucher</h3>
              <p className="text-muted-foreground">REFER A FRIEND</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-12">POPULAR PRODUCTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { id: 1, name: "Phoenix Rosegold", price: "KSh7,500.00", image: "rose gold watch elegant" },
              { id: 2, name: "Vega Black", price: "KSh7,500.00", image: "black mens watch modern" },
              { id: 3, name: "Aurora II Rose Gold", price: "KSh9,500.00", image: "rose gold womens watch" },
            ].map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <Card className="group overflow-hidden cursor-pointer transition-all hover:shadow-xl">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <Image
                      src={`/.jpg?height=400&width=400&query=${encodeURIComponent(product.image)}`}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-foreground mb-2">{product.name}</h3>
                    <p className="text-lg font-semibold text-primary">{product.price}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Instagram</h2>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <div className="w-10 h-10 rounded-full bg-primary/10" />
              <span className="font-semibold">@chesirocollection</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <div key={item} className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group">
                <Image
                  src={`/.jpg?height=400&width=400&query=${encodeURIComponent(
                    `luxury watch on wrist instagram photo ${item}`
                  )}`}
                  alt={`Instagram post ${item}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-8 flex gap-4 justify-center">
            <Button variant="outline">Load More...</Button>
            <Button>Follow on Instagram</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
