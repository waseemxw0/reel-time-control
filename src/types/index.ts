
export type Platform = "TikTok" | "YouTube Shorts" | "Instagram Reels" | "Facebook Reels" | "Twitter (X)" | "Snapchat";

export interface Post {
  id: string;
  title: string;
  caption: string;
  scheduledDate: Date;
  platforms: Platform[];
  mediaUrl: string;
  thumbnailUrl?: string;
}

export interface PostStats {
  id: string;
  postId: string;
  platform: Platform;
  date: Date;
  views: number;
  likes: number;
  comments: number;
}

export interface ScheduledPost {
  id: string;
  title: string;
  date: Date;
  platforms: Platform[];
  status: "scheduled" | "posted" | "failed";
}
