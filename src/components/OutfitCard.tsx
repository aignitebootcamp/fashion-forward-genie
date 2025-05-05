
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Calendar } from "lucide-react";
import { useState } from "react";
import type { ClothingItem } from "./WardrobeItem";

export type Outfit = {
  id: string;
  name: string;
  items: ClothingItem[];
  occasion: string;
  season: string;
  rating?: number;
  imageUrl?: string;
};

interface OutfitCardProps {
  outfit: Outfit;
  onClick?: () => void;
}

const OutfitCard = ({ outfit, onClick }: OutfitCardProps) => {
  const [liked, setLiked] = useState(false);
  
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
  };
  
  const handleAddToCalendar = (e: React.MouseEvent) => {
    e.stopPropagation();
    // This would typically open a date picker or add to today
    console.log("Add outfit to calendar");
  };

  return (
    <Card 
      className="overflow-hidden card-hover cursor-pointer" 
      onClick={onClick}
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-muted">
        {outfit.imageUrl ? (
          <img 
            src={outfit.imageUrl} 
            alt={outfit.name} 
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="grid grid-cols-2 grid-rows-2 h-full">
            {outfit.items.slice(0, 4).map((item, index) => (
              <div key={item.id} className="relative overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium">{outfit.name}</h3>
            <div className="flex gap-1 mt-1">
              <Badge variant="outline">{outfit.occasion}</Badge>
              <Badge variant="outline">{outfit.season}</Badge>
            </div>
          </div>
          <div className="flex gap-1">
            <Button 
              size="icon" 
              variant={liked ? "default" : "ghost"} 
              className="h-8 w-8"
              onClick={handleLike}
            >
              <Heart className={liked ? "fill-current" : ""} size={16} />
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8"
              onClick={handleAddToCalendar}
            >
              <Calendar size={16} />
            </Button>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {outfit.items.length} items
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OutfitCard;
