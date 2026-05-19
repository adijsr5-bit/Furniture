import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import connectDB from "@/lib/db";
import AboutSection from "@/models/AboutSection";

export const dynamic = "force-dynamic";

async function getAboutSections() {
  await connectDB();
  let sections = await AboutSection.find({}).sort({ order: 1 });
  
  if (sections.length === 0) {
    const defaultSections = [
      {
        label: "Our Heritage",
        title: "A Legacy of Design",
        content: "Luxe Furnishings was founded on a simple principle: that the spaces we inhabit should elevate our daily lives. For over a decade, we have traveled the globe to source the finest materials, partnering with master artisans who share our uncompromising commitment to quality.",
        order: 1
      },
      {
        label: "The Vision",
        title: "Elevating Lifestyles",
        content: "Every piece in our collection represents a dialogue between timeless tradition and contemporary aesthetics, designed not just to occupy space, but to transform it.",
        order: 2
      }
    ];
    sections = await AboutSection.create(defaultSections);
  }
  
  return JSON.parse(JSON.stringify(sections));
}

export default async function AboutPage() {
  const sections = await getAboutSections();

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 bg-brand-cream min-h-screen">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto space-y-16">
            {sections.map((section: any, index: number) => (
              <div key={section._id} className="text-center fade-in" style={{ animationDelay: `${index * 0.15}s` }}>
                <span className="text-brand-gold text-sm uppercase tracking-widest font-medium mb-4 block">
                  {section.label}
                </span>
                <h2 className="font-serif text-4xl md:text-5xl mb-6 text-brand-dark leading-tight">
                  {section.title}
                </h2>
                <div className="space-y-6 text-brand-dark/80 font-light text-lg leading-relaxed max-w-2xl mx-auto">
                  <p className="whitespace-pre-wrap">{section.content}</p>
                </div>
                {index < sections.length - 1 && (
                  <div className="w-12 h-px bg-brand-gold/30 mx-auto mt-16"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
