"use client";

import Navbar from "@/components/Navbar";
import TheatreSplash from "@/components/TheatreSplash";
import Hero from "@/components/Hero";
import TheaterIcons from "@/components/TheaterIcons";
import LegacyVision from "@/components/LegacyVision";
import TheatricalVisions from "@/components/TheatricalVisions";
import Footer from "@/components/Footer";
import {
  useFeaturedStory,
  useVideoPosts,
  useVisionFeatures,
  useVisionTiles,
} from "@/hooks/useDataFetching";

export default function Home() {
  const { data: featuredStory, loading: heroLoading } = useFeaturedStory();
  const { data: videoPosts, loading: videosLoading } = useVideoPosts();
  const { data: visionFeatures, loading: featuresLoading } = useVisionFeatures();
  const { data: visionTiles, loading: tilesLoading } = useVisionTiles();

  return (
    <TheatreSplash minDurationMs={1500}>
      <Navbar />
      <main className="flex-1">
        <Hero story={featuredStory} loading={heroLoading} />
        <TheaterIcons items={videoPosts} loading={videosLoading} />
        <LegacyVision features={visionFeatures} loading={featuresLoading} />
        <TheatricalVisions tiles={visionTiles} loading={tilesLoading} />
      </main>
      <Footer />
    </TheatreSplash>
  );
}
