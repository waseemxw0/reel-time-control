
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PostType } from "@/types";
import { Upload } from "lucide-react";

interface PostTypeSelectorProps {
  selectedPostType: PostType;
  onPostTypeChange: (postType: PostType) => void;
}

const PostTypeSelector: React.FC<PostTypeSelectorProps> = ({
  selectedPostType,
  onPostTypeChange,
}) => {
  const postTypes: PostType[] = [
    "Reel / Short",
    "Story",
    "Feed Post (Instagram/Facebook)",
    "YouTube Video (not Short)",
    "Carousel",
    "Tweet / X Video",
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Upload className="h-4 w-4 text-muted-foreground" />
        <Label className="text-sm font-medium">Post As:</Label>
      </div>
      <RadioGroup
        value={selectedPostType}
        onValueChange={(value) => onPostTypeChange(value as PostType)}
        className="grid grid-cols-1 gap-2"
      >
        {postTypes.map((postType) => (
          <div key={postType} className="flex items-center space-x-2">
            <RadioGroupItem value={postType} id={postType} />
            <Label
              htmlFor={postType}
              className="text-sm font-normal cursor-pointer"
            >
              {postType}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default PostTypeSelector;
