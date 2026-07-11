"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IconPlay, IconArchive, IconMasks, IconEye } from "./icons";

const NAV_LINKS = [
  { label: "السيرة", href: "#hero", key: "hero", icon: "eye" },
  { label: "الفيديوهات", href: "#videos", key: "videos", icon: "play" },
  { label: "الأرشيف", href: "#archive", key: "archive", icon: "archive" },
  { label: "العروض", href: "#visions", key: "visions", icon: "masks" },
];

function NavIcon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case "play": return <IconPlay className={className} />;
    case "archive": return <IconArchive className={className} />;
    case "masks": return <IconMasks className={className} />;
    default: return <IconEye className={className} />;
  }
}

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    const sections = NAV_LINKS.map((l) => document.getElementById(l.key)).filter(Boolean);
    sections.forEach((s) => s && observer.observe(s));

    return () => {
      sections.forEach((s) => s && observer.unobserve(s));
    };
  }, []);

  const scrollTo = (key: string) => {
    setActive(key);
    const el = document.getElementById(key);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-surface-border/80 bg-background/85 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => scrollTo("hero")}
          className="font-display text-lg font-extrabold tracking-tight text-foreground shrink-0 cursor-pointer"
        >
          محمد <span className="text-gold">غلوم</span>
        </button>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-surface-border bg-surface/60 px-1.5 py-1.5">
          {NAV_LINKS.map((link) => (
            <button
              key={link.key}
              onClick={() => scrollTo(link.key)}
              className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                active === link.key
                  ? "bg-gold text-[#1a1206]"
                  : "text-muted hover:text-foreground"
              }`}
            >
              <NavIcon name={link.icon} className="h-4 w-4" />
              {link.label}
            </button>
          ))}
        </nav>

      </div>
    </motion.header>
  );
}
