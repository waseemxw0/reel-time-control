
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Zap, 
  Sync, 
  Calendar as CalendarIcon,
  Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  type: "spike" | "failsafe" | "expiry" | "viral";
  platform: string;
  account: string;
  message: string;
  timestamp: Date;
  status: "new" | "seen" | "resolved";
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "spike",
    platform: "TikTok",
    account: "@tiktok_main",
    message: "Engagement spike detected! Your post is getting 3.2x more likes than usual.",
    timestamp: new Date(2025, 4, 22, 15, 45),
    status: "new"
  },
  {
    id: "2",
    type: "failsafe",
    platform: "Instagram Reels",
    account: "@ig_main",
    message: "Post failed to publish. Automatic retry scheduled in 15 minutes.",
    timestamp: new Date(2025, 4, 22, 14, 30),
    status: "resolved"
  },
  {
    id: "3",
    type: "expiry",
    platform: "Facebook Reels",
    account: "@fb_main",
    message: "API token will expire in 3 days. Please renew to avoid service interruption.",
    timestamp: new Date(2025, 4, 22, 10, 15),
    status: "seen"
  },
  {
    id: "4",
    type: "viral",
    platform: "YouTube Shorts",
    account: "@yt_motivation",
    message: "Your video has been picked up by the algorithm! Views up 500% in the last hour.",
    timestamp: new Date(2025, 4, 22, 9, 0),
    status: "new"
  }
];

const getAlertIcon = (type: Alert["type"]) => {
  switch (type) {
    case "spike":
      return <Zap className="h-5 w-5 text-amber-500" />;
    case "failsafe":
      return <Sync className="h-5 w-5 text-blue-500" />;
    case "expiry":
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    case "viral":
      return <Zap className="h-5 w-5 text-purple-500" />;
    default:
      return <Bell className="h-5 w-5 text-gray-500" />;
  }
};

const getAlertStatusBadge = (status: Alert["status"]) => {
  switch (status) {
    case "new":
      return <Badge variant="default" className="bg-blue-500">New</Badge>;
    case "seen":
      return <Badge variant="outline" className="border-amber-500 text-amber-500">Seen</Badge>;
    case "resolved":
      return <Badge variant="outline" className="border-green-500 text-green-500">Resolved</Badge>;
    default:
      return null;
  }
};

const EngagementAlerts: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Spike Alerts & Failsafes</CardTitle>
            <CardDescription>Real-time notifications and automated recovery</CardDescription>
          </div>
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            {mockAlerts.filter(alert => alert.status === "new").length} New
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockAlerts.map((alert) => (
            <div 
              key={alert.id} 
              className={cn(
                "p-4 border rounded-lg flex items-start gap-3",
                alert.status === "new" ? "border-blue-200 bg-blue-50" : "border-gray-200"
              )}
            >
              <div className="flex-shrink-0 mt-1">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <div className="font-medium">
                    {alert.platform} - {alert.account}
                  </div>
                  {getAlertStatusBadge(alert.status)}
                </div>
                <p className="text-sm mt-1">
                  {alert.message}
                </p>
                <div className="flex items-center mt-2 text-xs text-muted-foreground">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  <span>
                    {alert.timestamp.toLocaleDateString()}
                  </span>
                  <Clock className="h-3 w-3 ml-2 mr-1" />
                  <span>
                    {alert.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementAlerts;
