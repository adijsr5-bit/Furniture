"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function CraftsmanshipStory() {
  return (
    <section className="py-24 bg-brand-dark text-brand-beige overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-brand-gold text-sm uppercase tracking-widest font-medium mb-6 block">The Legacy</span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight text-white">
                Uncompromising <br />
                <span className="italic font-light opacity-90">Craftsmanship.</span>
              </h2>
              <div className="space-y-6 text-brand-beige/80 font-light text-lg mb-10">
                <p>
                  Every piece in our collection is a testament to the art of fine furniture making. We source only the most exceptional materials from around the globe, ensuring that true luxury is felt in every detail.
                </p>
                <p>
                  Our master artisans blend time-honored techniques with contemporary design sensibilities, resulting in furniture that transcends trends and becomes cherished heirlooms.
                </p>
              </div>
              <Link
                href="/about"
                className="inline-block border border-brand-gold text-brand-gold px-10 py-4 uppercase tracking-widest text-sm hover:bg-brand-gold hover:text-brand-dark transition-all duration-500"
              >
                Discover Our Story
              </Link>
            </motion.div>
          </div>

          {/* Image Content */}
          <div className="w-full lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="relative h-[350px] sm:h-[450px] md:h-[600px] w-full"
            >
              <Image
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2064&auto=format&fit=crop"
                alt="Furniture Craftsmanship"
                fill
                className="object-cover"
              />
              
              {/* Floating Element */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:left-[-2.5rem] md:translate-x-0 md:-bottom-10 md:w-80 bg-brand-cream text-brand-dark p-6 md:p-8 shadow-2xl"
              >
                <p className="font-serif text-xl md:text-2xl mb-2">"True luxury is in the unseen details."</p>
                <p className="text-[10px] md:text-xs uppercase tracking-widest font-medium text-brand-gold">Head Designer</p>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
