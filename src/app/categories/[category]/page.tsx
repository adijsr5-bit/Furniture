import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/products`, { cache: 'no-store' });
  const data = await res.json();
  const allProducts = data.data || [];

  const resolvedParams = await params;
  // Match category by replacing hyphens and checking case-insensitively
  const categoryName = resolvedParams.category.replace(/-/g, " ");
  const products = allProducts.filter((p: any) => p.category.toLowerCase() === categoryName.toLowerCase());

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 bg-brand-cream min-h-screen">
        <div className="container mx-auto px-6 lg:px-12">
          <h1 className="font-serif text-4xl md:text-5xl text-brand-dark mb-4 capitalize">
            {categoryName}
          </h1>
          <p className="text-brand-dark/60 mb-12 uppercase tracking-widest text-sm">
            {products.length} {products.length === 1 ? 'Product' : 'Products'} Available
          </p>

          {products.length === 0 ? (
            <div className="py-24 text-center border-t border-brand-dark/10">
              <h2 className="text-2xl font-serif text-brand-dark mb-4">No Products Found</h2>
              <p className="text-brand-dark/60 mb-8">We couldn't find any items in this category at the moment.</p>
              <Link href="/products" className="inline-block border border-brand-dark px-8 py-3 uppercase tracking-widest text-sm hover:bg-brand-dark hover:text-white transition-colors">
                View Entire Collection
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {products.map((p: any) => (
                <Link key={p._id} href={`/products/${p.slug}`} className="group block">
                  <div className="relative h-[280px] md:h-[400px] mb-6 bg-white overflow-hidden">
                    <Image 
                      src={p.images?.[0] || "/placeholder.jpg"} 
                      alt={p.name} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <span className="text-xs text-brand-dark/50 uppercase tracking-widest mb-2 block">{p.category}</span>
                  <h3 className="font-serif text-xl text-brand-dark group-hover:text-brand-gold transition-colors">{p.name}</h3>
                  <p className="text-brand-dark/80 mt-1 font-light">{p.price}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
