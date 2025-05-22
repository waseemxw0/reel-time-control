
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Platform } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar as CalendarIcon, 
  Clock,
  Check, 
  Upload,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
} from "lucide-react";
import SnapchatIcon from "./icons/SnapchatIcon";
import { cn } from "@/lib/utils";

const UploadForm: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("12:00");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const platforms: { name: Platform; icon: React.ReactNode; class: string }[] = [
    { 
      name: "TikTok", 
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.948 6.558 6.558 0 0 1-1.263-1.948H16.5l.003 13.566a2.918 2.918 0 0 1-1.034 2.229 2.917 2.917 0 0 1-2.237.697 2.933 2.933 0 0 1-2.363-2.466 2.93 2.93 0 0 1 1.92-3.321v2.356a.72.72 0 0 0 .11-.074.822.822 0 0 0 .26-.257.7.7 0 0 0 .068-.31.707.707 0 0 0-.457-.659.712.712 0 0 0-.824.223.705.705 0 0 0-.156.443v.057a.719.719 0 0 0 .006.083v-.006c.01.125.05.247.114.355.215.355.618.526 1.305.281a1.546 1.546 0 0 0 .925-1.426l-.001-8.983h-1.74a6.578 6.578 0 0 1 .173 1.409h-1.858a4.693 4.693 0 0 0-.636-1.61 4.71 4.71 0 0 0-1.145-1.294 4.758 4.758 0 0 0-2.869-1.106v1.928a2.997 2.997 0 0 1 1.168.333 2.998 2.998 0 0 1 1.31 1.479c.278.615.336 1.313.166 1.971a2.998 2.998 0 0 1-2.645 2.307v1.847a4.754 4.754 0 0 0 4.356-3.643 4.76 4.76 0 0 0-1.039-4.189v.073h1.902a6.888 6.888 0 0 0-.131-1.533h3.745V4.855a6.606 6.606 0 0 0 1.272.125h.061V3h-2.307c.047-.018.085-.038.132-.056"/></svg>, 
      class: "tiktok-badge"
    },
    { 
      name: "YouTube Shorts", 
      icon: <Youtube size={18} />, 
      class: "youtube-badge"
    },
    { 
      name: "Instagram Reels", 
      icon: <Instagram size={18} />, 
      class: "instagram-badge"
    },
    { 
      name: "Facebook Reels", 
      icon: <Facebook size={18} />, 
      class: "facebook-badge"
    },
    { 
      name: "Twitter (X)", 
      icon: <Twitter size={18} />, 
      class: "twitter-badge"
    },
    { 
      name: "Snapchat", 
      icon: <SnapchatIcon size={18} />, 
      class: "snapchat-badge"
    },
  ];

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnailFile(e.target.files[0]);
    }
  };

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!videoFile) {
      toast({
        title: "Missing content",
        description: "Please upload a video or image file.",
        variant: "destructive"
      });
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast({
        title: "No platforms selected",
        description: "Please select at least one platform to post to.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Here would normally be API calls to your backend
    setTimeout(() => {
      toast({
        title: "Post scheduled!",
        description: `Your content will be posted to ${selectedPlatforms.length} platforms on ${format(date!, "PPP")} at ${time}.`,
      });
      
      // Reset form
      setVideoFile(null);
      setThumbnailFile(null);
      setCaption("");
      setSelectedPlatforms([]);
      setDate(new Date());
      setTime("12:00");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="video">Content</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
              <Input 
                id="video" 
                type="file" 
                className="hidden"
                onChange={handleVideoChange}
                accept="video/*,image/*"
              />
              <Label htmlFor="video" className="cursor-pointer flex flex-col items-center">
                <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {videoFile ? videoFile.name : "Upload video or image"}
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  {videoFile 
                    ? `${(videoFile.size / (1024 * 1024)).toFixed(2)} MB` 
                    : "Drag and drop or click to browse"
                  }
                </p>
              </Label>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail (optional, for YouTube)</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
              <Input 
                id="thumbnail" 
                type="file" 
                className="hidden" 
                onChange={handleThumbnailChange}
                accept="image/*"
              />
              <Label htmlFor="thumbnail" className="cursor-pointer flex flex-col items-center">
                <Upload className="h-6 w-6 mb-2 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {thumbnailFile ? thumbnailFile.name : "Upload thumbnail image"}
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  {thumbnailFile 
                    ? `${(thumbnailFile.size / (1024 * 1024)).toFixed(2)} MB` 
                    : "Optional custom thumbnail for YouTube"
                  }
                </p>
              </Label>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="caption">Caption & Hashtags</Label>
            <Textarea 
              id="caption" 
              placeholder="Write your caption here... #hashtags" 
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="min-h-32 resize-y"
            />
          </div>

          <div className="space-y-2">
            <Label>Choose Platforms</Label>
            <div className="flex flex-wrap gap-3">
              {platforms.map((platform) => (
                <div 
                  key={platform.name}
                  onClick={() => togglePlatform(platform.name)}
                  className={cn(
                    "platform-badge",
                    platform.class,
                    selectedPlatforms.includes(platform.name) && "selected"
                  )}
                  title={platform.name}
                >
                  {platform.icon}
                  {selectedPlatforms.includes(platform.name) && (
                    <span className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Post Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Post Time</Label>
              <div className="relative">
                <Input 
                  id="time" 
                  type="time" 
                  value={time} 
                  onChange={handleTimeChange}
                  className="pl-9"
                />
                <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          type="submit" 
          size="lg" 
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          {isLoading ? "Scheduling..." : "Schedule Post"}
        </Button>
      </div>
    </form>
  );
};

export default UploadForm;
