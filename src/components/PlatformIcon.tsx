
import React from "react";
import { Platform } from "@/types";
import { Instagram, Youtube, Twitter, Facebook, Linkedin } from "lucide-react";
import SnapchatIcon from "./icons/SnapchatIcon";
import PinterestIcon from "./icons/PinterestIcon";
import { platformIconMap } from "@/config/platforms";

interface PlatformIconProps {
  platform: Platform;
  size?: number;
  className?: string;
}

const PlatformIcon: React.FC<PlatformIconProps> = ({ 
  platform, 
  size = 18, 
  className 
}) => {
  const iconType = platformIconMap[platform];

  switch (iconType) {
    case "tiktok":
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="currentColor"
          className={className}
        >
          <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.948 6.558 6.558 0 0 1-1.263-1.948H16.5l.003 13.566a2.918 2.918 0 0 1-1.034 2.229 2.917 2.917 0 0 1-2.237.697 2.933 2.933 0 0 1-2.363-2.466 2.93 2.93 0 0 1 1.92-3.321v2.356a.72.72 0 0 0 .11-.074.822.822 0 0 0 .26-.257.7.7 0 0 0 .068-.31.707.707 0 0 0-.457-.659.712.712 0 0 0-.824.223.705.705 0 0 0-.156.443v.057a.719.719 0 0 0 .006.083v-.006c.01.125.05.247.114.355.215.355.618.526 1.305.281a1.546 1.546 0 0 0 .925-1.426l-.001-8.983h-1.74a6.578 6.578 0 0 1 .173 1.409h-1.858a4.693 4.693 0 0 0-.636-1.61 4.71 4.71 0 0 0-1.145-1.294 4.758 4.758 0 0 0-2.869-1.106v1.928a2.997 2.997 0 0 1 1.168.333 2.998 2.998 0 0 1 1.31 1.479c.278.615.336 1.313.166 1.971a2.998 2.998 0 0 1-2.645 2.307v1.847a4.754 4.754 0 0 0 4.356-3.643 4.76 4.76 0 0 0-1.039-4.189v.073h1.902a6.888 6.888 0 0 0-.131-1.533h3.745V4.855a6.606 6.606 0 0 0 1.272.125h.061V3h-2.307c.047-.018.085-.038.132-.056"/>
        </svg>
      );
    case "youtube":
      return <Youtube size={size} className={className} />;
    case "instagram":
      return <Instagram size={size} className={className} />;
    case "facebook":
      return <Facebook size={size} className={className} />;
    case "twitter":
      return <Twitter size={size} className={className} />;
    case "snapchat":
      return <SnapchatIcon size={size} className={className} />;
    case "pinterest":
      return <PinterestIcon size={size} className={className} />;
    case "linkedin":
      return <Linkedin size={size} className={className} />;
    default:
      return <div className={className} style={{ width: size, height: size }}>?</div>;
  }
};

export default PlatformIcon;
