import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TheaterIcons from "@/components/TheaterIcons";
import LegacyVision from "@/components/LegacyVision";
import TheatricalVisions from "@/components/TheatricalVisions";
import Footer from "@/components/Footer";
import {
  featuredStory,
  theaterIcons,
  visionFeatures,
  visionTiles,
} from "@/lib/data";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero story={featuredStory} />
        <TheaterIcons items={theaterIcons} />
        <LegacyVision features={visionFeatures} />
        <TheatricalVisions tiles={visionTiles} />
      </main>
      <Footer />
    </>
  );
}
