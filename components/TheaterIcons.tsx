import SectionHeader from "./SectionHeader";
import { IconEye, IconPlay } from "./icons";
import type { VideoCard } from "@/lib/types";

function VideoThumb({ tone, index }: { tone: VideoCard["tone"]; index: number }) {
  // Placeholder art standing in for real thumbnails until the API is wired up.
  const palettes = [
    "linear-gradient(160deg,#2a2118,#0e0d0c)",
    "linear-gradient(160deg,#20242c,#0b0c0f)",
    "linear-gradient(160deg,#241a1c,#0d0b0c)",
    "linear-gradient(160deg,#1c2320,#0b0d0c)",
  ];
  return (
    <div
      className="relative aspect-video w-full overflow-hidden rounded-xl"
      style={{ background: palettes[index % palettes.length] }}
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 70% 20%, rgba(240,185,64,0.14), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 grid place-items-center">
        <span
          className={`grid size-11 place-items-center rounded-full backdrop-blur-sm transition-transform group-hover:scale-105 ${
            tone === "gold"
              ? "bg-gold text-[#1a1206]"
              : "bg-black/40 text-white ring-1 ring-white/25"
          }`}
        >
          <IconPlay className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}

export default function TheaterIcons({ items }: { items: VideoCard[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader
        title="أيقونات المسرح"
        subtitle="أبرز الأعمال المسرحية التي شكلت وجدان المشاهد الكويتي"
      />

      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {items.map((item, i) => (
          <article key={item.id} className="group cursor-pointer">
            <div className="relative">
              <VideoThumb tone={item.tone} index={i} />
              <span className="absolute bottom-2 left-2 rounded-md bg-black/70 px-1.5 py-0.5 font-display text-[11px] font-bold text-white">
                {item.duration}
              </span>
            </div>
            <h3 className="mt-3 line-clamp-1 text-right text-[15px] font-bold text-foreground transition-colors group-hover:text-gold-soft">
              {item.title}
            </h3>
            <div className="mt-1.5 flex items-center justify-end gap-3 text-xs text-muted-2">
              <span className="inline-flex items-center gap-1">
                {item.views}
                <IconEye className="h-3.5 w-3.5" />
              </span>
              <span>{item.timeAgo}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
