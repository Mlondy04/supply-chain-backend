import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Building2, MapPin, Users, Package, TrendingUp, Plus, Search, Filter } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const warehouses = [
  {
    id: "WH-001",
    name: "Main Distribution Center",
    location: "New York, NY",
    address: "123 Industrial Blvd, Brooklyn, NY 11220",
    manager: "John Smith",
    capacity: "50,000 sq ft",
    utilization: 85,
    totalItems: 12450,
    status: "Active",
    phone: "(555) 123-4567",
    email: "nyc@warehouse.com"
  },
  {
    id: "WH-002", 
    name: "West Coast Hub",
    location: "Los Angeles, CA",
    address: "456 Logistics Way, Long Beach, CA 90805",
    manager: "Maria Garcia",
    capacity: "40,000 sq ft", 
    utilization: 72,
    totalItems: 9876,
    status: "Active",
    phone: "(555) 987-6543",
    email: "la@warehouse.com"
  },
  {
    id: "WH-003",
    name: "Central Processing",
    location: "Chicago, IL", 
    address: "789 Commerce St, Chicago, IL 60607",
    manager: "David Johnson",
    capacity: "35,000 sq ft",
    utilization: 93,
    totalItems: 11234,
    status: "Active", 
    phone: "(555) 456-7890",
    email: "chicago@warehouse.com"
  },
  {
    id: "WH-004",
    name: "Southeast Regional",
    location: "Atlanta, GA",
    address: "321 Trade Center Dr, Atlanta, GA 30309", 
    manager: "Sarah Wilson",
    capacity: "30,000 sq ft",
    utilization: 67,
    totalItems: 7892,
    status: "Active",
    phone: "(555) 321-9876",
    email: "atlanta@warehouse.com"
  },
  {
    id: "WH-005",
    name: "Overflow Storage",
    location: "Dallas, TX",
    address: "654 Distribution Ave, Dallas, TX 75201",
    manager: "Mike Brown", 
    capacity: "20,000 sq ft",
    utilization: 45,
    totalItems: 4567,
    status: "Under Maintenance",
    phone: "(555) 654-3210",
    email: "dallas@warehouse.com"
  }
];

const warehouseStats = [
  {
    title: "Total Warehouses",
    value: "5",
    change: "+1",
    trend: "up"
  },
  {
    title: "Average Utilization", 
    value: "72.4%",
    change: "+3.2%",
    trend: "up"
  },
  {
    title: "Total Capacity",
    value: "175,000 sq ft",
    change: "+15,000",
    trend: "up"
  },
  {
    title: "Active Items",
    value: "46,019",
    change: "+1,234",
    trend: "up"
  }
];

const recentActivities = [
  {
    warehouse: "Main Distribution Center",
    activity: "Large shipment received",
    timestamp: "2 hours ago",
    user: "John Smith"
  },
  {
    warehouse: "West Coast Hub", 
    activity: "Inventory audit completed",
    timestamp: "4 hours ago",
    user: "Maria Garcia"
  },
  {
    warehouse: "Central Processing",
    activity: "Capacity optimization implemented",
    timestamp: "6 hours ago", 
    user: "David Johnson"
  },
  {
    warehouse: "Southeast Regional",
    activity: "New storage area configured",
    timestamp: "1 day ago",
    user: "Sarah Wilson"
  }
];

export default function Warehouses() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<any>(null);
  const [newWarehouse, setNewWarehouse] = useState({
    name: "",
    location: "",
    address: "",
    manager: "",
    capacity: "",
    phone: "",
    email: ""
  });
  const { toast } = useToast();

  const handleAddWarehouse = () => {
    // Here you would typically make an API call to add the warehouse
    toast({
      title: "Warehouse Added",
      description: `${newWarehouse.name} has been successfully added.`,
    });
    setNewWarehouse({
      name: "",
      location: "",
      address: "",
      manager: "",
      capacity: "",
      phone: "",
      email: ""
    });
    setShowAddDialog(false);
  };

  const handleViewDetails = (warehouse: any) => {
    setSelectedWarehouse(warehouse);
    setShowDetailsDialog(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Warehouse Management</h1>
            <p className="text-muted-foreground">
              Manage and monitor all warehouse locations and operations
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search warehouses..." className="pl-10 w-64" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm" onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Warehouse
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {warehouseStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Badge variant="default" className="mr-2 text-xs">
                    {stat.change}
                  </Badge>
                  from last month
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Detailed View</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {warehouses.map((warehouse) => (
                <Card key={warehouse.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{warehouse.name}</CardTitle>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {warehouse.location}
                        </p>
                      </div>
                      <Badge variant={warehouse.status === "Active" ? "default" : "secondary"}>
                        {warehouse.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Utilization</span>
                        <span className="font-medium">{warehouse.utilization}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary rounded-full h-2 transition-all"
                          style={{ width: `${warehouse.utilization}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Capacity</p>
                        <p className="font-medium">{warehouse.capacity}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Items</p>
                        <p className="font-medium">{warehouse.totalItems.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>Manager: {warehouse.manager}</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => handleViewDetails(warehouse)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Warehouse Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">ID</th>
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Location</th>
                        <th className="text-left p-2">Manager</th>
                        <th className="text-left p-2">Capacity</th>
                        <th className="text-left p-2">Utilization</th>
                        <th className="text-left p-2">Items</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {warehouses.map((warehouse) => (
                        <tr key={warehouse.id} className="border-b">
                          <td className="p-2 font-medium">{warehouse.id}</td>
                          <td className="p-2">{warehouse.name}</td>
                          <td className="p-2">{warehouse.location}</td>
                          <td className="p-2">{warehouse.manager}</td>
                          <td className="p-2">{warehouse.capacity}</td>
                          <td className="p-2">
                            <Badge variant="outline">
                              {warehouse.utilization}%
                            </Badge>
                          </td>
                          <td className="p-2">{warehouse.totalItems.toLocaleString()}</td>
                          <td className="p-2">
                            <Badge variant={warehouse.status === "Active" ? "default" : "secondary"}>
                              {warehouse.status}
                            </Badge>
                          </td>
                          <td className="p-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{activity.warehouse}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {activity.activity}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.timestamp} • {activity.user}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Warehouse Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Warehouse</DialogTitle>
            <DialogDescription>
              Create a new warehouse location in the system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Warehouse Name</Label>
              <Input
                id="name"
                value={newWarehouse.name}
                onChange={(e) => setNewWarehouse({ ...newWarehouse, name: e.target.value })}
                placeholder="e.g., Main Distribution Center"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newWarehouse.location}
                onChange={(e) => setNewWarehouse({ ...newWarehouse, location: e.target.value })}
                placeholder="e.g., New York, NY"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={newWarehouse.address}
                onChange={(e) => setNewWarehouse({ ...newWarehouse, address: e.target.value })}
                placeholder="Full address"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="manager">Manager</Label>
              <Input
                id="manager"
                value={newWarehouse.manager}
                onChange={(e) => setNewWarehouse({ ...newWarehouse, manager: e.target.value })}
                placeholder="Manager name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                value={newWarehouse.capacity}
                onChange={(e) => setNewWarehouse({ ...newWarehouse, capacity: e.target.value })}
                placeholder="e.g., 50,000 sq ft"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={newWarehouse.phone}
                onChange={(e) => setNewWarehouse({ ...newWarehouse, phone: e.target.value })}
                placeholder="(555) 123-4567"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newWarehouse.email}
                onChange={(e) => setNewWarehouse({ ...newWarehouse, email: e.target.value })}
                placeholder="warehouse@company.com"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddWarehouse}>Add Warehouse</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Warehouse Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedWarehouse?.name}</DialogTitle>
            <DialogDescription>
              Detailed information for {selectedWarehouse?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedWarehouse && (
            <div className="grid gap-6">
              {/* Status and Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge variant={selectedWarehouse.status === "Active" ? "default" : "secondary"}>
                    {selectedWarehouse.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Warehouse ID</Label>
                  <p className="text-sm font-mono bg-muted px-2 py-1 rounded">
                    {selectedWarehouse.id}
                  </p>
                </div>
              </div>

              {/* Location Details */}
              <div className="space-y-4">
                <h4 className="font-semibold">Location Details</h4>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Location:</span>
                    <span>{selectedWarehouse.location}</span>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm">Full Address</Label>
                    <p className="text-sm text-muted-foreground">{selectedWarehouse.address}</p>
                  </div>
                </div>
              </div>

              {/* Capacity & Utilization */}
              <div className="space-y-4">
                <h4 className="font-semibold">Capacity & Utilization</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Total Capacity</Label>
                    <p className="text-lg font-semibold">{selectedWarehouse.capacity}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Current Utilization</Label>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold">{selectedWarehouse.utilization}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary rounded-full h-2 transition-all"
                          style={{ width: `${selectedWarehouse.utilization}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Total Items Stored</Label>
                  <p className="text-lg font-semibold flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    {selectedWarehouse.totalItems.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h4 className="font-semibold">Contact Information</h4>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Manager:</span>
                    <span>{selectedWarehouse.manager}</span>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm">Phone</Label>
                    <p className="text-sm">{selectedWarehouse.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm">Email</Label>
                    <p className="text-sm">{selectedWarehouse.email}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            <Button>Edit Warehouse</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}