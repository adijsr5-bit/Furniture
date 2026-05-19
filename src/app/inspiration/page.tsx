import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import connectDB from "@/lib/db";
import InspirationImage from "@/models/InspirationImage";

export const dynamic = "force-dynamic";

async function getInspirationImages() {
  await connectDB();
  let images = await InspirationImage.find({}).sort({ createdAt: -1 });
  
  if (images.length === 0) {
    const defaultImages = [
      { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop", caption: "Timeless Minimalist Living Lounge" },
      { url: "https://images.unsplash.com/photo-1618220179428-22790b46a0eb?q=80&w=2070&auto=format&fit=crop", caption: "Warm Japandi Bedroom Curation" },
      { url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop", caption: "Modern Oak Dining Setup" },
      { url: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=1974&auto=format&fit=crop", caption: "Sleek Contemporary Kitchen" },
      { url: "https://images.unsplash.com/photo-1601366533287-5ee4c763ae4e?q=80&w=2069&auto=format&fit=crop", caption: "Aesthetic Hallway & Accent Armchair" },
      { url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2064&auto=format&fit=crop", caption: "Artisanal Living Room Corner" }
    ];
    images = await InspirationImage.create(defaultImages);
  }
  
  return JSON.parse(JSON.stringify(images));
}

export default async function InspirationPage() {
  const images = await getInspirationImages();

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 bg-brand-cream min-h-screen">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl fade-in">
            <h1 className="font-serif text-5xl mb-6 text-brand-dark">Inspiration Gallery</h1>
            <p className="text-brand-dark/70 font-light text-lg mb-12">
              Discover curated spaces and visionary interior designs featuring our exclusive collections.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img: any, i: number) => (
              <div key={img._id} className="h-80 relative overflow-hidden group cursor-pointer bg-brand-dark/10">
                <img 
                  src={img.url} 
                  alt={img.caption || `Curated Space ${i + 1}`} 
                  className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/30 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent">
                  <span className="text-brand-gold text-[10px] uppercase tracking-widest font-semibold mb-1">Interior Space</span>
                  <h3 className="text-white font-serif text-lg leading-tight mb-4">{img.caption || "Bespoke Design"}</h3>
                  <div>
                    <span className="text-white uppercase tracking-widest text-xs bg-brand-gold/80 px-4 py-2 border border-brand-gold hover:bg-brand-gold transition-colors inline-block">
                      View Space
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
