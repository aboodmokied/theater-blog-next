export type Media = {
  id: string;
  url: string;
  type: string;
  postId: number;
  createdAt: string;
  updatedAt: string;
};

export type FeaturedStory = {
  id: string;
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
};

export type Post = {
  id: number;
  title: string;
  content?: string;
  type: "video" | "article";
  published: boolean;
  duration?: string;
  timeAgo?: string;
  views?: number;
  tone?: "gold" | "neutral";
  media: Media[];
  createdAt: string;
  updatedAt: string;
};

export type VisionFeature = {
  id: string;
  icon: "archive" | "academy";
  title: string;
  description: string;
};

export type VisionTile = {
  id: string;
  size: "small" | "large";
  title: string;
  description: string;
  badge?: string;
  cta?: string;
};

export type AnalyticsData = {
  onlineVisitors: number;
  todayVisitors: number;
  totalVisitors: number;
  totalViews: number;
  totalPosts: number;
  mostViewedPosts: (Post & { media: Media[] })[];
  recentVisitors: {
    id: string;
    visitorId: string;
    startedAt: string;
    lastSeenAt: string;
    endedAt: string | null;
  }[];
  viewsPerDay: { date: string; count: number }[];
  visitorsPerDay: { date: string; count: number }[];
};
