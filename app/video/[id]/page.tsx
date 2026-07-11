"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { VideoThumb } from "@/components/TheaterIcons";
import { IconEye } from "@/components/icons";
import { Media, Post } from "@/lib/types";
import { usePost, useVideoPosts } from "@/hooks/useDataFetching";
import { useViewTracking } from "@/hooks/useAnalytics";
import { mediaUrl } from "@/lib/api";

function IconBack({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M8 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VideoPageSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="h-4 w-24 animate-pulse rounded bg-white/5" />
      <div className="mt-6 aspect-video w-full animate-pulse rounded-2xl bg-white/5" />
      <div className="mt-6 h-7 w-2/3 animate-pulse rounded bg-white/10" />
      <div className="mt-3 flex gap-3">
        <div className="h-3 w-16 animate-pulse rounded bg-white/5" />
        <div className="h-3 w-12 animate-pulse rounded bg-white/5" />
      </div>
    </div>
  );
}

export default function VideoPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = Number(params.id);

  const { data: post, loading, error } = usePost(id);
  const { data: allVideos } = useVideoPosts();
  const { onView, displayViews } = useViewTracking(id, post?.views ?? 0);
  const viewTracked = useRef(false);

  const handleTimeUpdate = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      if (!viewTracked.current && e.currentTarget.currentTime >= 5) {
        viewTracked.current = true;
        onView();
      }
    },
    [onView],
  );

  if (loading) return <VideoPageSkeleton />;

  if (error || !post) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="font-display text-lg font-bold text-foreground">
          تعذر العثور على هذا الفيديو
        </p>
        <p className="text-sm text-muted-2">
          قد يكون الرابط غير صحيح أو تم حذف المحتوى
        </p>
        <Link
          href="/"
          className="mt-2 rounded-full bg-gold px-5 py-2 text-sm font-bold text-[#1a1206] transition-transform hover:scale-105"
        >
          العودة للرئيسية
        </Link>
      </div>
    );
  }

  const videoMedia = post.media?.find((m: Media) => m.type === "video");
  const posterMedia = post.media?.find(
    (m: Media) => m.type === "image" || m.type === "thumbnail",
  );

  const related = (allVideos ?? [])
    .filter((p: Post) => p.id !== post.id)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* back */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-sm text-muted-2 transition-colors hover:text-gold-soft"
      >
        <IconBack className="h-4 w-4 rotate-180" />
        رجوع
      </button>

      {/* player, staged with the same gold spotlight glow as the thumbnails */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative mt-6"
      >
        <div
          className="pointer-events-none absolute -inset-x-6 -top-10 h-40 opacity-70"
          // style={{
          //   background:
          //     "radial-gradient(ellipse 50% 100% at 50% 0%, rgba(240,185,64,0.16), transparent 70%)",
          // }}
        />
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black ring-1 ring-white/10">
          {videoMedia ? (
            <video
              key={videoMedia.id}
              controls
              poster={mediaUrl(posterMedia?.url)}
              className="h-full w-full"
              src={mediaUrl(videoMedia.url)}
              onTimeUpdate={handleTimeUpdate}
            />
          ) : (
            <div className="grid h-full w-full place-items-center text-sm text-muted-2">
              لا يوجد فيديو متاح لهذا المحتوى
            </div>
          )}
        </div>
      </motion.div>

      {/* meta */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        className="mt-6 text-right"
      >
        <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          {post.title}
        </h1>
        <div className="mt-3 flex items-center justify-end gap-4 text-sm text-muted-2">
          {post.duration && (
            <span className="rounded-md bg-white/5 px-2 py-0.5 font-display text-xs font-bold text-white">
              {post.duration}
            </span>
          )}
          {post.timeAgo && <span>{post.timeAgo}</span>}
          {post.views !== undefined && (
            <span className="inline-flex items-center gap-1">
              {displayViews}
              <IconEye className="h-3.5 w-3.5" />
            </span>
          )}
        </div>

        {post.content && (
          <p className="mt-5 max-w-3xl border-t border-white/10 pt-5 text-[15px] leading-7 text-muted-2">
            {post.content}
          </p>
        )}
      </motion.div>

      {/* related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-right font-display text-lg font-bold text-foreground">
            فيديوهات مقترحة
          </h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="mt-5 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
          >
            {related.map((item) => (
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
                <Link href={`/video/${item.id}`}>
                  <div className="relative">
                    <VideoThumb item={item} />
                    <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-1.5 py-0.5 font-display text-[11px] font-bold text-white">
                      {item.duration}
                    </span>
                  </div>
                  <h3 className="mt-3 line-clamp-1 text-right text-[15px] font-bold text-foreground transition-colors group-hover:text-gold-soft">
                    {item.title}
                  </h3>
                  <div className="mt-1.5 flex items-center justify-end gap-3 text-xs text-muted-2">
                    <span className="inline-flex items-center gap-1">
                      {item.views ?? 0}
                      <IconEye className="h-3.5 w-3.5" />
                    </span>
                    <span>{item.timeAgo}</span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </section>
      )}
    </div>
  );
}
