
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Copy, Star, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TemplateItem {
  id: string;
  title: string;
  content: string;
  isFavorite: boolean;
  tags: string[];
}

// Mock data for templates
const initialTemplates: TemplateItem[] = [
  {
    id: "1",
    title: "Product Launch",
    content: "🚀 Exciting news! We just launched our new [PRODUCT]! Check it out here: [LINK] \n\nLet me know what you think in the comments! \n\n#newproduct #launch #excited",
    isFavorite: true,
    tags: ["product", "launch"]
  },
  {
    id: "2",
    title: "Tutorial Introduction",
    content: "👋 Hey everyone! Today I'm showing you how to [TOPIC]. Follow along for a step-by-step guide! \n\n#tutorial #howto #learning",
    isFavorite: false,
    tags: ["tutorial", "educational"]
  },
  {
    id: "3",
    title: "Motivational Quote",
    content: "✨ \"[QUOTE]\" - [AUTHOR] \n\nSometimes we all need a little reminder to keep going. Double tap if you agree! \n\n#motivation #inspiration #mindset",
    isFavorite: true,
    tags: ["quotes", "motivation"]
  }
];

const CaptionTemplates: React.FC = () => {
  const [templates, setTemplates] = useState<TemplateItem[]>(initialTemplates);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard!",
      description: "The template is now ready to paste.",
      duration: 3000
    });
  };

  const toggleFavorite = (id: string) => {
    setTemplates(templates.map(template => 
      template.id === id ? { ...template, isFavorite: !template.isFavorite } : template
    ));
  };

  const filteredTemplates = templates.filter(template => 
    template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Caption & Hashtag Templates</h3>
        <Button size="sm" className="gap-1">
          <Plus size={16} /> New Template
        </Button>
      </div>

      <div className="mb-6">
        <Input 
          placeholder="Search templates by title, content, or tag..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{template.title}</CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={`h-8 w-8 ${template.isFavorite ? 'text-yellow-500' : 'text-muted-foreground'}`}
                  onClick={() => toggleFavorite(template.id)}
                >
                  <Star size={18} fill={template.isFavorite ? "currentColor" : "none"} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0 pb-3">
              <div className="bg-muted/50 rounded p-3 text-sm min-h-[100px] max-h-[150px] overflow-y-auto whitespace-pre-wrap">
                {template.content}
              </div>
              <div className="flex flex-wrap mt-3 gap-1">
                {template.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs bg-secondary px-2 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-0 flex justify-end gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Edit size={16} />
                <span className="sr-only">Edit</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Trash2 size={16} />
                <span className="sr-only">Delete</span>
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleCopy(template.content)}>
                <Copy size={14} className="mr-1" /> Copy
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CaptionTemplates;
