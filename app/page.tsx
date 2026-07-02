"use client";

import Navbar from "@/components/Navbar";
import TheatreSplash from "@/components/TheatreSplash";
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
import { useState } from "react";

export default function Home() {
  const [ready] = useState(true);
  return (
    <TheatreSplash
      ready={ready}
      minDurationMs={3200}
      onComplete={() => console.log("Curtains up.")}
    >
      <Navbar />
      <main className="flex-1">
        <Hero story={featuredStory} />
        <TheaterIcons items={theaterIcons} />
        <LegacyVision features={visionFeatures} />
        <TheatricalVisions tiles={visionTiles} />
      </main>
      <Footer />
    </TheatreSplash>
  );
}
