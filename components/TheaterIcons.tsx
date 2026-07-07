"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { IconEye, IconPlay } from "./icons";
import type { Post } from "@/lib/types";

function dummyThumbUrl(seed: number | string): string {
  return `https://picsum.photos/seed/${seed}/640/360`;
}

function VideoThumb({ item, index }: { item: Post; index: number }) {
  const thumbnail = item.media?.find((m) => m.type === "image" || m.type === "thumbnail");
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl">
      <img
        src={thumbnail ? thumbnail.url : dummyThumbUrl(item.id)}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
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
            item.tone && item.tone === "gold"
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

function TheaterIconsSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader
        title="أيقونات المسرح"
        subtitle="أبرز الأعمال المسرحية التي شكلت وجدان المشاهد الكويتي"
      />
      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-video w-full animate-pulse rounded-xl bg-white/5" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
            <div className="flex gap-3">
              <div className="h-3 w-16 animate-pulse rounded bg-white/5" />
              <div className="h-3 w-12 animate-pulse rounded bg-white/5" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function TheaterIcons({ items, loading }: { items: Post[]; loading?: boolean }) {
  if (loading) return <TheaterIconsSkeleton />;
  if (!items.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader
        title="أيقونات المسرح"
        subtitle="أبرز الأعمال المسرحية التي شكلت وجدان المشاهد الكويتي"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
        className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
      >
        {items.map((item, i) => (
          <motion.article
            key={item.id}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="group cursor-pointer"
          >
            <div className="relative">
              <VideoThumb item={item} index={i} />
              <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-1.5 py-0.5 font-display text-[11px] font-bold text-white">
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
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
