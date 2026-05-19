import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 bg-brand-cream min-h-screen">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center fade-in">
            <span className="text-brand-gold text-sm uppercase tracking-widest font-medium mb-4 block">Our Heritage</span>
            <h1 className="font-serif text-5xl mb-8 text-brand-dark">A Legacy of Design</h1>
            <div className="space-y-6 text-brand-dark/80 font-light text-lg leading-relaxed">
              <p>Luxe Furnishings was founded on a simple principle: that the spaces we inhabit should elevate our daily lives. For over a decade, we have traveled the globe to source the finest materials, partnering with master artisans who share our uncompromising commitment to quality.</p>
              <p>Every piece in our collection represents a dialogue between timeless tradition and contemporary aesthetics, designed not just to occupy space, but to transform it.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
