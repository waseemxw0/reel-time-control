
import React, { useState } from "react";
import { Check } from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { PlatformWithAccounts, Platform, PlatformAccount } from "@/types";
import { cn } from "@/lib/utils";
import { platformStyleMap } from "@/config/platforms";
import PlatformIcon from "./PlatformIcon";

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

  const getPlatformBadgeClass = (platform: Platform) => {
    return platformStyleMap[platform] || "";
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
                  <PlatformIcon platform={platformObj.name} />
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
