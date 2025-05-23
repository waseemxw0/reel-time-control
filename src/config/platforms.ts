
import { PlatformWithAccounts } from "@/types";

// Platform configuration - easily extensible
export const platformsConfig: PlatformWithAccounts[] = [
  {
    name: "TikTok",
    accounts: ["@tiktok_main", "@tiktok_gym", "@tiktok_clips"]
  },
  {
    name: "Instagram Reels",
    accounts: ["@ig_main", "@ig_quotes"]
  },
  {
    name: "YouTube Shorts",
    accounts: ["@yt_ai", "@yt_motivation"]
  },
  {
    name: "Facebook Reels",
    accounts: ["@fb_main"]
  },
  {
    name: "Twitter (X)",
    accounts: ["@x_main", "@x_alt"]
  },
  {
    name: "Snapchat",
    accounts: ["@snap_ai", "@snap_fitness"]
  },
  {
    name: "Pinterest",
    accounts: ["Motivation Board", "Quotes Board"]
  },
  {
    name: "LinkedIn",
    accounts: ["Sam Creator Profile", "AI Biz Page"]
  }
];

// Platform icon mapping - add new platforms here
export const platformIconMap = {
  "TikTok": "tiktok",
  "Instagram Reels": "instagram", 
  "YouTube Shorts": "youtube",
  "Facebook Reels": "facebook",
  "Twitter (X)": "twitter",
  "Snapchat": "snapchat",
  "Pinterest": "pinterest",
  "LinkedIn": "linkedin"
} as const;

// Platform styling configuration
export const platformStyleMap = {
  "TikTok": "tiktok-badge",
  "Instagram Reels": "instagram-badge",
  "YouTube Shorts": "youtube-badge", 
  "Facebook Reels": "facebook-badge",
  "Twitter (X)": "twitter-badge",
  "Snapchat": "snapchat-badge",
  "Pinterest": "pinterest-badge",
  "LinkedIn": "linkedin-badge"
} as const;
