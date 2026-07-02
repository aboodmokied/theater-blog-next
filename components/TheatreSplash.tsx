"use client";

/**
 * TheatreSplash
 * ------------------------------------------------------------------
 * A cinematic proscenium-arch splash screen for a theatre content
 * creator site. The homepage renders behind a pair of heavy velvet
 * curtains.  While the audience waits, the stage is dim and a marquee
 * light frame chases to life.  When ready, the curtains part with a
 * realistic fabric motion, a warm spotlight swells, and the full-
 * brightness homepage is revealed — no intermediate loading UI.
 *
 * Usage:
 * <TheatreSplash ready={dataReady}>
 * <YourRealPage />
 * </TheatreSplash>
 * ------------------------------------------------------------------
 */

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Phase = "loading" | "opening" | "done";

export interface TheatreSplashProps {
  /** Real page content, mounted immediately behind the curtains. */
  children?: React.ReactNode;
  /** Flip to true once your real data/page is actually ready. */
  ready?: boolean;
  /** The curtains never open before this many ms. */
  minDurationMs?: number;
  /** Called once the curtains have fully parted. */
  onComplete?: () => void;
  /** Skip the whole sequence after the first visit in a session. */
  once?: boolean;
}

const ARCH_COUNT = 20;
const SIDE_COUNT = 8;

function buildLights() {
  const lights: { id: string; left: number; top: number; delay: number }[] = [];
  const cx = 50;
  const cy = 34;
  const rx = 48;
  const ry = 30;
  let order = 0;
  const totalSteps = ARCH_COUNT + SIDE_COUNT * 2;

  for (let i = 0; i < SIDE_COUNT; i++) {
    const t = i / (SIDE_COUNT - 1);
    lights.push({
      id: `l-${i}`,
      left: 2.5,
      top: 92 - t * (92 - cy),
      delay: (order++ / totalSteps) * 1.3,
    });
  }
  for (let i = 0; i < ARCH_COUNT; i++) {
    const t = i / (ARCH_COUNT - 1);
    const angle = Math.PI * (1 - t);
    lights.push({
      id: `a-${i}`,
      left: cx + rx * Math.cos(angle),
      top: cy - ry * Math.sin(angle),
      delay: (order++ / totalSteps) * 1.3,
    });
  }
  for (let i = 0; i < SIDE_COUNT; i++) {
    const t = i / (SIDE_COUNT - 1);
    lights.push({
      id: `r-${i}`,
      left: 97.5,
      top: cy + t * (92 - cy),
      delay: (order++ / totalSteps) * 1.3,
    });
  }
  return lights;
}

export default function TheatreSplash({
  children,
  ready = true,
  minDurationMs = 3200,
  onComplete,
  once = true,
}: TheatreSplashProps) {
  const prefersReducedMotion = useReducedMotion();
  const lights = useMemo(buildLights, []);

  const [skip, setSkip] = useState(false);
  const [timerDone, setTimerDone] = useState(false);
  const [phase, setPhase] = useState<Phase>("loading");
  const [showSkipBtn, setShowSkipBtn] = useState(false);

  useEffect(() => {
    if (once && typeof window !== "undefined") {
      if (sessionStorage.getItem("theatre-splash-seen") === "1") {
        setSkip(true);
      }
    }
  }, [once]);

  useEffect(() => {
    if (skip) return;
    const t = setTimeout(() => setTimerDone(true), minDurationMs);
    const skipT = setTimeout(() => setShowSkipBtn(true), 1000);
    return () => {
      clearTimeout(t);
      clearTimeout(skipT);
    };
  }, [minDurationMs, skip]);

  useEffect(() => {
    if (skip) return;
    if (timerDone && ready && phase === "loading") {
      setPhase("opening");
    }
  }, [timerDone, ready, phase, skip]);

  useEffect(() => {
    if (skip && typeof window !== "undefined") {
      onComplete?.();
    }
  }, [skip, onComplete]);

  const handleCurtainsOpen = () => {
    if (typeof window !== "undefined" && once) {
      sessionStorage.setItem("theatre-splash-seen", "1");
    }
    onComplete?.();
    setPhase("done");
  };

  const forceOpen = () => {
    setTimerDone(true);
    setPhase("opening");
  };

  // تعديل الـ Ease ليكون أسرع في البداية ثم يتباطأ بنعومة (التأثير الفيزيائي لفتح القماش المربوط)
  const curtainEase: [number, number, number, number] = [0.25, 1, 0.5, 1];
  const showSplash = !skip && phase !== "done";
  const curtainsMoving = phase === "opening";
  const isDimmed = phase === "loading";

  const dustParticles = useMemo(() => {
    const rng = (i: number): number => ((i * 16807) % 2147483647) / 2147483647;
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: rng(i * 7 + 1) * 100,
      y: rng(i * 13 + 3) * 100,
      size: rng(i * 23 + 5) * 2.5 + 0.5,
      duration: rng(i * 31 + 7) * 8 + 6,
      delay: rng(i * 41 + 9) * 4,
      driftX: (rng(i * 53 + 11) - 0.5) * 30,
      driftY: -(rng(i * 61 + 13) * 15 + 5),
    }));
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Homepage — rendered behind the splash, dimmed during the wait */}
      <div
        className="relative z-0"
        style={{
          filter: `brightness(${skip || !isDimmed ? 1 : 0.15}) blur(${skip || !isDimmed ? 0 : 1}px)`,
          transform: `scale(${skip || !isDimmed ? 1 : 1.03})`,
          transformOrigin: "center center",
          transition: prefersReducedMotion
            ? "none"
            : "filter 1.5s cubic-bezier(0.25,1,0.5,1) 0.15s, transform 1.5s cubic-bezier(0.25,1,0.5,1) 0.15s",
        }}
      >
        {children}
      </div>

      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="fixed inset-0 z-[999] overflow-hidden"
            exit={{
              opacity: 0,
              transition: { duration: prefersReducedMotion ? 0.2 : 0.5 },
            }}
            role="status"
            aria-live="polite"
          >
            {/* 1. Subtle theatre-darkness overlay */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 0.85 }}
              animate={{ opacity: curtainsMoving ? 0 : 0.85 }}
              transition={{
                duration: prefersReducedMotion ? 0.3 : 1.8,
                ease: curtainEase,
              }}
              style={{
                background:
                  "radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(0,0,0,0.7) 80%, #000 100%)",
              }}
            />

            {/* 2. Warm centre-stage spotlight */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: curtainsMoving ? [0, 1, 0.6, 0] : 0 }}
              transition={{
                duration: prefersReducedMotion ? 0.5 : 2.5,
                times: [0, 0.15, 0.5, 1],
                ease: "easeInOut",
              }}
            >
              <div
                className="absolute left-1/2 top-0 -translate-x-1/2"
                style={{
                  width: "35%",
                  height: "100vh",
                  background:
                    "linear-gradient(180deg, rgba(255,235,200,0.18) 0%, rgba(255,215,140,0.08) 35%, transparent 70%)",
                  clipPath: "polygon(22% 0%, 78% 0%, 100% 100%, 0% 100%)",
                  filter: "blur(5px)",
                }}
              />
            </motion.div>

            {/* 3. Marquee light frame */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{ zIndex: 1 }}
            >
              {lights.map((l) => (
                <span
                  key={l.id}
                  aria-hidden
                  className="absolute h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F3E9D2]"
                  style={{
                    left: `${l.left}%`,
                    top: `${l.top}%`,
                    boxShadow: "0 0 5px 1px rgba(243,233,210,0.7)",
                    animation: prefersReducedMotion
                      ? undefined
                      : `bulbGlow 1.6s ease-in-out ${l.delay}s infinite`,
                    opacity: prefersReducedMotion ? 0.7 : undefined,
                  }}
                />
              ))}
            </div>

            {/* 4. Floating dust particles */}
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden"
              style={{ zIndex: 2 }}
            >
              {dustParticles.map((p) => (
                <motion.div
                  key={p.id}
                  className="absolute rounded-full"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    width: p.size,
                    height: p.size,
                    background: "rgba(212,175,55,0.35)",
                  }}
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 0.4, 0.25, 0.35, 0],
                    x: [
                      0,
                      p.driftX * 0.3,
                      p.driftX * 0.5,
                      p.driftX * 0.8,
                      p.driftX,
                    ],
                    y: [
                      0,
                      p.driftY * 0.3,
                      p.driftY * 0.5,
                      p.driftY * 0.8,
                      p.driftY,
                    ],
                    scale: [0.6, 1, 1.1, 0.8, 0.3],
                  }}
                  transition={{
                    duration: p.duration,
                    delay: p.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.25, 0.5, 0.75, 1],
                  }}
                />
              ))}
            </div>

            {/* ――――――――――――――――――――――――――――――――――――――――― */}
            {/* 5. الستارة اليسرى المعدلة لتنكمش باتجاه اليسار */}
            {/* ――――――――――――――――――――――――――――――――――――――――― */}
            <motion.div
              aria-hidden
              className="absolute inset-y-0 left-0 origin-left" // تم تغيير الـ origin إلى اليسار ليحدث الانكماش هناك
              style={{
                width: "51%",
                background:
                  "repeating-linear-gradient(90deg, #2d0510 0px, #4A0E1E 10px, #3b0818 18px, #5c1220 28px, #3b0818 38px, #4A0E1E 46px, #2d0510 56px)",
                boxShadow:
                  "inset -35px 0 70px rgba(0,0,0,0.6), 5px 0 30px rgba(0,0,0,0.3)",
                zIndex: 10,
              }}
              initial={{ x: "0%", scaleX: 1 }}
              animate={{
                // الستارة تنزلق وتصغر أفقياً بنسبة كبيرة جداً لتظهر كأنها تجمعت (قماش مكشكش)
                x: curtainsMoving ? "-20%" : "0%",
                scaleX: curtainsMoving ? 0.08 : 1,
              }}
              transition={{
                duration: prefersReducedMotion ? 0.6 : 2.2, // زيادة الوقت قليلاً لتبدو حركة الستارة ثقيلة وواقعية
                ease: curtainEase,
              }}
              onAnimationComplete={() => {
                if (phase === "opening") handleCurtainsOpen();
              }}
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 100% 80% at 100% 50%, rgba(0,0,0,0.5) 0%, transparent 60%)",
                }}
              />
              <div
                className="absolute bottom-0 h-5 w-full"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 12px -6px, transparent 11px, #C9A227 12px)",
                  backgroundSize: "24px 24px",
                  backgroundRepeat: "repeat-x",
                }}
              />
            </motion.div>

            {/* ――――――――――――――――――――――――――――――――――――――――― */}
            {/* 6. الستارة اليمنى المعدلة لتنكمش باتجاه اليمين */}
            {/* ――――――――――――――――――――――――――――――――――――――――― */}
            <motion.div
              aria-hidden
              className="absolute inset-y-0 right-0 origin-right" // تم تغيير الـ origin إلى اليمين
              style={{
                width: "51%",
                background:
                  "repeating-linear-gradient(90deg, #5c1220 0px, #3b0818 10px, #4A0E1E 18px, #2d0510 28px, #4A0E1E 38px, #3b0818 46px, #5c1220 56px)",
                boxShadow:
                  "inset 35px 0 70px rgba(0,0,0,0.6), -5px 0 30px rgba(0,0,0,0.3)",
                zIndex: 10,
              }}
              initial={{ x: "0%", scaleX: 1 }}
              animate={{
                x: curtainsMoving ? "20%" : "0%",
                scaleX: curtainsMoving ? 0.08 : 1,
              }}
              transition={{
                duration: prefersReducedMotion ? 0.6 : 2.2,
                ease: curtainEase,
              }}
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 100% 80% at 0% 50%, rgba(0,0,0,0.5) 0%, transparent 60%)",
                }}
              />
              <div
                className="absolute bottom-0 h-5 w-full"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 12px -6px, transparent 11px, #C9A227 12px)",
                  backgroundSize: "24px 24px",
                  backgroundRepeat: "repeat-x",
                }}
              />
            </motion.div>

            {/* 7. Top valance + bottom trim */}
            <motion.div
              aria-hidden
              className="absolute inset-x-0 top-0 origin-top"
              style={{
                height: "10%",
                background:
                  "linear-gradient(180deg, #1a0208 0%, #3b0818 30%, #4A0E1E 55%, #3b0818 80%, #1a0208 100%)",
                boxShadow: "0 6px 30px rgba(0,0,0,0.5)",
                zIndex: 11,
              }}
              initial={{ scaleY: 1 }}
              animate={{ scaleY: curtainsMoving ? 0 : 1 }}
              transition={{
                duration: prefersReducedMotion ? 0.3 : 1.5,
                ease: curtainEase,
                delay: 0.1,
              }}
            >
              <div
                className="h-full w-full"
                style={{
                  background:
                    "repeating-linear-gradient(90deg, transparent, transparent 16px, rgba(0,0,0,0.12) 16px, rgba(0,0,0,0.12) 17px)",
                }}
              />
            </motion.div>

            <motion.div
              aria-hidden
              className="absolute bottom-0 inset-x-0 origin-bottom"
              style={{
                height: "4%",
                background:
                  "linear-gradient(0deg, #1a0208 0%, #3b0818 50%, transparent 100%)",
                zIndex: 11,
              }}
              initial={{ scaleY: 1 }}
              animate={{ scaleY: curtainsMoving ? 0 : 1 }}
              transition={{
                duration: prefersReducedMotion ? 0.2 : 1,
                ease: curtainEase,
                delay: 0.15,
              }}
            />

            {/* 8. Skip control */}
            <AnimatePresence>
              {showSkipBtn && phase === "loading" && (
                <motion.button
                  type="button"
                  onClick={forceOpen}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-6 right-6 z-20 rounded-full border border-gold/20 px-5 py-2 font-display text-xs tracking-wider text-gold/50 transition-all hover:border-gold/50 hover:text-gold/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                >
                  Skip intro
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes bulbGlow {
          0%,
          100% {
            opacity: 0.2;
            box-shadow: 0 0 3px 1px rgba(243, 233, 210, 0.3);
          }
          15% {
            opacity: 1;
            box-shadow: 0 0 7px 2px rgba(243, 233, 210, 0.9);
          }
          40% {
            opacity: 0.4;
            box-shadow: 0 0 4px 1px rgba(243, 233, 210, 0.4);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .theatre-splash-reduced-motion {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
