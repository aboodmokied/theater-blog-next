"use client";

import { motion } from "framer-motion";
import { IconAcademy, IconArchive } from "./icons";
import type { VisionFeature } from "@/lib/types";

const ICONS = {
  archive: IconArchive,
  academy: IconAcademy,
};

export default function LegacyVision({ features }: { features: VisionFeature[] }) {
  return (
    <section className="border-t border-surface-border/70 bg-surface/30">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Portrait — placeholder standing in for the archival photo */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative order-2 overflow-hidden rounded-2xl lg:order-1"
        >
          <div
            className="aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-[380px]"
            style={{
              background:
                "linear-gradient(200deg,#241d14 0%,#171310 45%,#0a0a0b 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 55% 70% at 25% 25%, rgba(240,185,64,0.16), transparent 65%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-gold-soft backdrop-blur-sm"
          >
            من الأرشيف الشخصي
          </motion.span>
        </motion.div>

        {/* Copy */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="order-1 flex flex-col justify-center text-right lg:order-2"
        >
          <h2 className="font-display text-2xl font-extrabold text-foreground sm:text-3xl">
            الإرث والرؤية
          </h2>

          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="mt-8 space-y-6"
          >
            {features.map((feature) => {
              const Icon = ICONS[feature.icon];
              return (
                <motion.div
                  key={feature.id}
                  variants={{
                    hidden: { opacity: 0, x: 30 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  whileHover={{ scale: 1.02, borderColor: "var(--gold-dim)" }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex items-start gap-4 rounded-xl border border-surface-border bg-surface/60 p-5 transition-colors hover:border-gold-dim"
                >
                  <div className="order-2 flex-1">
                    <h3 className="text-base font-bold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-muted">
                      {feature.description}
                    </p>
                  </div>
                  <span className="order-1 grid size-11 shrink-0 place-items-center rounded-lg bg-gold/15 text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
