import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  TrendingDown, 
  ShoppingCart, 
  AlertTriangle,
  TrendingUp,
  DollarSign
} from "lucide-react";

const metrics = [
  {
    title: "Total Inventory Value",
    value: "$2,847,390",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Items in Stock",
    value: "24,847",
    change: "+156 today",
    changeType: "positive" as const,
    icon: Package,
  },
  {
    title: "Low Stock Alerts",
    value: "23",
    change: "+3 new",
    changeType: "negative" as const,
    icon: AlertTriangle,
  },
  {
    title: "Pending Orders",
    value: "187",
    change: "-12 from yesterday",
    changeType: "positive" as const,
    icon: ShoppingCart,
  },
  {
    title: "Stock Movements",
    value: "1,249",
    change: "Today",
    changeType: "neutral" as const,
    icon: TrendingUp,
  },
  {
    title: "Out of Stock",
    value: "8",
    change: "-2 resolved",
    changeType: "positive" as const,
    icon: TrendingDown,
  },
];

export function MetricsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center gap-2 mt-1">
                <Badge 
                  variant={
                    metric.changeType === "positive" 
                      ? "default" 
                      : metric.changeType === "negative" 
                      ? "destructive" 
                      : "secondary"
                  }
                  className="text-xs"
                >
                  {metric.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}