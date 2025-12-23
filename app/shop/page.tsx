import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import CategoryShop from "@/components/shop/CategoryShop"

export default async function ShopPage({ searchParams }: { searchParams?: { category?: string } | Promise<{ category?: string }> }) {
  const sp = await searchParams
  const category = sp?.category

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* page-level header removed: CategoryShop renders its own header */}

      {/* Category-specific hero + filters + products */}
      <CategoryShop category={category} />

      <Footer />
    </div>
  )
}
