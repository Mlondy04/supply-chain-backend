import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Package, Eye } from "lucide-react";

const inventoryData = [
  {
    sku: "SKU-001",
    name: "Industrial Bearing Set",
    warehouse: "Warehouse A",
    quantity: 15,
    reorderLevel: 20,
    status: "low" as const,
    value: "$2,340",
  },
  {
    sku: "SKU-002", 
    name: "Steel Pipe 2inch x 10ft",
    warehouse: "Warehouse B",
    quantity: 156,
    reorderLevel: 50,
    status: "good" as const,
    value: "$4,680",
  },
  {
    sku: "SKU-003",
    name: "Safety Helmet Type A",
    warehouse: "Warehouse A",
    quantity: 8,
    reorderLevel: 25,
    status: "critical" as const,
    value: "$240",
  },
  {
    sku: "SKU-004",
    name: "Motor Oil 5W-30",
    warehouse: "Warehouse C",
    quantity: 89,
    reorderLevel: 30,
    status: "good" as const,
    value: "$1,780",
  },
  {
    sku: "SKU-005",
    name: "Hydraulic Fluid",
    warehouse: "Warehouse B", 
    quantity: 22,
    reorderLevel: 30,
    status: "reorder" as const,
    value: "$880",
  },
];

function getStatusBadge(status: string, quantity: number, reorderLevel: number) {
  if (status === "critical" || quantity <= reorderLevel * 0.4) {
    return <Badge className="bg-destructive">Critical</Badge>;
  }
  if (status === "low" || quantity <= reorderLevel) {
    return <Badge className="bg-warning">Low Stock</Badge>;
  }
  if (status === "reorder" || quantity <= reorderLevel * 1.2) {
    return <Badge variant="outline" className="border-warning text-warning">Reorder Soon</Badge>;
  }
  return <Badge className="bg-success">Good Stock</Badge>;
}

export function InventoryOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Inventory Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {inventoryData.map((item) => (
            <div key={item.sku} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.sku} • {item.warehouse}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm">
                    Qty: <strong>{item.quantity}</strong>
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Reorder: {item.reorderLevel}
                  </span>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {getStatusBadge(item.status, item.quantity, item.reorderLevel)}
                {(item.status === "low" || item.status === "critical") && (
                  <AlertTriangle className="h-4 w-4 text-warning" />
                )}
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <Button variant="outline" className="w-full">
            View All Inventory
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}