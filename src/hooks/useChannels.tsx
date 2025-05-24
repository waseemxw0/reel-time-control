
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Channel {
  id: string;
  account: string;
  platform: string;
  is_active: boolean;
}

export const useChannels = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const { data, error } = await supabase
          .from('channels')
          .select('id, account, platform, is_active')
          .eq('is_active', true)
          .order('account');

        if (error) {
          console.error('Error fetching channels:', error);
          toast({
            title: "Error loading channels",
            description: "Failed to load account options",
            variant: "destructive"
          });
          return;
        }

        setChannels(data || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChannels();
  }, [toast]);

  return { channels, isLoading };
};
