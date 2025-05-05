
import { ClothingItem } from "../components/WardrobeItem";
import { Outfit } from "../components/OutfitCard";

export const mockWardrobe: ClothingItem[] = [
  {
    id: "1",
    name: "White Button-Down Shirt",
    category: "Tops",
    color: "#FFFFFF",
    tags: ["formal", "classic", "work"],
    imageUrl: "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Black Slim-Fit Jeans",
    category: "Bottoms",
    color: "#000000",
    tags: ["casual", "everyday", "versatile"],
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Navy Blazer",
    category: "Outerwear",
    color: "#0A2463",
    tags: ["formal", "work", "layering"],
    imageUrl: "https://images.unsplash.com/photo-1585412459212-8258e0e72d52?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Brown Leather Boots",
    category: "Footwear",
    color: "#964B00",
    tags: ["casual", "fall", "durable"],
    imageUrl: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "5",
    name: "Gray Crewneck Sweater",
    category: "Tops",
    color: "#808080",
    tags: ["casual", "cozy", "winter"],
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "6",
    name: "Khaki Chinos",
    category: "Bottoms",
    color: "#C3B091",
    tags: ["casual", "versatile", "spring"],
    imageUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "7",
    name: "Denim Jacket",
    category: "Outerwear",
    color: "#6F8FAF",
    tags: ["casual", "layering", "fall"],
    imageUrl: "https://images.unsplash.com/photo-1580331451062-99ff652288d7?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "8",
    name: "White Sneakers",
    category: "Footwear",
    color: "#FFFFFF",
    tags: ["casual", "everyday", "comfortable"],
    imageUrl: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=500&auto=format&fit=crop"
  }
];

export const mockOutfits: Outfit[] = [
  {
    id: "1",
    name: "Business Casual",
    items: [mockWardrobe[0], mockWardrobe[5], mockWardrobe[7]],
    occasion: "Work",
    season: "All Seasons"
  },
  {
    id: "2",
    name: "Weekend Relaxed",
    items: [mockWardrobe[4], mockWardrobe[1], mockWardrobe[7]],
    occasion: "Casual",
    season: "Fall"
  },
  {
    id: "3",
    name: "Night Out",
    items: [mockWardrobe[0], mockWardrobe[1], mockWardrobe[3]],
    occasion: "Evening",
    season: "Spring"
  },
  {
    id: "4",
    name: "Smart Professional",
    items: [mockWardrobe[0], mockWardrobe[2], mockWardrobe[5], mockWardrobe[3]],
    occasion: "Formal",
    season: "Winter"
  }
];

export const mockInsights = {
  mostWorn: ["Black Slim-Fit Jeans", "White Sneakers", "Gray Crewneck Sweater"],
  colorDistribution: [
    { name: "Black", value: 25 },
    { name: "Blue", value: 20 },
    { name: "White", value: 15 },
    { name: "Gray", value: 15 },
    { name: "Brown", value: 10 },
    { name: "Other", value: 15 }
  ],
  categoryBreakdown: [
    { name: "Tops", value: 35 },
    { name: "Bottoms", value: 25 },
    { name: "Footwear", value: 20 },
    { name: "Outerwear", value: 15 },
    { name: "Accessories", value: 5 }
  ],
  styleStatistics: {
    totalItems: 24,
    favoriteBrands: ["Uniqlo", "Zara", "H&M"],
    averageItemAge: "1.5 years",
    sustainabilityScore: 75
  }
};
