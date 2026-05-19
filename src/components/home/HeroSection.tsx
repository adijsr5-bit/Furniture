"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop"
          alt="Luxury Living Room"
          fill
          priority
          className="object-cover brightness-75 scale-105"
          style={{ objectPosition: "center 60%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center text-white mt-12 md:mt-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="block text-sm md:text-base uppercase tracking-[0.3em] mb-6 font-light"
        >
          Elevate Your Space
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight drop-shadow-lg"
        >
          The Art of <br className="hidden md:block" />
          <span className="italic font-light">Fine Living.</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl mx-auto text-lg md:text-xl font-light mb-12 opacity-90 drop-shadow-md"
        >
          Discover curated collections of timeless furniture, crafted with uncompromising quality for the modern luxury home.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            href="/products"
            className="bg-white text-brand-dark px-10 py-4 uppercase tracking-widest text-sm hover:bg-brand-gold hover:text-white transition-all duration-500 w-full sm:w-auto"
          >
            Explore Collection
          </Link>
          <Link
            href="/book"
            className="border border-white text-white px-10 py-4 uppercase tracking-widest text-sm hover:bg-white hover:text-brand-dark transition-all duration-500 w-full sm:w-auto backdrop-blur-sm"
          >
            Book Showroom Visit
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-10"
      >
        <span className="text-white/70 text-xs uppercase tracking-[0.2em] font-light">Scroll</span>
        <div className="w-px h-12 bg-white/30 relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-full bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
}
