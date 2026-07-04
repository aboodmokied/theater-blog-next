"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { IconPlay } from "./icons";
import type { FeaturedStory } from "@/lib/types";

export default function Hero({ story }: { story: FeaturedStory }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 80,
    damping: 20,
  });

  const springY = useSpring(mouseY, {
    stiffness: 80,
    damping: 20,
  });

  // تم عكس القيم هنا لتتناسب حركة الـ 3D مع الاتجاه الجديد في اليمين
  const rotateY = useTransform(springX, [-300, 300], [-8, 8]);
  const rotateX = useTransform(springY, [-300, 300], [6, -6]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();

    mouseX.set(e.clientX - rect.width / 2);
    mouseY.set(e.clientY - rect.height / 2);
  }

  return (
    <section className="relative overflow-hidden" onMouseMove={handleMouseMove}>
      <div className="relative h-[800px] w-full overflow-hidden">
        {/* Background */}

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg,#1b120b 0%,#120d08 40%,#080706 100%)",
          }}
        />

        {/* Stage Lights */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 18% 15%, rgba(255,190,80,.28), transparent 32%)",
          }}
        />

        {/* Spotlight */}
          <div
            className="absolute left-[16%] top-[12%] h-[600px] w-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,220,140,.30), transparent 70%)",
              filter: "blur(40px)",
            }}
          />

        {/* vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 45%, rgba(0,0,0,.55) 100%)",
          }}
        />

        {/* Character Glow - (تم نقله لليمين) */}

          <div
            className="absolute left-[11%] top-1/2 h-[800px] w-[800px] -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(235,190,90,.35) 0%, rgba(235,190,90,.15) 35%, transparent 70%)",
            filter: "blur(25px)",
          }}
        />

        {/* Content - (تم نقله لليسار) */}

        <div className="relative z-30 mx-auto grid h-full max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
          {/* LEFT - Image */}
          <div className="relative hidden h-full items-center justify-center lg:flex">
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                rotateX,
                rotateY,
              }}
              className="relative h-full w-full"
            >
              <Image
                src="/hero.png"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="object-contain object-center"
              />
            </motion.div>
          </div>

          {/* RIGHT - Story */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.18,
                },
              },
            }}
            className="max-w-2xl ml-auto"
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="mb-5 tracking-[0.25em] uppercase text-gold font-semibold"
            >
              {story.eyebrow}
            </motion.p>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="font-serif leading-none"
            >
              <span className="block text-5xl lg:text-7xl text-white">
                {story.titleLine1}
              </span>

              <span className="mt-2 block text-6xl lg:text-8xl text-gold-soft">
                {story.titleLine2}
              </span>
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="mt-8 max-w-xl text-lg leading-8 text-zinc-300"
            >
              {story.description}
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="mt-10 flex gap-5"
            >
              <button className="rounded-lg bg-gold px-8 py-4 font-semibold text-[#1d1207] transition hover:scale-105">
                {story.primaryCta}
              </button>

              <button className="font-semibold text-white transition hover:text-gold">
                {story.secondaryCta}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
