
export type Platform = "TikTok" | "YouTube Shorts" | "Instagram Reels" | "Facebook Reels" | "Twitter (X)" | "Snapchat" | "Pinterest" | "LinkedIn";

export interface PlatformAccount {
  platform: Platform;
  accountName: string;
}

export interface Post {
  id: string;
  title: string;
  caption: string;
  scheduledDate: Date;
  platforms: Platform[];
  accounts: PlatformAccount[];
  mediaUrl: string;
  thumbnailUrl?: string;
  notes?: string;
  contentIntent?: "Growth" | "Lead" | "Brand" | "Viral";
  isExperiment?: boolean;
}

export interface PostStats {
  id: string;
  postId: string;
  platform: Platform;
  account: string;
  date: Date;
  views: number;
  likes: number;
  comments: number;
  shares?: number;
}

export interface ScheduledPost {
  id: string;
  title: string;
  date: Date;
  platforms: Platform[];
  accounts: PlatformAccount[];
  status: "scheduled" | "posted" | "failed";
}

export interface CaptionTemplate {
  id: string;
  title: string;
  content: string;
  tags: string[];
}

export interface PlatformWithAccounts {
  name: Platform;
  accounts: string[];
}

export interface ExperimentData {
  id: string;
  title: string;
  hypothesis: string;
  variants: Post[];
  results: PostStats[];
  conclusion?: string;
}

export interface ContentIntent {
  type: "Growth" | "Lead" | "Brand" | "Viral";
  count: number;
  percentage: number;
}
