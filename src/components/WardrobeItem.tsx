
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type ClothingItem = {
  id: string;
  name: string;
  category: string;
  color: string;
  tags: string[];
  imageUrl: string;
};

interface WardrobeItemProps {
  item: ClothingItem;
  onClick?: () => void;
  className?: string;
  selected?: boolean;
}

const WardrobeItem = ({ item, onClick, className, selected = false }: WardrobeItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={cn(
        "card-hover cursor-pointer overflow-hidden", 
        selected && "ring-2 ring-primary", 
        className
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img 
          src={item.imageUrl} 
          alt={item.name}
          className={cn(
            "object-cover w-full h-full transition-all duration-300",
            isHovered && "scale-105"
          )}
        />
      </div>
      <CardContent className="p-3">
        <h3 className="text-sm font-medium line-clamp-1">{item.name}</h3>
        <div className="flex items-center gap-1 mt-1">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: item.color }} 
          />
          <span className="text-xs text-muted-foreground">{item.category}</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {item.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
          {item.tags.length > 2 && (
            <Badge variant="outline" className="text-xs">+{item.tags.length - 2}</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WardrobeItem;
