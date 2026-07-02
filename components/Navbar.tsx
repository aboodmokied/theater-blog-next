"use client";

import { useState } from "react";
import { IconBell, IconSearch, IconSettings } from "./icons";

const NAV_LINKS = [
  { label: "لوحة التحكم", href: "#", key: "dashboard" },
  { label: "الأرشيف", href: "#", key: "archive" },
  { label: "المجلس", href: "#", key: "majlis" },
  { label: "السلاسل", href: "#", key: "series" },
  { label: "القصص", href: "#", key: "stories" },
];

export default function Navbar() {
  const [active, setActive] = useState("majlis");

  return (
    <header className="sticky top-0 z-50 border-b border-surface-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Right cluster in RTL visual order: brand */}
        <a
          href="#"
          className="font-display text-lg font-extrabold tracking-tight text-foreground shrink-0"
        >
          مجلس <span className="text-gold">ديجيتال</span>
        </a>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-surface-border bg-surface/60 px-1.5 py-1.5">
          {NAV_LINKS.map((link) => (
            <button
              key={link.key}
              onClick={() => setActive(link.key)}
              className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
                active === link.key
                  ? "bg-gold text-[#1a1206]"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Left cluster: search + actions */}
        <div className="flex items-center gap-3">
          <label className="relative hidden sm:block">
            <IconSearch className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted-2" />
            <input
              type="search"
              placeholder="بحث..."
              className="w-36 lg:w-52 rounded-full border border-surface-border bg-surface/60 py-2 pr-9 pl-3 text-sm text-foreground placeholder:text-muted-2 outline-none transition-colors focus:border-gold-dim focus:bg-surface"
            />
          </label>

          <button className="hidden sm:inline-flex items-center rounded-full bg-gold px-4 py-2 text-sm font-bold text-[#1a1206] transition-colors hover:bg-gold-soft cursor-pointer">
            إنشاء قصة
          </button>

          <button
            aria-label="الإشعارات"
            className="grid size-9 place-items-center rounded-full border border-surface-border text-muted transition-colors hover:text-foreground cursor-pointer"
          >
            <IconBell className="h-4.5 w-4.5" />
          </button>
          <button
            aria-label="الإعدادات"
            className="hidden sm:grid size-9 place-items-center rounded-full border border-surface-border text-muted transition-colors hover:text-foreground cursor-pointer"
          >
            <IconSettings className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
