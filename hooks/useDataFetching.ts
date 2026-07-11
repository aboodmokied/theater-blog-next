"use client";

import { useState, useEffect } from "react";
import {
  getFeaturedStories,
  getPosts,
  getVisionFeatures,
  getVisionTiles,
  getPost,
} from "@/lib/api";
import type {
  FeaturedStory,
  Post,
  VisionFeature,
  VisionTile,
} from "@/lib/types";

type UseApiResult<T> = {
  data: T;
  loading: boolean;
  error: boolean;
};

function useApi<T>(
  fetcher: () => Promise<T>,
  defaultValue: T,
): UseApiResult<T> {
  const [data, setData] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);
    fetcher()
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}

export function useFeaturedStory() {
  return useApi(
    () => getFeaturedStories().then((r) => r[0] ?? null),
    null as FeaturedStory | null,
  );
}

export function useVideoPosts() {
  return useApi(() => getPosts({ type: "video" }), [] as Post[]);
}

export function useVisionFeatures() {
  return useApi(getVisionFeatures, [] as VisionFeature[]);
}

export function useVisionTiles() {
  return useApi(getVisionTiles, [] as VisionTile[]);
}

export function usePost(id: number) {
  const [data, setData] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);
    getPost(id)
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { data, loading, error };
}
