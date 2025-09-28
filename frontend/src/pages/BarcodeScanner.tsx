import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarcodeScannerFeature } from "@/components/BarcodeScannerFeature";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, Camera, Smartphone, History, Search, Package } from "lucide-react";

const scanHistory = [
  {
    id: "SCN-001",
    timestamp: "2024-01-15 14:30:25",
    barcode: "123456789012",
    product: "Industrial Bearing Set",
    sku: "SKU-001",
    action: "Stock Check",
    user: "John Smith",
    location: "Warehouse A",
    status: "Success"
  },
  {
    id: "SCN-002", 
    timestamp: "2024-01-15 14:28:15",
    barcode: "987654321098",
    product: "Heavy Duty Cable",
    sku: "SKU-045",
    action: "Stock Out",
    user: "Maria Garcia", 
    location: "Warehouse B",
    status: "Success"
  },
  {
    id: "SCN-003",
    timestamp: "2024-01-15 14:25:42", 
    barcode: "456789123456",
    product: "Safety Vest High-Vis",
    sku: "SKU-123",
    action: "Stock In",
    user: "David Johnson",
    location: "Warehouse A", 
    status: "Success"
  },
  {
    id: "SCN-004",
    timestamp: "2024-01-15 14:20:18",
    barcode: "789123456789",
    product: "Unknown Product",
    sku: "N/A",
    action: "Lookup",
    user: "Sarah Wilson",
    location: "Warehouse C",
    status: "Failed"
  }
];

const quickActions = [
  { name: "Stock In", icon: Package, description: "Add items to inventory" },
  { name: "Stock Out", icon: Package, description: "Remove items from inventory" },
  { name: "Stock Check", icon: Search, description: "Verify current stock levels" },
  { name: "Location Update", icon: Package, description: "Update item location" }
];

export default function BarcodeScanner() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Barcode Scanner</h1>
            <p className="text-muted-foreground">
              Scan barcodes and QR codes for instant inventory operations
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Camera className="h-3 w-3" />
              Camera Ready
            </Badge>
            <Button>
              <QrCode className="h-4 w-4 mr-2" />
              Start Scanning
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Scanner Interface */}
          <div className="lg:col-span-2">
            <BarcodeScannerFeature />
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button key={index} variant="outline" className="w-full justify-start">
                      <Icon className="h-4 w-4 mr-2" />
                      <div className="text-left">
                        <div className="font-medium">{action.name}</div>
                        <div className="text-xs text-muted-foreground">{action.description}</div>
                      </div>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Manual Entry */}
            <Card>
              <CardHeader>
                <CardTitle>Manual Entry</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="barcode">Barcode/SKU</Label>
                  <Input id="barcode" placeholder="Enter barcode or SKU" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="action">Action</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stock-in">Stock In</SelectItem>
                      <SelectItem value="stock-out">Stock Out</SelectItem>
                      <SelectItem value="stock-check">Stock Check</SelectItem>
                      <SelectItem value="location-update">Location Update</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">
                  <Search className="h-4 w-4 mr-2" />
                  Process
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Scanner History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Scan History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="today">
              <TabsList className="mb-4">
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="week">This Week</TabsTrigger>
                <TabsTrigger value="month">This Month</TabsTrigger>
              </TabsList>

              <TabsContent value="today">
                <div className="space-y-3">
                  {scanHistory.map((scan) => (
                    <div key={scan.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{scan.product}</span>
                          <Badge variant="outline" className="text-xs">
                            {scan.action}
                          </Badge>
                          <Badge 
                            variant={scan.status === "Success" ? "default" : "destructive"} 
                            className="text-xs"
                          >
                            {scan.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {scan.barcode} • {scan.sku} • {scan.location}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {scan.timestamp} • {scan.user}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="week">
                <div className="text-center py-8 text-muted-foreground">
                  Weekly scan history will be displayed here
                </div>
              </TabsContent>

              <TabsContent value="month">
                <div className="text-center py-8 text-muted-foreground">
                  Monthly scan history will be displayed here
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}