
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import WardrobeItem from "@/components/WardrobeItem";
import OutfitCard from "@/components/OutfitCard";
import { mockWardrobe, mockOutfits } from "@/data/mockData";
import { Camera, Shirt, BookOpen, BarChart3 } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <Shirt className="h-10 w-10" />,
      title: "Build Your Wardrobe",
      description: "Upload and categorize your clothes for better organization and outfit planning.",
      link: "/wardrobe"
    },
    {
      icon: <Camera className="h-10 w-10" />,
      title: "Get Outfit Suggestions",
      description: "Receive AI-powered outfit recommendations based on your personal style and clothing items.",
      link: "/outfits"
    },
    {
      icon: <BookOpen className="h-10 w-10" />,
      title: "Track Your Fashion",
      description: "Log your outfits and build a fashion journal to track what you wear and when.",
      link: "/journal"
    },
    {
      icon: <BarChart3 className="h-10 w-10" />,
      title: "Style Analytics",
      description: "Get insights into your wardrobe with data visualization and trend analysis.",
      link: "/insights"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        {/* Hero Section */}
        <section className="pt-16 pb-24 md:pt-24 md:pb-32 bg-fashion-cream">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold text-fashion-navy">
                  Discover your style.<br />
                  <span className="text-secondary">Dress smarter with data.</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-[600px]">
                  StyleGenie helps you build your wardrobe, get outfit suggestions, and track fashion trends—all powered by AI and data insights.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button size="lg" asChild>
                    <Link to="/wardrobe">Start Your Wardrobe</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/outfits">Get Outfit Ideas</Link>
                  </Button>
                </div>
              </div>
              
              <div className="lg:block relative">
                <div className="grid grid-cols-2 gap-3">
                  {mockWardrobe.slice(0, 4).map((item) => (
                    <div key={item.id} className="aspect-square overflow-hidden rounded-lg">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How StyleGenie Works</h2>
              <p className="text-muted-foreground max-w-[800px] mx-auto">
                Our AI-powered fashion assistant helps you elevate your style with these key features
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {features.map((feature, index) => (
                <Card key={index} className="border">
                  <CardContent className="pt-6">
                    <div className="rounded-full bg-muted w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-medium text-center mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground text-center mb-4">
                      {feature.description}
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to={feature.link}>Explore</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Sample Outfits */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2">Outfit Inspiration</h2>
                <p className="text-muted-foreground">
                  Discover outfit combinations based on your personal style
                </p>
              </div>
              <Button variant="outline" className="mt-4 md:mt-0" asChild>
                <Link to="/outfits">See All Outfits</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockOutfits.map((outfit) => (
                <OutfitCard key={outfit.id} outfit={outfit} />
              ))}
            </div>
          </div>
        </section>
      </div>
      
      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4 md:h-16">
          <div className="flex items-center gap-2">
            <Shirt className="h-5 w-5 text-secondary" />
            <span className="text-sm font-medium">StyleGenie</span>
          </div>
          
          <nav className="flex gap-4 md:gap-6">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
          </nav>
          
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} StyleGenie. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
