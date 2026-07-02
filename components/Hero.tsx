"use client";

import { motion } from "framer-motion";
import { IconPlay } from "./icons";
import type { FeaturedStory } from "@/lib/types";

export default function Hero({ story }: { story: FeaturedStory }) {
  return (
    <section className="relative overflow-hidden">
      {/* Backdrop: stand-in for a portrait photo, lit like a stage */}
      <div className="relative h-[560px] w-full sm:h-[620px] lg:h-[680px]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 90% at 32% 30%, rgba(240,185,64,0.14), transparent 60%), linear-gradient(135deg, #1b1710 0%, #100e0c 45%, #050506 100%)",
          }}
        />
        {/* faux stage-light beam, echoes the "philosophy of lighting" motif */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "conic-gradient(from 200deg at 30% 0%, transparent 0deg, rgba(240,185,64,0.10) 18deg, transparent 40deg)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-background/10 via-transparent to-background/60" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-4 pb-14 sm:px-6 lg:items-center lg:justify-end lg:px-8 lg:pb-0">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="max-w-xl text-right"
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-3 font-display text-sm font-bold tracking-wide text-gold"
            >
              {story.eyebrow}
            </motion.p>
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-balance font-display text-3xl font-extrabold leading-tight text-foreground sm:text-4xl lg:text-[2.75rem]"
            >
              {story.titleLine1}
              <br />
              <span className="text-gold-soft">{story.titleLine2}</span>
            </motion.h1>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="mt-5 text-balance text-[15px] leading-8 text-muted"
            >
              {story.description}
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              className="mt-8 flex items-center justify-end gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-lg border border-surface-border bg-transparent px-6 py-3 text-sm font-bold text-foreground transition-colors hover:border-gold-dim hover:bg-surface cursor-pointer"
              >
                {story.primaryCta}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-bold text-[#1a1206] transition-colors hover:bg-gold-soft cursor-pointer"
              >
                <IconPlay className="h-4 w-4" />
                {story.secondaryCta}
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
