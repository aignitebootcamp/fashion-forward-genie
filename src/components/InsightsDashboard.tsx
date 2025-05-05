
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { mockInsights } from "@/data/mockData";

const COLORS = ["#0A2463", "#9B2242", "#D6CFC7", "#CBD5C0", "#F8F5F0", "#2E3532"];

const InsightsDashboard = () => {
  const { colorDistribution, categoryBreakdown, mostWorn, styleStatistics } = mockInsights;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Wardrobe Colors</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={colorDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
              >
                {colorDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Percentage']}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {colorDistribution.map((item, index) => (
              <div key={item.name} className="flex items-center gap-1">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-xs">{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={categoryBreakdown}
              margin={{ top: 5, right: 5, bottom: 5, left: 0 }}
              barSize={24}
            >
              <XAxis 
                dataKey="name" 
                scale="band" 
                tick={{ fontSize: 12 }} 
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Percentage']}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar 
                dataKey="value" 
                fill="#9B2242" 
                radius={[4, 4, 4, 4]} 
                background={{ fill: '#f5f5f5', radius: [4, 4, 4, 4] }}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Most Worn Items</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ol className="space-y-2">
            {mostWorn.map((item, index) => (
              <li key={index} className="flex items-center gap-3 py-2 border-b last:border-0">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-medium">
                  {index + 1}
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Wardrobe Stats</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Total Items</div>
              <div className="text-2xl font-medium">{styleStatistics.totalItems}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Favorite Brands</div>
              <div className="flex flex-wrap gap-1">
                {styleStatistics.favoriteBrands.map(brand => (
                  <span key={brand} className="text-sm bg-muted rounded-full px-2 py-0.5">
                    {brand}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Average Item Age</div>
              <div>{styleStatistics.averageItemAge}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Sustainability Score</div>
              <div className="relative w-full h-2 bg-muted rounded-full">
                <div 
                  className="absolute top-0 left-0 h-full bg-green-500 rounded-full" 
                  style={{ width: `${styleStatistics.sustainabilityScore}%` }}
                />
              </div>
              <div className="text-right text-sm mt-1">
                {styleStatistics.sustainabilityScore}/100
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsightsDashboard;
