import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Download } from "lucide-react";

const purchaseOrders = [
  {
    id: "PO-2024-001",
    supplier: "ABC Industrial Supply",
    items: 12,
    total: "$15,420",
    status: "pending" as const,
    dueDate: "2024-01-15",
    priority: "high" as const,
  },
  {
    id: "PO-2024-002", 
    supplier: "XYZ Manufacturing",
    items: 8,
    total: "$8,750",
    status: "approved" as const,
    dueDate: "2024-01-18",
    priority: "medium" as const,
  },
  {
    id: "PO-2024-003",
    supplier: "Quality Parts Ltd",
    items: 15,
    total: "$22,300",
    status: "received" as const,
    dueDate: "2024-01-12",
    priority: "low" as const,
  },
  {
    id: "PO-2024-004",
    supplier: "Steel Works Corp",
    items: 6,
    total: "$45,600",
    status: "processing" as const,
    dueDate: "2024-01-20",
    priority: "high" as const,
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "pending":
      return <Badge variant="secondary">Pending</Badge>;
    case "approved":
      return <Badge variant="default">Approved</Badge>;
    case "processing":
      return <Badge variant="outline">Processing</Badge>;
    case "received":
      return <Badge className="bg-success">Received</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

function getPriorityBadge(priority: string) {
  switch (priority) {
    case "high":
      return <Badge className="bg-destructive">High</Badge>;
    case "medium":
      return <Badge className="bg-warning">Medium</Badge>;
    case "low":
      return <Badge className="bg-muted">Low</Badge>;
    default:
      return <Badge variant="secondary">{priority}</Badge>;
  }
}

export function PurchaseOrdersModule() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Purchase Orders
          </CardTitle>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New PO
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {purchaseOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-medium">{order.id}</h4>
                  {getStatusBadge(order.status)}
                  {getPriorityBadge(order.priority)}
                </div>
                <p className="text-sm text-muted-foreground mb-1">{order.supplier}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span>{order.items} items</span>
                  <span className="font-medium">{order.total}</span>
                  <span className="text-muted-foreground">Due: {order.dueDate}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between">
            <Button variant="outline">
              View All Orders
            </Button>
            <div className="text-sm text-muted-foreground">
              Total: $92,070 • 4 active orders
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}