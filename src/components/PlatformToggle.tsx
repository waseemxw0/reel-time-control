
import React, { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { PlatformWithAccounts, Platform, PlatformAccount } from "@/types";
import { cn } from "@/lib/utils";
import { Instagram, Youtube, Twitter, Facebook, Linkedin } from "lucide-react";
import SnapchatIcon from "./icons/SnapchatIcon";
import PinterestIcon from "./icons/PinterestIcon";

interface PlatformToggleProps {
  platforms: PlatformWithAccounts[];
  selectedAccounts: PlatformAccount[];
  onChange: (accounts: PlatformAccount[]) => void;
}

const PlatformToggle: React.FC<PlatformToggleProps> = ({
  platforms,
  selectedAccounts,
  onChange,
}) => {
  const [openPlatform, setOpenPlatform] = useState<Platform | null>(null);

  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case "TikTok":
        return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.948 6.558 6.558 0 0 1-1.263-1.948H16.5l.003 13.566a2.918 2.918 0 0 1-1.034 2.229 2.917 2.917 0 0 1-2.237.697 2.933 2.933 0 0 1-2.363-2.466 2.93 2.93 0 0 1 1.92-3.321v2.356a.72.72 0 0 0 .11-.074.822.822 0 0 0 .26-.257.7.7 0 0 0 .068-.31.707.707 0 0 0-.457-.659.712.712 0 0 0-.824.223.705.705 0 0 0-.156.443v.057a.719.719 0 0 0 .006.083v-.006c.01.125.05.247.114.355.215.355.618.526 1.305.281a1.546 1.546 0 0 0 .925-1.426l-.001-8.983h-1.74a6.578 6.578 0 0 1 .173 1.409h-1.858a4.693 4.693 0 0 0-.636-1.61 4.71 4.71 0 0 0-1.145-1.294 4.758 4.758 0 0 0-2.869-1.106v1.928a2.997 2.997 0 0 1 1.168.333 2.998 2.998 0 0 1 1.31 1.479c.278.615.336 1.313.166 1.971a2.998 2.998 0 0 1-2.645 2.307v1.847a4.754 4.754 0 0 0 4.356-3.643 4.76 4.76 0 0 0-1.039-4.189v.073h1.902a6.888 6.888 0 0 0-.131-1.533h3.745V4.855a6.606 6.606 0 0 0 1.272.125h.061V3h-2.307c.047-.018.085-.038.132-.056"/></svg>;
      case "YouTube Shorts":
        return <Youtube size={18} />;
      case "Instagram Reels":
        return <Instagram size={18} />;
      case "Facebook Reels":
        return <Facebook size={18} />;
      case "Twitter (X)":
        return <Twitter size={18} />;
      case "Snapchat":
        return <SnapchatIcon size={18} />;
      case "Pinterest":
        return <PinterestIcon size={18} />;
      case "LinkedIn":
        return <Linkedin size={18} />;
      default:
        return null;
    }
  };

  const getPlatformBadgeClass = (platform: Platform) => {
    switch (platform) {
      case "TikTok":
        return "tiktok-badge";
      case "YouTube Shorts":
        return "youtube-badge";
      case "Instagram Reels":
        return "instagram-badge";
      case "Facebook Reels":
        return "facebook-badge";
      case "Twitter (X)":
        return "twitter-badge";
      case "Snapchat":
        return "snapchat-badge";
      case "Pinterest":
        return "pinterest-badge";
      case "LinkedIn":
        return "linkedin-badge";
      default:
        return "";
    }
  };

  const isPlatformSelected = (platform: Platform) => {
    return selectedAccounts.some(account => account.platform === platform);
  };

  const isAccountSelected = (platform: Platform, accountName: string) => {
    return selectedAccounts.some(
      account => account.platform === platform && account.accountName === accountName
    );
  };

  const handleToggleAccount = (platform: Platform, accountName: string) => {
    const isSelected = isAccountSelected(platform, accountName);
    let newSelectedAccounts: PlatformAccount[];

    if (isSelected) {
      // Remove this account
      newSelectedAccounts = selectedAccounts.filter(
        account => !(account.platform === platform && account.accountName === accountName)
      );
    } else {
      // Add this account
      newSelectedAccounts = [
        ...selectedAccounts,
        { platform, accountName }
      ];
    }

    onChange(newSelectedAccounts);
  };

  const handleSelectAllPlatform = (platform: Platform, accounts: string[]) => {
    // First remove all accounts of this platform
    const filteredAccounts = selectedAccounts.filter(
      account => account.platform !== platform
    );

    // Then add all accounts of this platform
    const accountsToAdd = accounts.map(accountName => ({
      platform,
      accountName
    }));

    onChange([...filteredAccounts, ...accountsToAdd]);
  };

  const handleDeselectAllPlatform = (platform: Platform) => {
    const filteredAccounts = selectedAccounts.filter(
      account => account.platform !== platform
    );
    onChange(filteredAccounts);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {platforms.map((platformObj) => {
          const platformSelected = isPlatformSelected(platformObj.name);
          const selectedAccountsForPlatform = selectedAccounts.filter(
            account => account.platform === platformObj.name
          );
          
          return (
            <Popover 
              key={platformObj.name} 
              open={openPlatform === platformObj.name}
              onOpenChange={(open) => setOpenPlatform(open ? platformObj.name : null)}
            >
              <PopoverTrigger asChild>
                <div
                  className={cn(
                    "platform-badge relative cursor-pointer",
                    getPlatformBadgeClass(platformObj.name),
                    platformSelected && "selected"
                  )}
                  title={`${platformObj.name} (${selectedAccountsForPlatform.length}/${platformObj.accounts.length} accounts)`}
                >
                  {getPlatformIcon(platformObj.name)}
                  {platformSelected && (
                    <span className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </span>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-0" align="start">
                <div className="p-2 border-b">
                  <div className="font-medium">{platformObj.name}</div>
                  <div className="text-xs text-muted-foreground">{selectedAccountsForPlatform.length} of {platformObj.accounts.length} selected</div>
                </div>
                <div className="p-2">
                  <div className="space-y-2">
                    {platformObj.accounts.map((accountName) => (
                      <div key={accountName} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${platformObj.name}-${accountName}`}
                          checked={isAccountSelected(platformObj.name, accountName)}
                          onCheckedChange={() => handleToggleAccount(platformObj.name, accountName)}
                        />
                        <label
                          htmlFor={`${platformObj.name}-${accountName}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {accountName}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-2 border-t flex justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSelectAllPlatform(platformObj.name, platformObj.accounts)}
                    className="text-xs"
                  >
                    Select All
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeselectAllPlatform(platformObj.name)}
                    className="text-xs"
                  >
                    Clear
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          );
        })}
      </div>
    </div>
  );
};

export default PlatformToggle;
