"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, Search, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ brandName = "Luxe" }: { brandName?: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collection", href: "/products" },
    { name: "Inspiration", href: "/inspiration" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const shortName = brandName.split(" ")[0];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? "glass py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 z-50">
            <h1 className="font-serif text-2xl tracking-widest text-brand-dark uppercase">
              {shortName}<span className="text-brand-gold">.</span>
            </h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm uppercase tracking-widest hover:text-brand-gold transition-colors font-medium text-brand-dark"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons & CTA */}
          <div className="hidden md:flex items-center gap-6">
            <button aria-label="Search" className="hover:text-brand-gold transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/book"
              className="border border-brand-dark text-brand-dark px-6 py-2 uppercase tracking-widest text-xs hover:bg-brand-dark hover:text-white transition-all duration-300"
            >
              Book Showroom
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden z-50 text-brand-dark"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-brand-cream pt-32 px-6 flex flex-col"
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-3xl text-brand-dark hover:text-brand-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-8 pt-8 border-t border-brand-walnut/20 flex flex-col items-center gap-4">
                <Link
                  href="/book"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-brand-dark text-white px-8 py-4 uppercase tracking-widest text-sm w-full"
                >
                  Book Showroom Visit
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
