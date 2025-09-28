import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalyticsCharts } from "@/components/AnalyticsCharts";
import { MetricsGrid } from "@/components/MetricsGrid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Download, Calendar, Filter } from "lucide-react";

const analyticsOverview = [
  {
    title: "Revenue Growth",
    value: "+23.5%",
    change: "+2.3%",
    trend: "up",
    period: "vs last month"
  },
  {
    title: "Order Fulfillment",
    value: "94.2%",
    change: "+1.8%", 
    trend: "up",
    period: "this quarter"
  },
  {
    title: "Inventory Turnover",
    value: "8.4x",
    change: "-0.5x",
    trend: "down",
    period: "annual rate"
  },
  {
    title: "Cost Efficiency",
    value: "87.3%",
    change: "+4.1%",
    trend: "up", 
    period: "vs target"
  }
];

const topPerformingProducts = [
  {
    name: "Industrial Bearing Set",
    sku: "SKU-001",
    revenue: "$45,234",
    units: "1,234",
    growth: "+15.3%"
  },
  {
    name: "Heavy Duty Cable",
    sku: "SKU-045", 
    revenue: "$38,921",
    units: "987",
    growth: "+12.7%"
  },
  {
    name: "Safety Vest High-Vis",
    sku: "SKU-123",
    revenue: "$29,834",
    units: "1,567",
    growth: "+8.9%"
  },
  {
    name: "Power Tool Battery",
    sku: "SKU-087",
    revenue: "$24,567",
    units: "678",
    growth: "+22.1%"
  }
];

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive insights into your inventory performance
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Last 30 days
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {analyticsOverview.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Badge variant={metric.trend === "up" ? "default" : "secondary"} className="mr-2 text-xs">
                    {metric.change}
                  </Badge>
                  {metric.period}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Charts */}
            <AnalyticsCharts />

            {/* Top Performing Products */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Top Performing Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformingProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{product.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {product.sku}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {product.units} units sold
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{product.revenue}</div>
                        <Badge variant="default" className="text-xs">
                          {product.growth}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <MetricsGrid />
          </TabsContent>

          <TabsContent value="trends">
            <Card>
              <CardHeader>
                <CardTitle>Coming Soon</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced trend analysis features will be available here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}