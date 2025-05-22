
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Instagram, Youtube, Twitter, Facebook } from "lucide-react";
import SnapchatIcon from "./icons/SnapchatIcon";
import { ScheduledPost, Platform } from "@/types";

// Mock data for scheduled posts
const mockScheduledPosts: ScheduledPost[] = [
  {
    id: "1",
    title: "Summer Product Launch",
    date: new Date(2025, 4, 22, 14, 30),
    platforms: ["Instagram Reels", "TikTok"],
    status: "scheduled"
  },
  {
    id: "2",
    title: "How-to Tutorial",
    date: new Date(2025, 4, 23, 10, 0),
    platforms: ["YouTube Shorts", "TikTok"],
    status: "scheduled"
  },
  {
    id: "3",
    title: "Behind the Scenes",
    date: new Date(2025, 4, 24, 16, 15),
    platforms: ["Instagram Reels", "Facebook Reels", "TikTok"],
    status: "scheduled"
  },
  {
    id: "4",
    title: "Product Announcement",
    date: new Date(2025, 4, 25, 9, 0),
    platforms: ["Twitter (X)", "Instagram Reels", "Facebook Reels"],
    status: "scheduled"
  },
  {
    id: "5",
    title: "Weekend Promotion",
    date: new Date(2025, 4, 26, 12, 0),
    platforms: ["Instagram Reels", "Snapchat", "TikTok", "Twitter (X)"],
    status: "scheduled"
  }
];

const getPlatformIcon = (platform: Platform) => {
  switch (platform) {
    case "Instagram Reels":
      return <Instagram size={14} />;
    case "YouTube Shorts":
      return <Youtube size={14} />;
    case "TikTok":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.948 6.558 6.558 0 0 1-1.263-1.948H16.5l.003 13.566a2.918 2.918 0 0 1-1.034 2.229 2.917 2.917 0 0 1-2.237.697 2.933 2.933 0 0 1-2.363-2.466 2.93 2.93 0 0 1 1.92-3.321v2.356a.72.72 0 0 0 .11-.074.822.822 0 0 0 .26-.257.7.7 0 0 0 .068-.31.707.707 0 0 0-.457-.659.712.712 0 0 0-.824.223.705.705 0 0 0-.156.443v.057a.719.719 0 0 0 .006.083v-.006c.01.125.05.247.114.355.215.355.618.526 1.305.281a1.546 1.546 0 0 0 .925-1.426l-.001-8.983h-1.74a6.578 6.578 0 0 1 .173 1.409h-1.858a4.693 4.693 0 0 0-.636-1.61 4.71 4.71 0 0 0-1.145-1.294 4.758 4.758 0 0 0-2.869-1.106v1.928a2.997 2.997 0 0 1 1.168.333 2.998 2.998 0 0 1 1.31 1.479c.278.615.336 1.313.166 1.971a2.998 2.998 0 0 1-2.645 2.307v1.847a4.754 4.754 0 0 0 4.356-3.643 4.76 4.76 0 0 0-1.039-4.189v.073h1.902a6.888 6.888 0 0 0-.131-1.533h3.745V4.855a6.606 6.606 0 0 0 1.272.125h.061V3h-2.307c.047-.018.085-.038.132-.056" />
        </svg>
      );
    case "Facebook Reels":
      return <Facebook size={14} />;
    case "Twitter (X)":
      return <Twitter size={14} />;
    case "Snapchat":
      return <SnapchatIcon size={14} />;
    default:
      return null;
  }
};

const getPlatformBadgeClass = (platform: Platform) => {
  switch (platform) {
    case "Instagram Reels":
      return "bg-instagram text-white";
    case "YouTube Shorts":
      return "bg-youtube text-white";
    case "TikTok":
      return "bg-tiktok text-black";
    case "Facebook Reels":
      return "bg-facebook text-white";
    case "Twitter (X)":
      return "bg-twitter text-white";
    case "Snapchat":
      return "bg-snapchat text-black";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

const ContentCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedPosts, setSelectedPosts] = useState<ScheduledPost[]>([]);

  // Function to determine if a date has posts
  const isDayWithPost = (day: Date): boolean => {
    return mockScheduledPosts.some(
      (post) => 
        post.date.getDate() === day.getDate() &&
        post.date.getMonth() === day.getMonth() &&
        post.date.getFullYear() === day.getFullYear()
    );
  };

  // Update selected posts when date changes
  React.useEffect(() => {
    if (selectedDate) {
      const postsOnDate = mockScheduledPosts.filter(
        (post) => 
          post.date.getDate() === selectedDate.getDate() &&
          post.date.getMonth() === selectedDate.getMonth() &&
          post.date.getFullYear() === selectedDate.getFullYear()
      );
      setSelectedPosts(postsOnDate);
    } else {
      setSelectedPosts([]);
    }
  }, [selectedDate]);

  return (
    <div className="grid md:grid-cols-7 gap-6">
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Content Calendar</CardTitle>
          <CardDescription>Select a date to see scheduled posts</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="pointer-events-auto"
            modifiers={{
              withContent: (date) => isDayWithPost(date),
            }}
            modifiersClassNames={{
              withContent: "font-bold text-primary relative after:content-['•'] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:text-primary after:text-sm",
            }}
          />
        </CardContent>
      </Card>
      
      <Card className="md:col-span-4">
        <CardHeader>
          <CardTitle>
            {selectedDate ? (
              <>
                Posts for {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                {selectedPosts.length > 0 && (
                  <Badge variant="outline" className="ml-2">
                    {selectedPosts.length} posts
                  </Badge>
                )}
              </>
            ) : (
              "Select a date to see posts"
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedPosts.length > 0 ? (
            <div className="space-y-4">
              {selectedPosts.map((post) => (
                <div 
                  key={post.id}
                  className="p-4 rounded-lg border hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{post.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {post.date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <Badge 
                      variant={post.status === "scheduled" ? "outline" : post.status === "posted" ? "default" : "destructive"}
                    >
                      {post.status === "scheduled" ? "Scheduled" : post.status === "posted" ? "Posted" : "Failed"}
                    </Badge>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-1">
                    {post.platforms.map((platform) => (
                      <Badge 
                        key={platform} 
                        className={cn("flex items-center gap-1", getPlatformBadgeClass(platform))}
                      >
                        {getPlatformIcon(platform)}
                        <span className="text-xs">{platform.split(" ")[0]}</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {selectedDate ? "No posts scheduled for this day" : "Select a date to view scheduled posts"}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentCalendar;
