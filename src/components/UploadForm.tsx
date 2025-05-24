
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
import { useToast } from "@/hooks/use-toast";
import { useChannels } from "@/hooks/useChannels";
import { supabase } from "@/integrations/supabase/client";
import { 
  Calendar as CalendarIcon, 
  Clock,
  Upload,
  StickyNote,
  Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils";
import MultiSelect from "./MultiSelect";
import CaptionOptimizer from "./CaptionOptimizer";

const UploadForm: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [selectedPostTypes, setSelectedPostTypes] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("12:00");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>("");
  const [contentIntent, setContentIntent] = useState<string>("Growth");
  const [isExperiment, setIsExperiment] = useState<boolean>(false);
  const { toast } = useToast();
  const { channels, isLoading: channelsLoading } = useChannels();

  // Post type options
  const postTypeOptions = [
    { value: "Reel", label: "Reel" },
    { value: "Story", label: "Story" },
    { value: "Feed Post", label: "Feed Post" },
    { value: "Short", label: "Short" },
    { value: "YouTube Video", label: "YouTube Video" },
    { value: "Carousel", label: "Carousel" },
    { value: "Tweet", label: "Tweet" }
  ];

  // Convert channels to options format
  const accountOptions = channels.map(channel => ({
    value: channel.account,
    label: `${channel.account} (${channel.platform})`
  }));

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

  const handleCaptionUpdate = (newCaption: string) => {
    setCaption(newCaption);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        description: "Please select at least one account to post to.",
        variant: "destructive"
      });
      return;
    }

    if (selectedPostTypes.length === 0) {
      toast({
        title: "No post types selected",
        description: "Please select at least one post type.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Get authenticated user
      const { data: user } = await supabase.auth.getUser();
      
      if (!user.user) {
        toast({
          title: "Authentication required",
          description: "Please log in to schedule posts.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      const scheduledDateTime = date ? new Date(date) : new Date();
      const [hours, minutes] = time.split(':');
      scheduledDateTime.setHours(parseInt(hours), parseInt(minutes));

      // Create a post row for each account × post type combination
      const postInserts = [];
      for (const account of selectedAccounts) {
        for (const postType of selectedPostTypes) {
          postInserts.push({
            user_id: user.user.id,
            caption,
            account,
            post_type: postType,
            scheduled_date: scheduledDateTime.toISOString(),
            scheduled_time: time,
            notes,
            content_intent: contentIntent,
            is_experiment: isExperiment
          });
        }
      }

      const { error } = await supabase
        .from('posts')
        .insert(postInserts);

      if (error) {
        console.error('Error saving posts:', error);
        toast({
          title: "Error",
          description: "Failed to schedule posts. Please try again.",
          variant: "destructive"
        });
        return;
      }

      const totalPosts = selectedAccounts.length * selectedPostTypes.length;
      toast({
        title: "Posts scheduled!",
        description: `${totalPosts} posts will be posted across ${selectedAccounts.length} accounts on ${format(date!, "PPP")} at ${time}.`,
      });
      
      // Reset form
      setVideoFile(null);
      setThumbnailFile(null);
      setCaption("");
      setSelectedAccounts([]);
      setSelectedPostTypes([]);
      setDate(new Date());
      setTime("12:00");
      setNotes("");
      setContentIntent("Growth");
      setIsExperiment(false);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
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
            <Label>Select Accounts</Label>
            <MultiSelect
              options={accountOptions}
              selected={selectedAccounts}
              onChange={setSelectedAccounts}
              placeholder={channelsLoading ? "Loading accounts..." : "Choose accounts"}
            />
            <p className="text-xs text-muted-foreground">
              {selectedAccounts.length} accounts selected
            </p>
          </div>

          <div className="space-y-2">
            <Label>Post Types</Label>
            <MultiSelect
              options={postTypeOptions}
              selected={selectedPostTypes}
              onChange={setSelectedPostTypes}
              placeholder="Choose post types"
            />
            <p className="text-xs text-muted-foreground">
              {selectedPostTypes.length} post types selected
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="caption">Caption & Hashtags</Label>
            <Textarea 
              id="caption" 
              placeholder="Write your caption here... #hashtags" 
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="min-h-32 resize-y"
            />
            
            <CaptionOptimizer
              caption={caption}
              onCaptionUpdate={handleCaptionUpdate}
            />
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

          {selectedAccounts.length > 0 && selectedPostTypes.length > 0 && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">
                This will create {selectedAccounts.length * selectedPostTypes.length} posts:
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {selectedAccounts.length} accounts × {selectedPostTypes.length} post types
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          type="submit" 
          size="lg" 
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          {isLoading ? "Scheduling..." : "Schedule Posts"}
        </Button>
      </div>
    </form>
  );
};

export default UploadForm;
