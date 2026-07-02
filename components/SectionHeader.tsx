"use client";

import { motion } from "framer-motion";
import { IconChevronLeft } from "./icons";

export default function SectionHeader({
  title,
  subtitle,
  showAll = true,
  align = "start",
}: {
  title: string;
  subtitle?: string;
  showAll?: boolean;
  align?: "start" | "center";
}) {
  if (align === "center") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-8 text-center"
      >
        <h2 className="font-display text-2xl font-extrabold text-gold sm:text-3xl">
          {title}
        </h2>
        {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-6 flex items-start justify-between gap-4"
    >
      <div className="text-right">
        <h2 className="font-display text-xl font-extrabold text-foreground sm:text-2xl">
          {title}
        </h2>
        {subtitle && <p className="mt-1.5 text-sm text-muted">{subtitle}</p>}
      </div>
      {showAll && (
        <button className="mt-1 inline-flex shrink-0 items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-gold cursor-pointer">
          عرض الكل
          <IconChevronLeft className="h-4 w-4" />
        </button>
      )}
    </motion.div>
  );
}
