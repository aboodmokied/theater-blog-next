import axios from "axios";
import type {
  FeaturedStory,
  Media,
  Post,
  VisionFeature,
  VisionTile,
} from "./types";

const API_ORIGIN = "http://localhost:3005";

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

export type { FeaturedStory, Media, Post, VisionFeature, VisionTile };
