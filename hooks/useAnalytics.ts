"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { getVisitorId, sendHeartbeat, trackView } from "@/lib/api";

const HEARTBEAT_INTERVAL = 60_000;

export function useHeartbeat() {
  const visitorIdRef = useRef<string>("");

  useEffect(() => {
    visitorIdRef.current = getVisitorId();
    if (!visitorIdRef.current) return;

    sendHeartbeat(visitorIdRef.current);

    const interval = setInterval(() => {
      if (visitorIdRef.current) {
        sendHeartbeat(visitorIdRef.current);
      }
    }, HEARTBEAT_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return visitorIdRef;
}

export function useViewTracking(postId: number, initialViews: number) {
  const hasTracked = useRef(false);
  const [displayViews, setDisplayViews] = useState(initialViews);

  useEffect(() => {
    setDisplayViews(initialViews);
    hasTracked.current = false;
  }, [initialViews]);

  const onView = useCallback(() => {
    if (hasTracked.current) return;
    hasTracked.current = true;

    const visitorId = getVisitorId();
    if (visitorId) {
      trackView(postId, visitorId)
        .then((res) => {
          setDisplayViews(res.views);
        })
        .catch(() => {});
    }
  }, [postId]);

  return { onView, displayViews };
}
