import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookForm from "@/components/book/BookForm";

export default function BookShowroom() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 bg-brand-cream">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto bg-white p-8 md:p-16 shadow-2xl">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl text-brand-dark mb-4 text-center">
                Book a Showroom Visit
              </h1>
              <p className="text-brand-dark/70 font-light text-center mb-12">
                Experience our curated collections in person. Schedule a personalized consultation with our design experts.
              </p>
              <BookForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
