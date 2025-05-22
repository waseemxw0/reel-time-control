
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Instagram, Youtube, Twitter, Facebook, Linkedin } from "lucide-react";
import SnapchatIcon from "./icons/SnapchatIcon";
import PinterestIcon from "./icons/PinterestIcon";
import { Platform } from "@/types";

interface MediaItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  status: "draft" | "scheduled" | "posted";
  platforms: Platform[];
  date: Date;
}

// Mock data for the media library
const mediaItems: MediaItem[] = [
  {
    id: "1",
    title: "Summer Product Showcase",
    thumbnailUrl: "https://source.unsplash.com/random/300x200?summer",
    status: "posted",
    platforms: ["Instagram Reels", "TikTok", "Pinterest"],
    date: new Date(2025, 4, 15)
  },
  {
    id: "2",
    title: "Business Tips Session",
    thumbnailUrl: "https://source.unsplash.com/random/300x200?business",
    status: "scheduled",
    platforms: ["LinkedIn", "Twitter (X)", "YouTube Shorts"],
    date: new Date(2025, 4, 23)
  },
  {
    id: "3",
    title: "Behind the Scenes",
    thumbnailUrl: "https://source.unsplash.com/random/300x200?studio",
    status: "draft",
    platforms: ["Instagram Reels", "Snapchat"],
    date: new Date(2025, 4, 28)
  },
  {
    id: "4",
    title: "Product Tutorial",
    thumbnailUrl: "https://source.unsplash.com/random/300x200?tutorial",
    status: "scheduled",
    platforms: ["YouTube Shorts", "TikTok", "Facebook Reels"],
    date: new Date(2025, 5, 3)
  }
];

const getPlatformIcon = (platform: Platform) => {
  switch (platform) {
    case "TikTok":
      return (
        <div className="h-6 w-6 rounded-full bg-black flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.948 6.558 6.558 0 0 1-1.263-1.948H16.5l.003 13.566a2.918 2.918 0 0 1-1.034 2.229 2.917 2.917 0 0 1-2.237.697 2.933 2.933 0 0 1-2.363-2.466 2.93 2.93 0 0 1 1.92-3.321v2.356a.72.72 0 0 0 .11-.074.822.822 0 0 0 .26-.257.7.7 0 0 0 .068-.31.707.707 0 0 0-.457-.659.712.712 0 0 0-.824.223.705.705 0 0 0-.156.443v.057a.719.719 0 0 0 .006.083v-.006c.01.125.05.247.114.355.215.355.618.526 1.305.281a1.546 1.546 0 0 0 .925-1.426l-.001-8.983h-1.74a6.578 6.578 0 0 1 .173 1.409h-1.858a4.693 4.693 0 0 0-.636-1.61 4.71 4.71 0 0 0-1.145-1.294 4.758 4.758 0 0 0-2.869-1.106v1.928a2.997 2.997 0 0 1 1.168.333 2.998 2.998 0 0 1 1.31 1.479c.278.615.336 1.313.166 1.971a2.998 2.998 0 0 1-2.645 2.307v1.847a4.754 4.754 0 0 0 4.356-3.643 4.76 4.76 0 0 0-1.039-4.189v.073h1.902a6.888 6.888 0 0 0-.131-1.533h3.745V4.855a6.606 6.606 0 0 0 1.272.125h.061V3h-2.307c.047-.018.085-.038.132-.056" />
          </svg>
        </div>
      );
    case "YouTube Shorts":
      return <Youtube size={16} className="text-red-600" />;
    case "Instagram Reels":
      return <Instagram size={16} className="text-pink-600" />;
    case "Facebook Reels":
      return <Facebook size={16} className="text-blue-600" />;
    case "Twitter (X)":
      return <Twitter size={16} className="text-black" />;
    case "Snapchat":
      return <SnapchatIcon size={16} className="text-yellow-400" />;
    case "Pinterest":
      return <PinterestIcon size={16} className="text-red-600" />;
    case "LinkedIn":
      return <Linkedin size={16} className="text-blue-700" />;
    default:
      return null;
  }
};

const getStatusBadge = (status: "draft" | "scheduled" | "posted") => {
  switch (status) {
    case "draft":
      return <Badge variant="outline" className="bg-gray-100 text-gray-800">Draft</Badge>;
    case "scheduled":
      return <Badge variant="outline" className="bg-blue-100 text-blue-800">Scheduled</Badge>;
    case "posted":
      return <Badge variant="outline" className="bg-green-100 text-green-800">Posted</Badge>;
    default:
      return null;
  }
};

const MediaLibrary: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Media Library</h3>
        <div className="flex space-x-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">All</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">Scheduled</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">Posted</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">Draft</Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mediaItems.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-40 bg-cover bg-center" style={{ backgroundImage: `url(${item.thumbnailUrl})` }}>
              <div className="absolute top-2 right-2">
                {getStatusBadge(item.status)}
              </div>
            </div>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2 line-clamp-1">{item.title}</h4>
              <p className="text-xs text-muted-foreground mb-3">
                {new Date(item.date).toLocaleDateString()}
              </p>
              <div className="flex space-x-1">
                {item.platforms.slice(0, 3).map((platform, idx) => (
                  <div key={`${item.id}-${platform}-${idx}`} className="flex-shrink-0">
                    {getPlatformIcon(platform)}
                  </div>
                ))}
                {item.platforms.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{item.platforms.length - 3}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MediaLibrary;
