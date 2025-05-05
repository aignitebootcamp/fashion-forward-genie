
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shirt, Search, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <Shirt className="h-8 w-8 text-secondary" />
          <span className="text-xl font-serif font-medium">StyleGenie</span>
        </Link>

        {isMobile ? (
          <>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
            {isMenuOpen && (
              <div className="fixed inset-0 top-16 bg-background z-30 animate-fade-in">
                <nav className="container py-6 flex flex-col gap-4">
                  <NavLinks onClick={() => setIsMenuOpen(false)} />
                  <div className="mt-4 flex flex-col gap-2">
                    <Button className="w-full" variant="outline">Sign In</Button>
                    <Button className="w-full">Sign Up</Button>
                  </div>
                </nav>
              </div>
            )}
          </>
        ) : (
          <>
            <nav className="hidden md:flex items-center gap-6">
              <NavLinks />
            </nav>
            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" size="sm">Sign In</Button>
              <Button size="sm">Sign Up</Button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

const NavLinks = ({ onClick }: { onClick?: () => void }) => (
  <>
    <Link to="/wardrobe" className="text-muted-foreground hover:text-foreground transition-colors" onClick={onClick}>
      My Wardrobe
    </Link>
    <Link to="/outfits" className="text-muted-foreground hover:text-foreground transition-colors" onClick={onClick}>
      Outfit Ideas
    </Link>
    <Link to="/journal" className="text-muted-foreground hover:text-foreground transition-colors" onClick={onClick}>
      Fashion Journal
    </Link>
    <Link to="/insights" className="text-muted-foreground hover:text-foreground transition-colors" onClick={onClick}>
      Style Insights
    </Link>
  </>
);

export default Navbar;
