"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="border-t border-surface-border/70 py-10"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:text-right sm:px-6 lg:px-8">
        <p className="font-display text-base font-extrabold text-foreground">
          مجلس <span className="text-gold">ديجيتال</span>
        </p>
        <p className="text-sm text-muted-2">
          © {new Date().getFullYear()} مجلس ديجيتال. جميع الحقوق محفوظة.
        </p>
      </div>
    </motion.footer>
  );
}
