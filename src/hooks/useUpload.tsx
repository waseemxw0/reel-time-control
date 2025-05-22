
import { useState } from 'react';
import { Platform } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface UploadState {
  videoFile: File | null;
  thumbnailFile: File | null;
  caption: string;
  selectedPlatforms: Platform[];
  scheduledDate: Date | undefined;
  scheduledTime: string;
  isUploading: boolean;
}

interface UseUploadReturn {
  state: UploadState;
  setVideoFile: (file: File | null) => void;
  setThumbnailFile: (file: File | null) => void;
  setCaption: (caption: string) => void;
  togglePlatform: (platform: Platform) => void;
  setScheduledDate: (date: Date | undefined) => void;
  setScheduledTime: (time: string) => void;
  schedulePost: () => Promise<boolean>;
  resetForm: () => void;
}

export const useUpload = (): UseUploadReturn => {
  const [state, setState] = useState<UploadState>({
    videoFile: null,
    thumbnailFile: null,
    caption: '',
    selectedPlatforms: [],
    scheduledDate: new Date(),
    scheduledTime: '12:00',
    isUploading: false
  });
  
  const { toast } = useToast();

  const setVideoFile = (file: File | null) => {
    setState(prev => ({ ...prev, videoFile: file }));
  };

  const setThumbnailFile = (file: File | null) => {
    setState(prev => ({ ...prev, thumbnailFile: file }));
  };

  const setCaption = (caption: string) => {
    setState(prev => ({ ...prev, caption }));
  };

  const togglePlatform = (platform: Platform) => {
    setState(prev => ({
      ...prev,
      selectedPlatforms: prev.selectedPlatforms.includes(platform)
        ? prev.selectedPlatforms.filter(p => p !== platform)
        : [...prev.selectedPlatforms, platform]
    }));
  };

  const setScheduledDate = (date: Date | undefined) => {
    setState(prev => ({ ...prev, scheduledDate: date }));
  };

  const setScheduledTime = (time: string) => {
    setState(prev => ({ ...prev, scheduledTime: time }));
  };

  const resetForm = () => {
    setState({
      videoFile: null,
      thumbnailFile: null,
      caption: '',
      selectedPlatforms: [],
      scheduledDate: new Date(),
      scheduledTime: '12:00',
      isUploading: false
    });
  };

  const schedulePost = async (): Promise<boolean> => {
    // Validate required fields
    if (!state.videoFile) {
      toast({
        title: 'Missing content',
        description: 'Please upload a video or image file.',
        variant: 'destructive'
      });
      return false;
    }

    if (state.selectedPlatforms.length === 0) {
      toast({
        title: 'No platforms selected',
        description: 'Please select at least one platform to post to.',
        variant: 'destructive'
      });
      return false;
    }

    if (!state.scheduledDate) {
      toast({
        title: 'Missing date',
        description: 'Please select a posting date.',
        variant: 'destructive'
      });
      return false;
    }

    // Set loading state
    setState(prev => ({ ...prev, isUploading: true }));

    try {
      // This is where we would make API calls to the backend
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const formattedDate = state.scheduledDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });

      toast({
        title: 'Post scheduled!',
        description: `Your content will be posted to ${state.selectedPlatforms.length} platforms on ${formattedDate} at ${state.scheduledTime}.`,
      });

      // Reset form on success
      resetForm();
      return true;
    } catch (error) {
      console.error('Error scheduling post:', error);
      toast({
        title: 'Error',
        description: 'There was an error scheduling your post. Please try again.',
        variant: 'destructive'
      });
      return false;
    } finally {
      setState(prev => ({ ...prev, isUploading: false }));
    }
  };

  return {
    state,
    setVideoFile,
    setThumbnailFile,
    setCaption,
    togglePlatform,
    setScheduledDate,
    setScheduledTime,
    schedulePost,
    resetForm
  };
};

export default useUpload;
