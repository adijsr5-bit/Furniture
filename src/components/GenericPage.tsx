import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GenericPage({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 bg-brand-cream min-h-screen">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <div className="fade-in">
            <h1 className="font-serif text-4xl md:text-5xl mb-12 text-brand-dark border-b border-brand-dark/10 pb-8">{title}</h1>
            <div className="prose prose-lg prose-headings:font-serif prose-p:font-light prose-p:text-brand-dark/80 max-w-none">
              {children}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
