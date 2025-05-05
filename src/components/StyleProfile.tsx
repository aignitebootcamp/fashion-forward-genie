
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type StyleTag = {
  id: string;
  name: string;
  category: "style" | "color" | "occasion";
};

const STYLE_TAGS: StyleTag[] = [
  { id: "casual", name: "Casual", category: "style" },
  { id: "formal", name: "Formal", category: "style" },
  { id: "vintage", name: "Vintage", category: "style" },
  { id: "minimalist", name: "Minimalist", category: "style" },
  { id: "streetwear", name: "Streetwear", category: "style" },
  { id: "bohemian", name: "Bohemian", category: "style" },
  { id: "preppy", name: "Preppy", category: "style" },
  { id: "athleisure", name: "Athleisure", category: "style" },
  
  { id: "black", name: "Black", category: "color" },
  { id: "white", name: "White", category: "color" },
  { id: "blue", name: "Blue", category: "color" },
  { id: "green", name: "Green", category: "color" },
  { id: "burgundy", name: "Burgundy", category: "color" },
  { id: "beige", name: "Beige", category: "color" },
  { id: "neutrals", name: "Neutrals", category: "color" },
  { id: "pastels", name: "Pastels", category: "color" },
  
  { id: "work", name: "Work", category: "occasion" },
  { id: "date-night", name: "Date Night", category: "occasion" },
  { id: "weekend", name: "Weekend", category: "occasion" },
  { id: "party", name: "Party", category: "occasion" },
  { id: "outdoor", name: "Outdoor", category: "occasion" },
  { id: "travel", name: "Travel", category: "occasion" },
];

const StyleProfile = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };
  
  return (
    <Card className="border">
      <CardHeader>
        <CardTitle className="text-xl">Your Style Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-md font-medium mb-2">Preferred Styles</h3>
            <div className="flex flex-wrap gap-2">
              {STYLE_TAGS.filter(tag => tag.category === "style").map((tag) => (
                <Badge 
                  key={tag.id}
                  variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag.id)}
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium mb-2">Color Palette</h3>
            <div className="flex flex-wrap gap-2">
              {STYLE_TAGS.filter(tag => tag.category === "color").map((tag) => (
                <Badge 
                  key={tag.id}
                  variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag.id)}
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium mb-2">Common Occasions</h3>
            <div className="flex flex-wrap gap-2">
              {STYLE_TAGS.filter(tag => tag.category === "occasion").map((tag) => (
                <Badge 
                  key={tag.id}
                  variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag.id)}
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
          
          <Button className="w-full mt-4">Update Style Profile</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StyleProfile;
