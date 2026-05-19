import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import CraftsmanshipStory from "@/components/home/CraftsmanshipStory";
import TrendingFurniture from "@/components/home/TrendingFurniture";
import { getSiteSettings } from "@/lib/getSettings";

export const dynamic = "force-dynamic";

export default async function Home() {
  const settings = await getSiteSettings();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturedCategories settings={settings} />
        <TrendingFurniture />
        <CraftsmanshipStory />
      </main>
      <Footer />
    </>
  );
}
