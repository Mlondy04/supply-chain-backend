import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp, Calendar, AlertTriangle, Target, Zap } from "lucide-react";

const forecastData = [
  { month: "Jan", actual: 4200, forecast: 4100, confidence: 95 },
  { month: "Feb", actual: 3800, forecast: 3900, confidence: 92 },
  { month: "Mar", actual: 4400, forecast: 4300, confidence: 88 },
  { month: "Apr", actual: 4100, forecast: 4200, confidence: 90 },
  { month: "May", actual: null, forecast: 4500, confidence: 85 },
  { month: "Jun", actual: null, forecast: 4700, confidence: 82 },
  { month: "Jul", actual: null, forecast: 4900, confidence: 78 },
  { month: "Aug", actual: null, forecast: 5100, confidence: 75 }
];

const categoryForecast = [
  { category: "Electronics", current: 2840, forecast: 3200, change: "+12.7%" },
  { category: "Industrial", current: 1950, forecast: 2100, change: "+7.7%" },
  { category: "Safety", current: 1420, forecast: 1680, change: "+18.3%" },
  { category: "Tools", current: 980, forecast: 1150, change: "+17.3%" },
  { category: "Materials", current: 760, forecast: 820, change: "+7.9%" }
];

const riskFactors = [
  {
    factor: "Seasonal Demand Spike",
    impact: "High",
    probability: "85%",
    timeline: "Next 2 months",
    recommendation: "Increase stock by 20%"
  },
  {
    factor: "Supply Chain Delay",
    impact: "Medium", 
    probability: "45%",
    timeline: "Next month",
    recommendation: "Diversify suppliers"
  },
  {
    factor: "Economic Downturn",
    impact: "High",
    probability: "25%",
    timeline: "Next quarter",
    recommendation: "Monitor closely"
  }
];

export default function DemandForecast() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Demand Forecasting</h1>
            <p className="text-muted-foreground">
              AI-powered demand predictions and inventory planning
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="6months">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">3 Months</SelectItem>
                <SelectItem value="6months">6 Months</SelectItem>
                <SelectItem value="12months">12 Months</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Target className="h-4 w-4 mr-2" />
              Recalculate
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Forecast Accuracy
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Badge variant="default" className="mr-2 text-xs">+2.1%</Badge>
                vs last period
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Next Month Demand
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4,500</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Badge variant="default" className="mr-2 text-xs">+7.3%</Badge>
                units expected
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Stock Recommendations
              </CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Badge variant="secondary" className="mr-2 text-xs">3 urgent</Badge>
                action items
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Risk Level
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Medium</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Badge variant="outline" className="mr-2 text-xs">3 factors</Badge>
                identified
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Forecast Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">By Category</TabsTrigger>
            <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Demand Forecast vs Actual</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={forecastData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      name="Actual Demand"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="forecast" 
                      stroke="hsl(var(--muted-foreground))" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Forecasted Demand"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Category Demand Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryForecast.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div>
                        <h4 className="font-medium">{category.category}</h4>
                        <p className="text-sm text-muted-foreground">
                          Current: {category.current.toLocaleString()} units
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {category.forecast.toLocaleString()} units
                        </div>
                        <Badge variant="default" className="text-xs">
                          {category.change}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risks">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Risk Factors & Mitigation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskFactors.map((risk, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{risk.factor}</h4>
                        <div className="flex gap-2">
                          <Badge variant={risk.impact === "High" ? "destructive" : "secondary"}>
                            {risk.impact} Impact
                          </Badge>
                          <Badge variant="outline">
                            {risk.probability}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Expected timeline: {risk.timeline}
                      </p>
                      <div className="bg-muted/50 p-3 rounded">
                        <strong className="text-sm">Recommendation:</strong>
                        <p className="text-sm mt-1">{risk.recommendation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}