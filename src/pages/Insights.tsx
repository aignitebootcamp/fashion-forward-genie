
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import InsightsDashboard from "@/components/InsightsDashboard";
import StyleProfile from "@/components/StyleProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Insights = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Style Insights</h1>
          <p className="text-muted-foreground">Analyze your wardrobe data and discover patterns</p>
        </div>
        
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="profile">Style Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">24</CardTitle>
                  <CardDescription>Total Items</CardDescription>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">4</CardTitle>
                  <CardDescription>Outfits Created</CardDescription>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">2</CardTitle>
                  <CardDescription>Journal Entries</CardDescription>
                </CardHeader>
              </Card>
            </div>
            
            <InsightsDashboard />
          </TabsContent>
          
          <TabsContent value="profile" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
              <StyleProfile />
              
              <Card className="border">
                <CardHeader>
                  <CardTitle className="text-xl">Style Recommendations</CardTitle>
                  <CardDescription>Based on your profile</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-1">Suggested Items</h3>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• White minimalist sneakers</li>
                        <li>• Navy chino pants</li>
                        <li>• Olive field jacket</li>
                        <li>• Neutral tone sweater</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-1">Style Tips</h3>
                      <p className="text-sm text-muted-foreground">
                        Your style leans toward minimalist with versatile pieces. 
                        Try incorporating more texture through accessories while 
                        maintaining your clean color palette.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-1">Color Advice</h3>
                      <p className="text-sm text-muted-foreground">
                        You favor neutrals. Consider adding accent colors like burgundy
                        or forest green to add visual interest while keeping your base
                        palette consistent.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Insights;
