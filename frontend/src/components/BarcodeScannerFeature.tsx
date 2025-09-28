import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, Smartphone, Camera, Zap } from "lucide-react";

const scannerFeatures = [
  {
    icon: Camera,
    title: "Multi-Format Support",
    description: "Supports QR codes, UPC, EAN, Code 128, and more",
  },
  {
    icon: Smartphone,
    title: "Mobile & Web",
    description: "Works on smartphones, tablets, and desktop cameras",
  },
  {
    icon: Zap,
    title: "Instant Lookup",
    description: "Real-time inventory updates and stock verification",
  },
];

const recentScans = [
  {
    sku: "SKU-001",
    name: "Industrial Bearing Set",
    warehouse: "Warehouse A",
    timestamp: "2 minutes ago",
    action: "Stock Check",
    user: "John Smith",
  },
  {
    sku: "SKU-045",
    name: "Heavy Duty Cable",
    warehouse: "Warehouse B", 
    timestamp: "5 minutes ago",
    action: "Stock Out",
    user: "Maria Garcia",
  },
  {
    sku: "SKU-123",
    name: "Safety Vest High-Vis",
    warehouse: "Warehouse A",
    timestamp: "12 minutes ago", 
    action: "Stock In",
    user: "David Johnson",
  },
];

export function BarcodeScannerFeature() {
  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5 text-primary" />
          Barcode Scanner
          <Badge variant="outline" className="ml-auto">Featured</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Scanner Interface Preview */}
        <div className="relative bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-6 border border-primary/20">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
              <QrCode className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Ready to Scan</h3>
              <p className="text-sm text-muted-foreground">
                Point your camera at any barcode or QR code
              </p>
            </div>
            <div className="flex gap-2 justify-center">
              <Button className="bg-primary hover:bg-primary/90">
                <Camera className="h-4 w-4 mr-2" />
                Start Scanner
              </Button>
              <Button variant="outline">
                Manual Entry
              </Button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid gap-4">
          <h4 className="font-medium">Scanner Capabilities</h4>
          {scannerFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <Icon className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h5 className="font-medium text-sm">{feature.title}</h5>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Scans */}
        <div className="space-y-3">
          <h4 className="font-medium">Recent Scans</h4>
          {recentScans.map((scan, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-card">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{scan.sku}</span>
                  <Badge variant="outline" className="text-xs">
                    {scan.action}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {scan.name} • {scan.warehouse}
                </p>
                <p className="text-xs text-muted-foreground">
                  {scan.timestamp} • {scan.user}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full">
          View All Scan History
        </Button>
      </CardContent>
    </Card>
  );
}