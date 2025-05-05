
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "@/components/AuthProvider";
import RequireAuth from "@/components/RequireAuth";

// Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Wardrobe from "./pages/Wardrobe";
import Outfits from "./pages/Outfits";
import Journal from "./pages/Journal";
import Insights from "./pages/Insights";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/wardrobe" element={<RequireAuth><Wardrobe /></RequireAuth>} />
            <Route path="/outfits" element={<RequireAuth><Outfits /></RequireAuth>} />
            <Route path="/journal" element={<RequireAuth><Journal /></RequireAuth>} />
            <Route path="/insights" element={<RequireAuth><Insights /></RequireAuth>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
