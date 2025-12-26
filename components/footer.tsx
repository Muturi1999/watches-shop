import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">City Watches</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Premium executive watches for both men and women. Your destination for luxury timepieces from around the world.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-primary flex items-center justify-center transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-primary flex items-center justify-center transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-primary flex items-center justify-center transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/shop" className="text-slate-300 hover:text-primary transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/men/leather" className="text-slate-300 hover:text-primary transition-colors">
                  Men's Watches
                </Link>
              </li>
              <li>
                <Link href="/women/leather" className="text-slate-300 hover:text-primary transition-colors">
                  Women's Watches
                </Link>
              </li>
              <li>
                <Link href="/accessories/jewelry/bracelets" className="text-slate-300 hover:text-primary transition-colors">
                  Jewelry
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Customer Service</h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>✓ Free Country Delivery (3+ Orders)</li>
              <li>✓ Same Day Delivery (Nairobi)</li>
              <li>✓ 1 Year Warranty</li>
              <li>✓ Free Lifetime Battery Replacement</li>
              <li>✓ Original Watches Guaranteed</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-slate-300">
                <Phone className="h-5 w-5 text-white font-bold mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white">Phone/WhatsApp</div>
                  <div>0728160293</div>
                </div>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <Mail className="h-5 w-5 text-white font-bold mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white">Email</div>
                  <div>info@citywatches.com</div>
                </div>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <MapPin className="h-5 w-5 text-white font-bold mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white">Location</div>
                  <div>Nairobi, Kenya</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            &copy; 2025 City Watches. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="hover:text-primary transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/shipping-returns" className="hover:text-primary transition-colors">
              Shipping & Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
