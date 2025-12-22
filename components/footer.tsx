import { Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-muted py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">Chesiro Collection</h3>
            <p className="text-sm text-muted-foreground">
              Premium executive watches and accessories for discerning individuals
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/men" className="text-muted-foreground hover:text-foreground transition-colors">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/women" className="text-muted-foreground hover:text-foreground transition-colors">
                  Women
                </Link>
              </li>
              <li>
                <Link href="/accessories/jewelry/bracelets" className="text-muted-foreground hover:text-foreground transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Free Country Delivery</li>
              <li>Same Day Delivery (Nairobi)</li>
              <li>1 Year Warranty</li>
              <li>Free Lifetime Battery Replacement</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>WhatsApp Us</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>info@chesiro.com</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Chesiro Collection. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
