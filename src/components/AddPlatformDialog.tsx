
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Platform } from "@/types";

interface AddPlatformDialogProps {
  onAddPlatform: (platformName: string) => void;
}

const AddPlatformDialog: React.FC<AddPlatformDialogProps> = ({
  onAddPlatform,
}) => {
  const [open, setOpen] = useState(false);
  const [platformName, setPlatformName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (platformName.trim()) {
      onAddPlatform(platformName.trim());
      setPlatformName("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs">
          <Plus className="h-3 w-3 mr-1" />
          Add Platform
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Platform</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="platformName">Platform Name</Label>
            <Input
              id="platformName"
              value={platformName}
              onChange={(e) => setPlatformName(e.target.value)}
              placeholder="e.g., Discord, Telegram, etc."
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!platformName.trim()}>
              Add Platform
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPlatformDialog;
