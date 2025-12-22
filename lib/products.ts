export type Product = {
  id: number
  name: string
  price: string
  category: string
  image?: string
  brand?: string
  material?: string
  waterResistance?: string
  warranty?: string
  description?: string
  features?: string[]
  images?: string[]
  subcategory?: string
  tags?: string[]
  discountPercentage?: number
  badges?: string[]
  inventory?: { stock?: number; sku?: string }
}

export const products: Product[] = [
  {
    id: 1,
    name: "Phoenix Rosegold",
    price: "KSh7,500.00",
    category: "Women",
    brand: "Chesiro",
    material: "Leather",
    waterResistance: "5 ATM",
    warranty: "1 Year",
    description:
      "Elegant rose gold timepiece with a sophisticated dial and premium leather strap. Perfect for both casual and formal occasions.",
    features: ["Japanese Movement", "Scratch-resistant glass", "Adjustable strap", "Free battery replacement"],
    images: ["rose gold watch elegant"],
    image: "/womens-luxury-watch-rose-gold.jpg",
  },
  {
    id: 2,
    name: "Vega Black",
    price: "KSh7,500.00",
    category: "Men",
    brand: "Chesiro",
    material: "Metallic",
    waterResistance: "10 ATM",
    warranty: "1 Year",
    description: "Bold black watch with metallic accents and modern design. A statement piece for the contemporary man.",
    features: ["Swiss Movement", "Chronograph function", "Stainless steel case", "Free battery replacement"],
    images: ["black mens watch modern"],
    image: "/mens-luxury-watch-black-dial.jpg",
  },
  {
    id: 3,
    name: "Aurora II Rose Gold",
    price: "KSh9,500.00",
    category: "Women",
    brand: "Chesiro",
    material: "Metallic",
    waterResistance: "5 ATM",
    warranty: "1 Year",
    description: "Premium rose gold watch with intricate detailing and luxurious finish. The epitome of elegance and style.",
    features: ["Japanese Movement", "Diamond-cut crystals", "Rose gold plating", "Free battery replacement"],
    images: ["rose gold womens watch"],
    image: "/womens-luxury-watch-rose-gold.jpg",
  },
  {
    id: 4,
    name: "Diamond Bracelet",
    price: "KSh 45,000",
    category: "Jewelry",
    image: "/luxury-jewelry.png",
  },
  {
    id: 5,
    name: "Sport Chronograph",
    price: "KSh 95,000",
    category: "Men",
    image: "/mens-luxury-watch-black-dial.jpg",
  },
  {
    id: 6,
    name: "Ceramic Watch",
    price: "KSh 82,000",
    category: "Women",
    image: "/womens-luxury-watch-rose-gold.jpg",
  },
  {
    id: 7,
    name: "Canvas Strap Watch",
    price: "KSh 58,000",
    category: "Men",
    image: "/luxury-watch-on-wrist.jpg",
  },
  {
    id: 8,
    name: "Gold Necklace",
    price: "KSh 38,000",
    category: "Jewelry",
    image: "/luxury-jewelry.png",
  },
  // Men - Canvas (11-16)
  { id: 11, name: "Atlas Canvas Black", price: "KSh6,500.00", category: "Men", images: ["atlas canvas black"] },
  { id: 12, name: "Explorer Canvas Navy", price: "KSh6,800.00", category: "Men", images: ["explorer canvas navy"] },
  { id: 13, name: "Adventurer Canvas Brown", price: "KSh7,200.00", category: "Men", images: ["adventurer canvas brown"] },
  { id: 14, name: "Nomad Canvas Gray", price: "KSh6,500.00", category: "Men", images: ["nomad canvas gray"] },
  { id: 15, name: "Voyager Canvas Olive", price: "KSh7,000.00", category: "Men", images: ["voyager canvas olive"] },
  { id: 16, name: "Ranger Canvas Tan", price: "KSh6,800.00", category: "Men", images: ["ranger canvas tan"] },

  // Men - Leather (21-26)
  { id: 21, name: "Classic Leather Black", price: "KSh8,500.00", category: "Men", images: ["classic leather black"] },
  { id: 22, name: "Executive Leather Brown", price: "KSh9,200.00", category: "Men", images: ["executive leather brown"] },
  { id: 23, name: "Premium Leather Cognac", price: "KSh9,800.00", category: "Men", images: ["premium leather cognac"] },
  { id: 24, name: "Vintage Leather Navy", price: "KSh8,800.00", category: "Men", images: ["vintage leather navy"] },
  { id: 25, name: "Elite Leather Burgundy", price: "KSh9,500.00", category: "Men", images: ["elite leather burgundy"] },
  { id: 26, name: "Heritage Leather Tan", price: "KSh9,000.00", category: "Men", images: ["heritage leather tan"] },

  // Men - Metallic (31-36)
  { id: 31, name: "Steel Master Silver", price: "KSh10,500.00", category: "Men", images: ["steel master silver"] },
  { id: 32, name: "Titanium Pro Black", price: "KSh12,200.00", category: "Men", images: ["titanium pro black"] },
  { id: 33, name: "Chrome Elite Gold", price: "KSh11,800.00", category: "Men", images: ["chrome elite gold"] },
  { id: 34, name: "Metal Fusion Gray", price: "KSh10,800.00", category: "Men", images: ["metal fusion gray"] },
  { id: 35, name: "Alloy Supreme Rose Gold", price: "KSh11,500.00", category: "Men", images: ["alloy supreme rose gold"] },
  { id: 36, name: "Steel Precision Two-Tone", price: "KSh11,000.00", category: "Men", images: ["steel precision two-tone"] },

  // Women - Leather (41-46)
  { id: 41, name: "Elegance Leather Rose", price: "KSh8,200.00", category: "Women", images: ["elegance leather rose"] },
  { id: 42, name: "Graceful Leather Pink", price: "KSh8,800.00", category: "Women", images: ["graceful leather pink"] },
  { id: 43, name: "Chic Leather White", price: "KSh8,500.00", category: "Women", images: ["chic leather white"] },
  { id: 44, name: "Sophisticated Leather Brown", price: "KSh8,900.00", category: "Women", images: ["sophisticated leather brown"] },
  { id: 45, name: "Delicate Leather Beige", price: "KSh8,300.00", category: "Women", images: ["delicate leather beige"] },
  { id: 46, name: "Luxe Leather Black", price: "KSh9,000.00", category: "Women", images: ["luxe leather black"] },

  // Women - Metallic (51-56)
  { id: 51, name: "Diamond Metallic Silver", price: "KSh10,200.00", category: "Women", images: ["diamond metallic silver"] },
  { id: 52, name: "Pearl Metallic Rose Gold", price: "KSh11,500.00", category: "Women", images: ["pearl metallic rose gold"] },
  { id: 53, name: "Crystal Metallic Gold", price: "KSh12,000.00", category: "Women", images: ["crystal metallic gold"] },
  { id: 54, name: "Jewel Metallic Two-Tone", price: "KSh10,800.00", category: "Women", images: ["jewel metallic two-tone"] },
  { id: 55, name: "Glamour Metallic Champagne", price: "KSh11,200.00", category: "Women", images: ["glamour metallic champagne"] },
  { id: 56, name: "Radiance Metallic White Gold", price: "KSh11,800.00", category: "Women", images: ["radiance metallic white gold"] },

  // Women - Canvas (61-66)
  { id: 61, name: "Casual Canvas Mint", price: "KSh6,200.00", category: "Women", images: ["casual canvas mint"] },
  { id: 62, name: "Summer Canvas Coral", price: "KSh6,500.00", category: "Women", images: ["summer canvas coral"] },
  { id: 63, name: "Fresh Canvas Sky Blue", price: "KSh6,300.00", category: "Women", images: ["fresh canvas sky blue"] },
  { id: 64, name: "Breeze Canvas Lavender", price: "KSh6,800.00", category: "Women", images: ["breeze canvas lavender"] },
  { id: 65, name: "Sunshine Canvas Yellow", price: "KSh6,200.00", category: "Women", images: ["sunshine canvas yellow"] },
  { id: 66, name: "Blossom Canvas Pink", price: "KSh6,600.00", category: "Women", images: ["blossom canvas pink"] },

  // Women - Ceramic (71-76)
  { id: 71, name: "Porcelain Ceramic White", price: "KSh13,500.00", category: "Women", images: ["porcelain ceramic white"] },
  { id: 72, name: "Eclipse Ceramic Black", price: "KSh14,200.00", category: "Women", images: ["eclipse ceramic black"] },
  { id: 73, name: "Pearl Ceramic Cream", price: "KSh13,800.00", category: "Women", images: ["pearl ceramic cream"] },
  { id: 74, name: "Moonstone Ceramic Silver", price: "KSh14,500.00", category: "Women", images: ["moonstone ceramic silver"] },
  { id: 75, name: "Rose Ceramic Pink", price: "KSh13,900.00", category: "Women", images: ["rose ceramic pink"] },
  { id: 76, name: "Sapphire Ceramic Blue", price: "KSh14,000.00", category: "Women", images: ["sapphire ceramic blue"] },

  // Bracelets (81-86)
  { id: 81, name: "Gold Chain Bracelet", price: "KSh4,500.00", category: "Jewelry", images: ["gold chain bracelet"] },
  { id: 82, name: "Silver Bangle Set", price: "KSh3,800.00", category: "Jewelry", images: ["silver bangle set"] },
  { id: 83, name: "Rose Gold Charm Bracelet", price: "KSh5,200.00", category: "Jewelry", images: ["rose gold charm bracelet"] },
  { id: 84, name: "Leather Wrap Bracelet", price: "KSh2,900.00", category: "Jewelry", images: ["leather wrap bracelet"] },
  { id: 85, name: "Diamond Tennis Bracelet", price: "KSh8,500.00", category: "Jewelry", images: ["diamond tennis bracelet"] },
  { id: 86, name: "Pearl Beaded Bracelet", price: "KSh3,500.00", category: "Jewelry", images: ["pearl beaded bracelet"] },

  // Earrings (91-96)
  { id: 91, name: "Diamond Stud Earrings", price: "KSh6,500.00", category: "Jewelry", images: ["diamond stud earrings"] },
  { id: 92, name: "Gold Hoop Earrings", price: "KSh4,200.00", category: "Jewelry", images: ["gold hoop earrings"] },
  { id: 93, name: "Pearl Drop Earrings", price: "KSh5,800.00", category: "Jewelry", images: ["pearl drop earrings"] },
  { id: 94, name: "Crystal Chandelier Earrings", price: "KSh7,500.00", category: "Jewelry", images: ["crystal chandelier earrings"] },
  { id: 95, name: "Silver Geometric Earrings", price: "KSh3,900.00", category: "Jewelry", images: ["silver geometric earrings"] },
  { id: 96, name: "Rose Gold Dangle Earrings", price: "KSh4,800.00", category: "Jewelry", images: ["rose gold dangle earrings"] },

  // Necklaces (101-106)
  { id: 101, name: "Gold Chain Necklace", price: "KSh7,500.00", category: "Jewelry", images: ["gold chain necklace"] },
  { id: 102, name: "Pearl Strand Necklace", price: "KSh8,200.00", category: "Jewelry", images: ["pearl strand necklace"] },
  { id: 103, name: "Diamond Pendant Necklace", price: "KSh12,500.00", category: "Jewelry", images: ["diamond pendant necklace"] },
  { id: 104, name: "Silver Choker Necklace", price: "KSh4,800.00", category: "Jewelry", images: ["silver choker necklace"] },
  { id: 105, name: "Rose Gold Locket Necklace", price: "KSh6,900.00", category: "Jewelry", images: ["rose gold locket necklace"] },
  { id: 106, name: "Crystal Statement Necklace", price: "KSh9,200.00", category: "Jewelry", images: ["crystal statement necklace"] },

  // Wallets (111-116)
  { id: 111, name: "Leather Bi-Fold Wallet", price: "KSh3,500.00", category: "Wallets", images: ["leather bifold wallet"] },
  { id: 112, name: "Slim Card Holder", price: "KSh2,200.00", category: "Wallets", images: ["slim card holder"] },
  { id: 113, name: "Executive Leather Wallet", price: "KSh4,800.00", category: "Wallets", images: ["executive leather wallet"] },
  { id: 114, name: "RFID Blocking Wallet", price: "KSh3,900.00", category: "Wallets", images: ["rfid blocking wallet"] },
  { id: 115, name: "Money Clip Wallet", price: "KSh2,800.00", category: "Wallets", images: ["money clip wallet"] },
  { id: 116, name: "Travel Document Wallet", price: "KSh5,200.00", category: "Wallets", images: ["travel document wallet"] },
]

export function getProductById(id: number) {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string) {
  return products.filter((p) => p.category?.toLowerCase() === category.toLowerCase())
}
