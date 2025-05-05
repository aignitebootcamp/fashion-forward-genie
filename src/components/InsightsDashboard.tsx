
import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const categoryData = [
  { name: 'Tops', count: 12 },
  { name: 'Bottoms', count: 8 },
  { name: 'Outerwear', count: 4 },
  { name: 'Footwear', count: 6 },
  { name: 'Accessories', count: 9 },
];

const colorData = [
  { name: 'Black', value: 25 },
  { name: 'Navy', value: 18 },
  { name: 'White', value: 15 },
  { name: 'Gray', value: 12 },
  { name: 'Olive', value: 8 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#83A6ED'];

const outfitActivities = [
  { name: 'Monday', outfits: 1 },
  { name: 'Tuesday', outfits: 1 },
  { name: 'Wednesday', outfits: 0 },
  { name: 'Thursday', outfits: 1 },
  { name: 'Friday', outfits: 2 },
  { name: 'Saturday', outfits: 1 },
  { name: 'Sunday', outfits: 1 },
];

const seasonalItems = [
  { name: 'Spring', items: 15 },
  { name: 'Summer', items: 22 },
  { name: 'Fall', items: 18 },
  { name: 'Winter', items: 14 },
];

const InsightsDashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Category Distribution */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Wardrobe by Category</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Color Distribution */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Color Distribution</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={colorData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {colorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Weekly Outfit Activity */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Weekly Outfit Activity</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={outfitActivities}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="outfits" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Seasonal Items */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Seasonal Items</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={seasonalItems}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="items" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsightsDashboard;
