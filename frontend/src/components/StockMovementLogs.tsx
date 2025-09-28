import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, ArrowUpRight, ArrowDownLeft, RotateCcw } from "lucide-react";

const stockMovements = [
  {
    id: "MOV-001",
    item: "Industrial Bearing Set",
    sku: "SKU-001",
    type: "out" as const,
    quantity: 5,
    warehouse: "Warehouse A",
    destination: "Production Line 1",
    timestamp: "2024-01-15 14:30",
    user: "John Smith",
  },
  {
    id: "MOV-002",
    item: "Steel Pipe 2inch x 10ft", 
    sku: "SKU-002",
    type: "in" as const,
    quantity: 50,
    warehouse: "Warehouse B",
    destination: "From Supplier ABC",
    timestamp: "2024-01-15 11:15",
    user: "System Auto",
  },
  {
    id: "MOV-003",
    item: "Safety Helmet Type A",
    sku: "SKU-003", 
    type: "transfer" as const,
    quantity: 10,
    warehouse: "Warehouse A → Warehouse C",
    destination: "Stock Rebalancing",
    timestamp: "2024-01-15 09:45",
    user: "Maria Garcia",
  },
  {
    id: "MOV-004",
    item: "Motor Oil 5W-30",
    sku: "SKU-004",
    type: "out" as const,
    quantity: 12,
    warehouse: "Warehouse C",
    destination: "Maintenance Dept",
    timestamp: "2024-01-15 08:20",
    user: "David Johnson",
  },
  {
    id: "MOV-005",
    item: "Hydraulic Fluid",
    sku: "SKU-005",
    type: "in" as const,
    quantity: 25,
    warehouse: "Warehouse B",
    destination: "Purchase Order PO-2024-003",
    timestamp: "2024-01-14 16:40",
    user: "System Auto",
  },
];

function getMovementIcon(type: string) {
  switch (type) {
    case "in":
      return <ArrowDownLeft className="h-4 w-4 text-success" />;
    case "out":
      return <ArrowUpRight className="h-4 w-4 text-destructive" />;
    case "transfer":
      return <RotateCcw className="h-4 w-4 text-primary" />;
    default:
      return <Activity className="h-4 w-4 text-muted-foreground" />;
  }
}

function getMovementBadge(type: string) {
  const config = {
    in: { className: "bg-success", label: "Stock In" },
    out: { className: "bg-destructive", label: "Stock Out" },
    transfer: { className: "bg-primary", label: "Transfer" },
  };
  
  const typeConfig = config[type as keyof typeof config];
  return (
    <Badge className={typeConfig.className}>
      {typeConfig.label}
    </Badge>
  );
}

export function StockMovementLogs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Recent Stock Movements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stockMovements.map((movement) => (
            <div key={movement.id} className="flex items-start gap-3 p-3 border rounded-lg">
              <div className="mt-1">
                {getMovementIcon(movement.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium truncate">{movement.item}</h4>
                  {getMovementBadge(movement.type)}
                </div>
                
                <p className="text-sm text-muted-foreground mb-1">
                  {movement.sku} • Qty: {movement.quantity}
                </p>
                
                <div className="text-sm">
                  <p className="text-muted-foreground">{movement.warehouse}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {movement.destination} • {movement.timestamp} • {movement.user}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t text-center">
          <button className="text-sm text-primary hover:underline">
            View All Movement History
          </button>
        </div>
      </CardContent>
    </Card>
  );
}