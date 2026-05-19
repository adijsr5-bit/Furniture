import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck, Truck, Clock } from "lucide-react";
import ProductImageSlider from "@/components/products/ProductImageSlider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/products`, { cache: 'no-store' });
  const data = await res.json();
  const products = data.data || [];

  const resolvedParams = await params;
  const product = products.find((p: any) => p.slug === resolvedParams.slug);
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream">
        <h1 className="text-2xl font-serif">Product Not Found</h1>
      </div>
    );
  }

  // Related products (same category, or just random)
  const relatedProducts = products
    .filter((p: any) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 bg-brand-cream min-h-screen">
        <div className="container mx-auto px-6 lg:px-12">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-brand-dark/60 hover:text-brand-dark mb-12 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Collection
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
            {/* Image Gallery */}
            <ProductImageSlider images={product.images || []} productName={product.name} />

            {/* Product Info */}
            <div className="flex flex-col">
              <span className="text-sm uppercase tracking-widest text-brand-dark/50 mb-4 block">
                <Link href={`/categories/${product.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-brand-gold">{product.category}</Link>
              </span>
              <h1 className="font-serif text-4xl md:text-5xl text-brand-dark mb-6">{product.name}</h1>
              <p className="text-2xl font-light text-brand-dark mb-8">{product.price}</p>
              
              <p className="text-brand-dark/80 leading-relaxed mb-12 font-light text-lg">
                {product.description}
              </p>

              <div className="space-y-8 mb-12 border-y border-brand-dark/10 py-8">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-brand-dark mb-2 font-medium">Materials</h4>
                  <p className="text-brand-dark/70 font-light text-sm">{product.material}</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-brand-dark mb-2 font-medium">Dimensions</h4>
                  <p className="text-brand-dark/70 font-light text-sm">{product.dimensions}</p>
                </div>
                {product.finishOptions && product.finishOptions.length > 0 && (
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-brand-dark mb-3 font-medium">Available Finishes</h4>
                    <div className="flex flex-wrap gap-3">
                      {product.finishOptions.map((finish: string, idx: number) => (
                        <span key={idx} className="px-4 py-2 border border-brand-dark/20 text-xs text-brand-dark/70 rounded-full">{finish}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* CTAs */}
              <div className="space-y-4 mb-12 mt-auto">
                <Link href={`/book?product=${encodeURIComponent(product.name)}`} className="block w-full text-center bg-brand-dark text-white py-5 uppercase tracking-widest text-sm hover:bg-brand-gold transition-colors">
                  Inquire & Book Showroom Visit
                </Link>
                <a href={`https://wa.me/1800123LUXE?text=I am interested in ${product.name}`} target="_blank" rel="noreferrer" className="block w-full text-center border border-brand-dark text-brand-dark py-5 uppercase tracking-widest text-sm hover:bg-brand-dark hover:text-white transition-colors">
                  Consult via WhatsApp
                </a>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 md:gap-6 pt-8 border-t border-brand-dark/10">
                <div className="flex flex-col items-center text-center gap-2 md:gap-3">
                  <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-brand-gold" />
                  <span className="text-[10px] md:text-xs uppercase tracking-widest text-brand-dark">White Glove<br/>Delivery</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2 md:gap-3">
                  <Truck className="w-5 h-5 md:w-6 md:h-6 text-brand-gold" />
                  <span className="text-[10px] md:text-xs uppercase tracking-widest text-brand-dark">Global<br/>Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2 md:gap-3">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-brand-gold" />
                  <span className="text-[10px] md:text-xs uppercase tracking-widest text-brand-dark">Lifetime<br/>Warranty</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="pt-24 border-t border-brand-dark/10">
              <div className="flex justify-between items-end mb-12">
                <h2 className="font-serif text-3xl text-brand-dark">You May Also Like</h2>
                <Link href="/products" className="group flex items-center gap-2 text-xs uppercase tracking-widest text-brand-dark font-medium hover:text-brand-gold transition-colors">
                  Explore Catalog <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((p: any) => (
                  <Link key={p._id} href={`/products/${p.slug}`} className="group block">
                    <div className="relative h-[250px] md:h-[300px] mb-4 bg-white overflow-hidden">
                      <Image 
                        src={p.images?.[0] || "/placeholder.jpg"} 
                        alt={p.name} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <span className="text-xs text-brand-dark/50 uppercase tracking-widest mb-1 block">{p.category}</span>
                    <h3 className="font-serif text-lg text-brand-dark group-hover:text-brand-gold transition-colors">{p.name}</h3>
                    <p className="text-brand-dark/80 font-light">{p.price}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
