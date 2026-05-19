import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { getSiteSettings } from "@/lib/getSettings";

export default async function Footer() {
  const settings = await getSiteSettings();

  return (
    <footer className="bg-brand-dark text-brand-beige py-16 border-t border-brand-walnut/20">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Info */}
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="inline-block mb-6">
            <h2 className="font-serif text-3xl tracking-widest text-white uppercase">
              {settings.brandName.split(" ")[0]}<span className="text-brand-gold">.</span>
            </h2>
          </Link>
          <p className="text-sm leading-relaxed opacity-80 mb-6 font-light">
            {settings.seoDescription}
          </p>
          <div className="flex gap-4">
            <a href={settings.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-brand-gold transition-colors text-sm uppercase tracking-widest font-medium">
              IG
            </a>
            <a href={settings.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-brand-gold transition-colors text-sm uppercase tracking-widest font-medium">
              FB
            </a>
            <a href={settings.twitterUrl} target="_blank" rel="noreferrer" aria-label="Twitter" className="hover:text-brand-gold transition-colors text-sm uppercase tracking-widest font-medium">
              X
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-serif text-lg text-white mb-6 tracking-wide">Explore</h3>
          <ul className="space-y-4 text-sm font-light opacity-80">
            <li><Link href="/products" className="hover:text-brand-gold transition-colors">Collection</Link></li>
            <li><Link href="/inspiration" className="hover:text-brand-gold transition-colors">Inspiration Gallery</Link></li>
            <li><Link href="/about" className="hover:text-brand-gold transition-colors">Our Story</Link></li>
            <li><Link href="/blog" className="hover:text-brand-gold transition-colors">Design Journal</Link></li>
            <li><Link href="/book" className="hover:text-brand-gold transition-colors">Book Showroom</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-serif text-lg text-white mb-6 tracking-wide">Support</h3>
          <ul className="space-y-4 text-sm font-light opacity-80">
            <li><Link href="/faq" className="hover:text-brand-gold transition-colors">FAQs</Link></li>
            <li><Link href="/contact" className="hover:text-brand-gold transition-colors">Contact Us</Link></li>
            <li><Link href="/shipping" className="hover:text-brand-gold transition-colors">Shipping Policy</Link></li>
            <li><Link href="/returns" className="hover:text-brand-gold transition-colors">Return Policy</Link></li>
            <li><Link href="/privacy" className="hover:text-brand-gold transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-serif text-lg text-white mb-6 tracking-wide">Get in Touch</h3>
          <ul className="space-y-4 text-sm font-light opacity-80">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 shrink-0 text-brand-gold mt-0.5" />
              <span>{settings.storeAddress}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 shrink-0 text-brand-gold" />
              <span>{settings.whatsappNumber}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 shrink-0 text-brand-gold" />
              <span>{settings.contactEmail}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 mt-16 pt-8 border-t border-white/10 text-center text-xs font-light opacity-60 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} {settings.footerCopyright || `${settings.brandName || "Luxe Furnishings"}. All rights reserved.`}</p>
        <p>{settings.footerTagline || "Crafted for Premium Lifestyles."}</p>
      </div>
    </footer>
  );
}
