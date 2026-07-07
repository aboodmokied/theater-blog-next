"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { IconMasks, IconPlay } from "./icons";
import type { VisionTile } from "@/lib/types";

function TheatricalVisionsSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader title="رؤى مسرحية" align="center" />
      <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:col-span-1 lg:grid-cols-1 lg:gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] animate-pulse rounded-2xl bg-white/5 lg:aspect-auto lg:min-h-[150px]" />
          ))}
        </div>
        <div className="col-span-1 aspect-[16/10] animate-pulse rounded-2xl bg-white/5 lg:col-span-2 lg:min-h-[320px]" />
      </div>
    </section>
  );
}

export default function TheatricalVisions({ tiles, loading }: { tiles: VisionTile[]; loading?: boolean }) {
  if (loading) return <TheatricalVisionsSkeleton />;
  if (!tiles.length) return null;

  const small = tiles.filter((t) => t.size === "small");
  const large = tiles.find((t) => t.size === "large");

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader title="رؤى مسرحية" align="center" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-6"
      >
        {/* Two stacked small tiles */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:col-span-1 lg:grid-cols-1 lg:gap-6">
          {small.map((tile, i) => (
            <motion.article
              key={tile.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl lg:aspect-auto lg:h-full lg:min-h-[150px]"
              style={{
                background:
                  i === 0
                    ? "linear-gradient(200deg,#151515,#050506)"
                    : "linear-gradient(200deg,#231b17,#0a0908)",
              }}
            >
              {i === 0 ? (
                <div
                  className="absolute inset-0 opacity-90"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 15%, rgba(240,185,64,0.5), transparent 35%)",
                  }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <IconMasks className="h-16 w-16 text-gold" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent transition-opacity group-hover:from-black/90" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-right">
                <h3 className="text-sm font-bold text-foreground">{tile.title}</h3>
                <p className="mt-1 line-clamp-1 text-xs text-muted">
                  {tile.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Large featured tile */}
        {large && (
          <motion.article
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="group relative col-span-1 aspect-[16/10] cursor-pointer overflow-hidden rounded-2xl lg:col-span-2 lg:aspect-auto lg:min-h-[320px]"
            style={{
              background:
                "linear-gradient(160deg,#1d1e22 0%,#101114 55%,#08090a 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-80"
              style={{
                background:
                  "radial-gradient(ellipse 50% 60% at 70% 30%, rgba(240,185,64,0.12), transparent 60%)",
              }}
            />
            {/* faux control-room grid, echoing "behind the scenes" monitors */}
            <div className="absolute right-6 top-6 hidden grid-cols-3 gap-1.5 sm:grid">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-8 w-11 rounded-sm border border-white/10 bg-white/5"
                />
              ))}
            </div>

            {large.badge && (
              <span className="absolute right-5 top-5 rounded-full bg-gold px-3 py-1 text-xs font-bold text-[#1a1206]">
                {large.badge}
              </span>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-right">
              <div>
                <h3 className="text-lg font-bold text-foreground sm:text-xl">
                  {large.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-muted">
                  {large.description}
                </p>
                {large.cta && (
                  <button className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-gold-soft transition-colors hover:text-gold cursor-pointer">
                    {large.cta}
                    <IconPlay className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </motion.article>
        )}
      </motion.div>
    </section>
  );
}
