
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
import { Platform, PlatformAccount, PlatformWithAccounts, PostType } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar as CalendarIcon, 
  Clock,
  Upload,
  StickyNote,
  Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils";
import PlatformToggle from "./PlatformToggle";
import { platformsConfig } from "@/config/platforms";
import PostTypeSelector from "./PostTypeSelector";

const UploadForm: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [selectedAccounts, setSelectedAccounts] = useState<PlatformAccount[]>([]);
  const [platforms, setPlatforms] = useState<PlatformWithAccounts[]>(platformsConfig);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("12:00");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>("");
  const [contentIntent, setContentIntent] = useState<string>("Growth");
  const [isExperiment, setIsExperiment] = useState<boolean>(false);
  const [postType, setPostType] = useState<PostType>("Reel / Short");
  const { toast } = useToast();

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

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const handlePlatformAccountsChange = (accounts: PlatformAccount[]) => {
    setSelectedAccounts(accounts);
  };

  const handlePlatformsChange = (newPlatforms: PlatformWithAccounts[]) => {
    setPlatforms(newPlatforms);
  };

  const getSelectedPlatforms = (): Platform[] => {
    const platformsSet = new Set<Platform>();
    selectedAccounts.forEach(account => {
      platformsSet.add(account.platform);
    });
    return Array.from(platformsSet);
  };

  const handlePostTypeChange = (newPostType: PostType) => {
    setPostType(newPostType);
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

    if (selectedAccounts.length === 0) {
      toast({
        title: "No accounts selected",
        description: "Please select at least one platform account to post to.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Here would normally be API calls to your backend
    setTimeout(() => {
      const selectedPlatformsArray = getSelectedPlatforms();
      
      toast({
        title: "Post scheduled!",
        description: `Your ${postType.toLowerCase()} will be posted to ${selectedAccounts.length} accounts across ${selectedPlatformsArray.length} platforms on ${format(date!, "PPP")} at ${time}.`,
      });
      
      // Reset form
      setVideoFile(null);
      setThumbnailFile(null);
      setCaption("");
      setSelectedAccounts([]);
      setDate(new Date());
      setTime("12:00");
      setNotes("");
      setContentIntent("Growth");
      setIsExperiment(false);
      setPostType("Reel / Short");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <PostTypeSelector
            selectedPostType={postType}
            onPostTypeChange={handlePostTypeChange}
          />
          
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
            <Label htmlFor="thumbnail">Thumbnail (optional, for YouTube, LinkedIn)</Label>
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
                    : "Optional custom thumbnail for YouTube/LinkedIn"
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
            <Label>Choose Platforms & Accounts</Label>
            <PlatformToggle 
              platforms={platforms} 
              selectedAccounts={selectedAccounts}
              onChange={handlePlatformAccountsChange}
              onPlatformsChange={handlePlatformsChange}
            />
            <div className="mt-1">
              {selectedAccounts.length > 0 ? (
                <span className="text-xs text-muted-foreground">
                  {selectedAccounts.length} accounts selected across {getSelectedPlatforms().length} platforms
                </span>
              ) : (
                <span className="text-xs text-muted-foreground">No accounts selected</span>
              )}
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

          <div className="space-y-2">
            <Label htmlFor="notes">Post Notes & Strategy</Label>
            <div className="relative">
              <Textarea
                id="notes"
                placeholder="Add notes, strategy reminders, or context about this post..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-20 resize-y pl-9"
              />
              <StickyNote className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="intent">Content Intent</Label>
              <select
                id="intent"
                value={contentIntent}
                onChange={(e) => setContentIntent(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              >
                <option value="Growth">Growth</option>
                <option value="Lead">Lead Generation</option>
                <option value="Brand">Brand Building</option>
                <option value="Viral">Viral Potential</option>
              </select>
            </div>

            <div className="space-y-2 flex items-end">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="experiment"
                  checked={isExperiment}
                  onChange={(e) => setIsExperiment(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="experiment" className="flex items-center space-x-1">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  <span>Track as Experiment</span>
                </Label>
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
