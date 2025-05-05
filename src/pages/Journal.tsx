
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockOutfits } from "@/data/mockData";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

type JournalEntry = {
  id: string;
  date: Date;
  outfit: string;
  notes: string;
  weather: string;
  mood: string;
  imageUrl?: string;
};

const mockEntries: JournalEntry[] = [
  {
    id: "1",
    date: new Date(2023, 4, 20),
    outfit: "Business Casual",
    notes: "Felt really confident in this outfit. Got compliments on the blazer.",
    weather: "Sunny, 72°F",
    mood: "Confident",
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "2",
    date: new Date(2023, 4, 19),
    outfit: "Weekend Relaxed",
    notes: "Perfect for running errands and meeting friends for lunch.",
    weather: "Cloudy, 65°F",
    mood: "Casual",
    imageUrl: "https://images.unsplash.com/photo-1580331451062-99ff652288d7?q=80&w=500&auto=format&fit=crop"
  }
];

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(mockEntries);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  const addEntry = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const outfit = formData.get("outfit") as string;
    const notes = formData.get("notes") as string;
    const weather = formData.get("weather") as string;
    const mood = formData.get("mood") as string;
    
    const newEntry: JournalEntry = {
      id: `${entries.length + 1}`,
      date: selectedDate,
      outfit,
      notes,
      weather,
      mood,
    };
    
    setEntries([newEntry, ...entries]);
    
    // Close the dialog
    const form = event.currentTarget;
    form.reset();
    const closeButton = document.getElementById("closeJournalDialog");
    if (closeButton) {
      closeButton.click();
    }
  };
  
  const sortedEntries = [...entries].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );
  
  const datesWithEntries = entries.map(entry => entry.date);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row items-start justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Fashion Journal</h1>
            <p className="text-muted-foreground">Track what you wear and how you feel</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Journal Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>New Journal Entry</DialogTitle>
              </DialogHeader>
              <form onSubmit={addEntry} className="space-y-4 py-4">
                <div className="space-y-4">
                  <div>
                    <Label>Date</Label>
                    <div className="border rounded-md mt-1 p-3">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => date && setSelectedDate(date)}
                        className="mx-auto"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="outfit">Outfit</Label>
                    <select 
                      id="outfit" 
                      name="outfit" 
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {mockOutfits.map(outfit => (
                        <option key={outfit.id} value={outfit.name}>{outfit.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="weather">Weather</Label>
                      <Input id="weather" name="weather" placeholder="Sunny, 75°F" />
                    </div>
                    
                    <div>
                      <Label htmlFor="mood">Mood</Label>
                      <Input id="mood" name="mood" placeholder="Confident, Comfortable" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" name="notes" placeholder="How did you feel in this outfit?" rows={3} />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button id="closeJournalDialog" type="button" variant="outline">
                    Cancel
                  </Button>
                  <Button type="submit">Save Entry</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid md:grid-cols-[300px_1fr] gap-6">
          <Card className="h-fit sticky top-20">
            <CardHeader>
              <CardTitle className="text-lg">Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="mx-auto"
                modifiers={{
                  hasEntry: datesWithEntries
                }}
                modifiersStyles={{
                  hasEntry: {
                    fontWeight: 'bold',
                    backgroundColor: 'hsl(var(--primary) / 0.1)',
                    borderRadius: '50%'
                  }
                }}
              />
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            {sortedEntries.map((entry) => (
              <Card key={entry.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{entry.outfit}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{format(entry.date, 'MMMM d, yyyy')}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{entry.weather}</div>
                      <div className="text-sm text-muted-foreground">Mood: {entry.mood}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-[200px_1fr] gap-4">
                    {entry.imageUrl && (
                      <div className="aspect-square rounded-md overflow-hidden bg-muted">
                        <img 
                          src={entry.imageUrl} 
                          alt={entry.outfit} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="text-muted-foreground">{entry.notes}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {entries.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground mb-4">No journal entries yet.</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Add Your First Entry</Button>
                    </DialogTrigger>
                    <DialogContent>{/* Same content as above */}</DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Journal;
