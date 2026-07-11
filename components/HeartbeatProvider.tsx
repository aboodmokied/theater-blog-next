"use client";

import { useHeartbeat } from "@/hooks/useAnalytics";

export default function HeartbeatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useHeartbeat();
  return <>{children}</>;
}
