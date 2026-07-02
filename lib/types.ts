export type FeaturedStory = {
  id: string;
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
};

export type VideoCard = {
  id: string;
  title: string;
  duration: string;
  timeAgo: string;
  views: string;
  tone: "gold" | "neutral";
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
