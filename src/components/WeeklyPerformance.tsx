
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Platform } from "@/types";

interface PlatformPerformance {
  platform: Platform;
  views: number;
  likes: number;
  comments: number;
}

// Mock data for weekly performance
const weeklyData = [
  { name: "Mon", views: 24500, likes: 1850 },
  { name: "Tue", views: 18900, likes: 1420 },
  { name: "Wed", views: 29700, likes: 2180 },
  { name: "Thu", views: 32100, likes: 2560 },
  { name: "Fri", views: 38200, likes: 3420 },
  { name: "Sat", views: 41800, likes: 3950 },
  { name: "Sun", views: 37600, likes: 3210 },
];

const platformPerformance: PlatformPerformance[] = [
  { platform: "TikTok", views: 98200, likes: 7520, comments: 968 },
  { platform: "Instagram Reels", views: 87400, likes: 6430, comments: 852 },
  { platform: "YouTube Shorts", views: 45700, likes: 3980, comments: 386 },
  { platform: "Facebook Reels", views: 28400, likes: 1842, comments: 263 },
  { platform: "Twitter (X)", views: 32900, likes: 2156, comments: 142 },
  { platform: "Snapchat", views: 42600, likes: 2890, comments: 132 },
  { platform: "Pinterest", views: 19700, likes: 978, comments: 45 },
  { platform: "LinkedIn", views: 17800, likes: 742, comments: 156 },
];

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border rounded-lg shadow-md">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">
          Views: <span className="font-medium">{formatNumber(payload[0].value)}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Likes: <span className="font-medium">{formatNumber(payload[1].value)}</span>
        </p>
      </div>
    );
  }

  return null;
};

const WeeklyPerformance: React.FC = () => {
  // Find top platform by views
  const topPlatform = [...platformPerformance].sort((a, b) => b.views - a.views)[0];
  
  // Calculate total views and engagement
  const totalViews = platformPerformance.reduce((sum, item) => sum + item.views, 0);
  const totalLikes = platformPerformance.reduce((sum, item) => sum + item.likes, 0);
  const totalComments = platformPerformance.reduce((sum, item) => sum + item.comments, 0);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Weekly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-4 rounded-lg text-white">
              <div className="text-sm opacity-90">Total Views</div>
              <div className="text-2xl font-bold">{formatNumber(totalViews)}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-4 rounded-lg text-white">
              <div className="text-sm opacity-90">Top Platform</div>
              <div className="text-xl font-bold">{topPlatform.platform}</div>
              <div className="text-sm opacity-90">{formatNumber(topPlatform.views)} views</div>
            </div>
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-4 rounded-lg text-white">
              <div className="text-sm opacity-90">Engagement</div>
              <div className="text-xl font-bold">{formatNumber(totalLikes + totalComments)}</div>
              <div className="text-sm opacity-90">
                {formatNumber(totalLikes)} likes, {formatNumber(totalComments)} comments
              </div>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={formatNumber} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="views" name="Views" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="likes" name="Likes" fill="#d946ef" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklyPerformance;
