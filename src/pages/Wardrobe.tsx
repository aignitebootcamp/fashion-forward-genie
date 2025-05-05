
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import WardrobeItem, { ClothingItem } from "@/components/WardrobeItem";
import { mockWardrobe } from "@/data/mockData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ItemUploader from "@/components/ItemUploader";
import { Plus, Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Wardrobe = () => {
  const [items, setItems] = useState<ClothingItem[]>(mockWardrobe);
  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [newItemImage, setNewItemImage] = useState<string | null>(null);
  
  const handleUpload = (_file: File, previewUrl: string) => {
    setNewItemImage(previewUrl);
  };
  
  const addNewItem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const color = formData.get("color") as string;
    const tags = (formData.get("tags") as string).split(",").map(tag => tag.trim());
    
    const newItem: ClothingItem = {
      id: `${items.length + 1}`,
      name,
      category,
      color,
      tags,
      imageUrl: newItemImage || "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=500&auto=format&fit=crop"
    };
    
    setItems([newItem, ...items]);
    setNewItemImage(null);
    
    // Close the dialog
    const form = event.currentTarget;
    form.reset();
    const closeButton = document.getElementById("closeDialog");
    if (closeButton) {
      closeButton.click();
    }
  };
  
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(filter.toLowerCase()) || 
                         item.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Wardrobe</h1>
            <p className="text-muted-foreground">Manage your clothing items and create outfits</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Item</DialogTitle>
              </DialogHeader>
              <form onSubmit={addNewItem} className="space-y-4 py-4">
                <div className="grid grid-cols-[1fr_2fr] gap-6">
                  <ItemUploader onUpload={handleUpload} className="aspect-square h-auto" />
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="name">Item Name</Label>
                      <Input id="name" name="name" required />
                    </div>
                    
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select name="category" defaultValue="Tops">
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Tops">Tops</SelectItem>
                          <SelectItem value="Bottoms">Bottoms</SelectItem>
                          <SelectItem value="Outerwear">Outerwear</SelectItem>
                          <SelectItem value="Footwear">Footwear</SelectItem>
                          <SelectItem value="Accessories">Accessories</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="color">Color</Label>
                      <Input id="color" name="color" type="color" defaultValue="#000000" />
                    </div>
                    
                    <div>
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input id="tags" name="tags" placeholder="casual, summer, favorite" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button id="closeDialog" type="button" variant="outline">
                    Cancel
                  </Button>
                  <Button type="submit">Save Item</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search items..." 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Tops">Tops</SelectItem>
              <SelectItem value="Bottoms">Bottoms</SelectItem>
              <SelectItem value="Outerwear">Outerwear</SelectItem>
              <SelectItem value="Footwear">Footwear</SelectItem>
              <SelectItem value="Accessories">Accessories</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredItems.map((item) => (
            <WardrobeItem key={item.id} item={item} />
          ))}
          
          {filteredItems.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No items found. Try a different search or category filter.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Wardrobe;
