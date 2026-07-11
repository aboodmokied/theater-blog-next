import axios from "axios";
import type {
  AnalyticsData,
  FeaturedStory,
  Media,
  Post,
  VisionFeature,
  VisionTile,
} from "./types";

const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN || "http://localhost:3005";

const http = axios.create({
  baseURL: `${API_ORIGIN}/api`,
});

export function mediaUrl(path?: string): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${API_ORIGIN}${path}`;
}

// ── Featured Stories ──────────────────────────────────────────

export function getFeaturedStories(): Promise<FeaturedStory[]> {
  return http.get("/featured-stories").then((r) => r.data);
}

export function getFeaturedStory(id: string): Promise<FeaturedStory> {
  return http.get(`/featured-stories/${id}`).then((r) => r.data);
}

// ── Posts ─────────────────────────────────────────────────────

export function getPosts(params?: {
  type?: string;
  published?: string;
}): Promise<Post[]> {
  return http.get("/posts", { params }).then((r) => r.data);
}

export function getPost(id: number): Promise<Post> {
  return http.get(`/posts/${id}`).then((r) => r.data);
}

export function trackView(postId: number, visitorId: string): Promise<{ views: number }> {
  return http.post(`/posts/${postId}/view`, { visitorId }).then((r) => r.data);
}

// ── Vision Features ───────────────────────────────────────────

export function getVisionFeatures(): Promise<VisionFeature[]> {
  return http.get("/vision-features").then((r) => r.data);
}

// ── Vision Tiles ──────────────────────────────────────────────

export function getVisionTiles(): Promise<VisionTile[]> {
  return http.get("/vision-tiles").then((r) => r.data);
}

// ── Upload / Media ────────────────────────────────────────────

export function getMediaList(params?: {
  type?: string;
  page?: number;
  limit?: number;
}): Promise<{
  data: Media[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> {
  return http.get("/upload", { params }).then((r) => r.data);
}

export function getMedia(id: string): Promise<Media> {
  return http.get(`/upload/${id}`).then((r) => r.data);
}

// ── Analytics ─────────────────────────────────────────────────

export function sendHeartbeat(visitorId: string): Promise<void> {
  return http.post("/analytics/heartbeat", { visitorId }).then(() => undefined);
}

export function getAnalytics(): Promise<AnalyticsData> {
  return http.get("/analytics").then((r) => r.data);
}

// ── Visitor Cookie ────────────────────────────────────────────

const VISITOR_COOKIE = "mb_vid";
const COOKIE_DAYS = 365;

export function getVisitorId(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(new RegExp(`${VISITOR_COOKIE}=([^;]+)`));
  if (match) return match[1];
  const id = crypto.randomUUID();
  document.cookie = `${VISITOR_COOKIE}=${id}; max-age=${COOKIE_DAYS * 86400}; path=/; SameSite=Lax`;
  return id;
}

export type { FeaturedStory, Media, Post, VisionFeature, VisionTile, AnalyticsData };
