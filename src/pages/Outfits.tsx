
import { useState } from "react";
import Navbar from "@/components/Navbar";
import OutfitCard, { Outfit } from "@/components/OutfitCard";
import WardrobeItem, { ClothingItem } from "@/components/WardrobeItem";
import { mockWardrobe, mockOutfits } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2, Plus, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Outfits = () => {
  const [outfits, setOutfits] = useState<Outfit[]>(mockOutfits);
  const [selectedItems, setSelectedItems] = useState<ClothingItem[]>([]);
  const [filter, setFilter] = useState<string>("all");
  
  const handleItemClick = (item: ClothingItem) => {
    if (selectedItems.some(i => i.id === item.id)) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  
  const createOutfit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const name = formData.get("outfitName") as string;
    const occasion = formData.get("occasion") as string;
    const season = formData.get("season") as string;
    
    const newOutfit: Outfit = {
      id: `${outfits.length + 1}`,
      name,
      items: selectedItems,
      occasion,
      season
    };
    
    setOutfits([newOutfit, ...outfits]);
    setSelectedItems([]);
    
    // Close the dialog
    const form = event.currentTarget;
    form.reset();
    const closeButton = document.getElementById("closeOutfitDialog");
    if (closeButton) {
      closeButton.click();
    }
  };
  
  const generateOutfit = () => {
    // In a real app, this would call an AI service to generate an outfit
    const randomItems = [...mockWardrobe].sort(() => 0.5 - Math.random()).slice(0, 3);
    
    const newOutfit: Outfit = {
      id: `${outfits.length + 1}`,
      name: "AI Generated Outfit",
      items: randomItems,
      occasion: "Casual",
      season: "All Seasons"
    };
    
    setOutfits([newOutfit, ...outfits]);
  };
  
  const filteredOutfits = outfits.filter(outfit => {
    if (filter === "all") return true;
    return outfit.occasion === filter || outfit.season === filter;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Outfit Ideas</h1>
            <p className="text-muted-foreground">Create your own outfits or get suggestions</p>
          </div>
          
          <div className="flex gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" /> Create Outfit
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Outfit</DialogTitle>
                </DialogHeader>
                <form onSubmit={createOutfit} className="py-4">
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <div>
                        <Label htmlFor="outfitName">Outfit Name</Label>
                        <Input id="outfitName" name="outfitName" required />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="occasion">Occasion</Label>
                          <Select name="occasion" defaultValue="Casual">
                            <SelectTrigger>
                              <SelectValue placeholder="Select occasion" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Casual">Casual</SelectItem>
                              <SelectItem value="Work">Work</SelectItem>
                              <SelectItem value="Formal">Formal</SelectItem>
                              <SelectItem value="Evening">Evening</SelectItem>
                              <SelectItem value="Sports">Sports</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="season">Season</Label>
                          <Select name="season" defaultValue="All Seasons">
                            <SelectTrigger>
                              <SelectValue placeholder="Select season" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="All Seasons">All Seasons</SelectItem>
                              <SelectItem value="Spring">Spring</SelectItem>
                              <SelectItem value="Summer">Summer</SelectItem>
                              <SelectItem value="Fall">Fall</SelectItem>
                              <SelectItem value="Winter">Winter</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Select Items</Label>
                      <div className="mt-2 h-[250px] overflow-y-auto">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {mockWardrobe.map(item => (
                            <WardrobeItem 
                              key={item.id} 
                              item={item} 
                              onClick={() => handleItemClick(item)}
                              selected={selectedItems.some(i => i.id === item.id)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Selected Items: {selectedItems.length}</p>
                        {selectedItems.length === 0 && (
                          <p className="text-xs text-muted-foreground">Please select at least one item</p>
                        )}
                      </div>
                      <div className="flex gap-3">
                        <Button id="closeOutfitDialog" type="button" variant="outline">
                          Cancel
                        </Button>
                        <Button type="submit" disabled={selectedItems.length === 0}>
                          Create Outfit
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
            
            <Button onClick={generateOutfit}>
              <Wand2 className="mr-2 h-4 w-4" /> Generate Outfit
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setFilter("all")}>All</TabsTrigger>
              <TabsTrigger value="casual" onClick={() => setFilter("Casual")}>Casual</TabsTrigger>
              <TabsTrigger value="work" onClick={() => setFilter("Work")}>Work</TabsTrigger>
              <TabsTrigger value="formal" onClick={() => setFilter("Formal")}>Formal</TabsTrigger>
              <TabsTrigger value="seasonal" onClick={() => setFilter("Fall")}>Fall</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredOutfits.map((outfit) => (
            <OutfitCard key={outfit.id} outfit={outfit} />
          ))}
          
          {filteredOutfits.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">No outfits found for the selected filter.</p>
              <Button variant="outline" onClick={() => setFilter("all")}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Outfits;
