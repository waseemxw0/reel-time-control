
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Instagram, Youtube, Twitter, Facebook } from "lucide-react";
import SnapchatIcon from "./icons/SnapchatIcon";
import { PostStats, Platform } from "@/types";

// Mock data for post stats
const mockPostStats: PostStats[] = [
  {
    id: "1",
    postId: "post1",
    platform: "Instagram Reels",
    date: new Date(2025, 4, 15),
    views: 24500,
    likes: 1850,
    comments: 124
  },
  {
    id: "2",
    postId: "post1",
    platform: "TikTok",
    date: new Date(2025, 4, 15),
    views: 38200,
    likes: 3420,
    comments: 237
  },
  {
    id: "3",
    postId: "post2",
    platform: "YouTube Shorts",
    date: new Date(2025, 4, 17),
    views: 15700,
    likes: 982,
    comments: 86
  },
  {
    id: "4",
    postId: "post3",
    platform: "Facebook Reels",
    date: new Date(2025, 4, 19),
    views: 8400,
    likes: 542,
    comments: 63
  },
  {
    id: "5",
    postId: "post4",
    platform: "Twitter (X)",
    date: new Date(2025, 4, 20),
    views: 12900,
    likes: 856,
    comments: 42
  }
];

const getPlatformIcon = (platform: Platform) => {
  switch (platform) {
    case "Instagram Reels":
      return <Instagram size={16} className="text-instagram" />;
    case "YouTube Shorts":
      return <Youtube size={16} className="text-youtube" />;
    case "TikTok":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" className="text-tiktok" fill="currentColor">
          <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.948 6.558 6.558 0 0 1-1.263-1.948H16.5l.003 13.566a2.918 2.918 0 0 1-1.034 2.229 2.917 2.917 0 0 1-2.237.697 2.933 2.933 0 0 1-2.363-2.466 2.93 2.93 0 0 1 1.92-3.321v2.356a.72.72 0 0 0 .11-.074.822.822 0 0 0 .26-.257.7.7 0 0 0 .068-.31.707.707 0 0 0-.457-.659.712.712 0 0 0-.824.223.705.705 0 0 0-.156.443v.057a.719.719 0 0 0 .006.083v-.006c.01.125.05.247.114.355.215.355.618.526 1.305.281a1.546 1.546 0 0 0 .925-1.426l-.001-8.983h-1.74a6.578 6.578 0 0 1 .173 1.409h-1.858a4.693 4.693 0 0 0-.636-1.61 4.71 4.71 0 0 0-1.145-1.294 4.758 4.758 0 0 0-2.869-1.106v1.928a2.997 2.997 0 0 1 1.168.333 2.998 2.998 0 0 1 1.31 1.479c.278.615.336 1.313.166 1.971a2.998 2.998 0 0 1-2.645 2.307v1.847a4.754 4.754 0 0 0 4.356-3.643 4.76 4.76 0 0 0-1.039-4.189v.073h1.902a6.888 6.888 0 0 0-.131-1.533h3.745V4.855a6.606 6.606 0 0 0 1.272.125h.061V3h-2.307c.047-.018.085-.038.132-.056" />
        </svg>
      );
    case "Facebook Reels":
      return <Facebook size={16} className="text-facebook" />;
    case "Twitter (X)":
      return <Twitter size={16} className="text-twitter" />;
    case "Snapchat":
      return <SnapchatIcon size={16} className="text-snapchat" />;
    default:
      return null;
  }
};

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

const RecentPostsTable: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Posts & Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Likes</TableHead>
              <TableHead className="text-right">Comments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPostStats.map((stat) => (
              <TableRow key={stat.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                  {stat.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getPlatformIcon(stat.platform)}
                    <span>{stat.platform}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">{formatNumber(stat.views)}</TableCell>
                <TableCell className="text-right">{formatNumber(stat.likes)}</TableCell>
                <TableCell className="text-right">{formatNumber(stat.comments)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentPostsTable;
