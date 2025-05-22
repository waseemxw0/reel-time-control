
import React from "react";
import Header from "@/components/Header";
import UploadForm from "@/components/UploadForm";
import ContentCalendar from "@/components/ContentCalendar";
import RecentPostsTable from "@/components/RecentPostsTable";
import MediaLibrary from "@/components/MediaLibrary";
import CaptionTemplates from "@/components/CaptionTemplates";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4 md:px-6">
        <div className="space-y-8">
          <section>
            <div className="mb-6">
              <h2 className="text-3xl font-bold">Dashboard</h2>
              <p className="text-muted-foreground">
                Control and automate your social media posting across platforms
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-lg shadow-md text-white">
                <div className="text-4xl font-bold mb-1">5</div>
                <div className="text-sm opacity-90">Scheduled Posts</div>
              </div>
              <div className="bg-gradient-to-br from-tiktok to-cyan-400 p-6 rounded-lg shadow-md text-black">
                <div className="text-4xl font-bold mb-1">38.2K</div>
                <div className="text-sm opacity-90">TikTok Views</div>
              </div>
              <div className="bg-gradient-to-br from-instagram to-purple-700 p-6 rounded-lg shadow-md text-white">
                <div className="text-4xl font-bold mb-1">24.5K</div>
                <div className="text-sm opacity-90">Instagram Views</div>
              </div>
              <div className="bg-gradient-to-br from-youtube to-red-500 p-6 rounded-lg shadow-md text-white">
                <div className="text-4xl font-bold mb-1">15.7K</div>
                <div className="text-sm opacity-90">YouTube Views</div>
              </div>
            </div>
          </section>
          
          <Tabs defaultValue="upload" className="space-y-8">
            <TabsList>
              <TabsTrigger value="upload">Upload Content</TabsTrigger>
              <TabsTrigger value="calendar">Content Calendar</TabsTrigger>
              <TabsTrigger value="stats">Performance Stats</TabsTrigger>
              <TabsTrigger value="library">Media Library</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Upload Content</h3>
                <UploadForm />
              </div>
            </TabsContent>
            
            <TabsContent value="calendar" className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Scheduled Content Calendar</h3>
                <ContentCalendar />
              </div>
            </TabsContent>
            
            <TabsContent value="stats" className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Recent Posts & Stats</h3>
                <RecentPostsTable />
              </div>
            </TabsContent>

            <TabsContent value="library" className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <MediaLibrary />
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <CaptionTemplates />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="border-t py-4 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <p>© 2025 Creator Command Center. All rights reserved.</p>
            </div>
            <div className="flex gap-4 mt-3 md:mt-0">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Help Center</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
