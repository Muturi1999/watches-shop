"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WelcomeModal } from "@/components/welcome-modal"
import { WishlistButton } from "@/components/wishlist-button"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { BuyNowButton } from "@/components/buy-now-button"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WelcomeModal />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=1200&q=80')] bg-cover bg-center opacity-30" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
            SEIZE THE MOMENT
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
            It's Beginning to Look a Lot Like Christmas
          </p>
          <p className="text-3xl md:text-4xl font-bold text-white mb-12 animate-pulse">
            MERRY CHRISTMAS !!!
          </p>
          <Button size="lg" className="text-base px-10 py-7 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wide">
            <Link href="/shop">SPREAD THE CHEER !</Link>
          </Button>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 uppercase tracking-tight">
            WELCOME TO CITY WATCHES
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We are a premium Kenyan brand providing executive watches for both men and women. The name "Enkata" is
            derived from the Maasai community in Kenya which means <strong>time</strong>. We pride ourselves with
            excellent products and customer service. All our watches are original with a <strong>1 year warranty</strong>{" "}
            and we offer <strong>free lifetime battery replacement</strong>. Looking forward to serving you.
          </p>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-12 uppercase tracking-tight">
            POPULAR CATEGORIES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Link href="/men/leather">
              <Card className="group overflow-hidden cursor-pointer transition-all hover:shadow-2xl border-2">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <Image
                    src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&q=80"
                    alt="Men's watches"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 text-center bg-background">
                  <h3 className="text-2xl font-bold text-foreground mb-4 uppercase tracking-wide">MEN</h3>
                  <Button variant="default" className="uppercase tracking-wide font-bold">
                    View Products
                  </Button>
                </div>
              </Card>
            </Link>

            <Link href="/women/leather">
              <Card className="group overflow-hidden cursor-pointer transition-all hover:shadow-2xl border-2">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <Image
                    src="https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=600&q=80"
                    alt="Women's watches"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 text-center bg-background">
                  <h3 className="text-2xl font-bold text-foreground mb-4 uppercase tracking-wide">WOMEN</h3>
                  <Button variant="default" className="uppercase tracking-wide font-bold">
                    View Products
                  </Button>
                </div>
              </Card>
            </Link>

            <Link href="/accessories/jewelry/bracelets">
              <Card className="group overflow-hidden cursor-pointer transition-all hover:shadow-2xl border-2">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <Image
                    src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80"
                    alt="Jewelry"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 text-center bg-background">
                  <h3 className="text-2xl font-bold text-foreground mb-4 uppercase tracking-wide">JEWELRY</h3>
                  <Button variant="default" className="uppercase tracking-wide font-bold">
                    View Products
                  </Button>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="text-3xl mb-2">🚚</div>
              <h3 className="text-lg font-bold mb-1 uppercase tracking-wide">FREE Country Delivery</h3>
              <p className="text-sm opacity-90">FOR OVER 3 ORDERS</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="text-lg font-bold mb-1 uppercase tracking-wide">Same day delivery</h3>
              <p className="text-sm opacity-90">NAIROBI ORDERS ONLY</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="text-lg font-bold mb-1 uppercase tracking-wide">Get Ksh500 Voucher</h3>
              <p className="text-sm opacity-90">REFER A FRIEND</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section id="popular-products" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-12 uppercase tracking-tight">
            POPULAR PRODUCTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              { id: 1, name: "Phoenix II Rosegold", oldPrice: "KSH9,500.00", price: "KSH8,550.00", priceNum: 8550, image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80" },
              { id: 2, name: "Vega Black", oldPrice: "KSH9,500.00", price: "KSH8,550.00", priceNum: 8550, image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&q=80" },
              { id: 3, name: "Aurora III Rose Gold M", oldPrice: "KSH15,000.00", price: "KSH13,500.00", priceNum: 13500, image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=400&q=80" },
              { id: 4, name: "Phoenix II Black-Blue L", oldPrice: "KSH9,500.00", price: "KSH8,550.00", priceNum: 8550, image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=400&q=80" },
            ].map((product) => (
              <Card key={product.id} className="group overflow-hidden transition-all hover:shadow-xl border">
                <Link href={`/product/${product.id}?from=popular-products`}>
                  <div className="relative">
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 text-xs font-bold z-10 uppercase">
                      Sale!
                    </div>
                    <div className="absolute top-2 right-2 z-10">
                      <WishlistButton
                        productId={product.id}
                        productName={product.name}
                        productPrice={product.priceNum}
                        productImage={product.image}
                      />
                    </div>
                    <div className="relative aspect-square overflow-hidden bg-slate-50">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </Link>
                <div className="p-4 bg-background">
                  <Link href={`/product/${product.id}?from=popular-products`}>
                    <h3 className="text-base font-bold text-foreground mb-2 uppercase tracking-wide text-center">{product.name}</h3>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="text-sm text-muted-foreground line-through">{product.oldPrice}</span>
                      <span className="text-lg font-bold text-primary">{product.price}</span>
                    </div>
                  </Link>
                  <div className="flex flex-col gap-2">
                    <AddToCartButton
                      productId={product.id}
                      productName={product.name}
                      price={product.priceNum}
                      productImage={product.image}
                    />
                    <BuyNowButton
                      productId={product.id}
                      productName={product.name}
                      price={product.priceNum}
                      image={product.image}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* City Watches Collection */}
      <section id="collection" className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-12 uppercase tracking-tight">
            CITY WATCHES COLLECTION
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
            {[
              { name: "Phoenix II Black-Blue L", img: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=400&q=80" },
              { name: "Apus II Light Rosegold", img: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=400&q=80" },
              { name: "Eris Grey", img: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=400&q=80" },
              { name: "Avior Grey B", img: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&q=80" },
              { name: "Avior Grey W", img: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&q=80" },
              { name: "Apus II Grey X", img: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=400&q=80" },
              { name: "Apus II Dark-Blue Canvas", img: "https://images.unsplash.com/photo-1568010434570-74e9ba7126bc?w=400&q=80" },
              { name: "Neptune Black Canvas", img: "https://images.unsplash.com/photo-1525857597365-5f6dbff2e36e?w=400&q=80" },
              { name: "Aquila Black", img: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400&q=80" },
              { name: "Aquila Burgundy", img: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&q=80" },
              { name: "Aquila Gold Mesh", img: "https://images.unsplash.com/photo-1606390493515-2f813f7ec13e?w=400&q=80" },
              { name: "Aurora Black", img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80" },
            ].map((watch, index) => (
              <Link key={index} href={`/product/${index + 5}?from=collection`}>
                <Card className="group overflow-hidden cursor-pointer transition-all hover:shadow-lg border">
                  <div className="relative aspect-square overflow-hidden bg-slate-50">
                    <Image
                      src={watch.img}
                      alt={watch.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-3 text-center bg-background">
                    <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide">{watch.name}</h4>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 uppercase tracking-tight">Instagram</h2>
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="text-lg font-semibold">@citywatches</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {[
              "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&q=80",
              "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&q=80",
              "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80",
              "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&q=80",
              "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=400&q=80",
              "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&q=80",
              "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=400&q=80",
              "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=400&q=80",
              "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=400&q=80",
              "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=400&q=80",
            ].map((imgUrl, item) => (
              <div key={item} className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group border-2 border-transparent hover:border-primary transition-all">
                <Image
                  src={imgUrl}
                  alt={`Instagram post ${item + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-8 flex gap-4 justify-center">
            <Link href="/shop">
              <Button variant="outline">Load More...</Button>
            </Link>
            <Button>Follow on Instagram</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
