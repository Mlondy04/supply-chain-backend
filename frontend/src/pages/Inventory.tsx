import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  Package, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  AlertTriangle,
  Eye,
  Download
} from "lucide-react";

const inventoryData = [
  {
    id: 1,
    sku: "SKU-001",
    name: "Industrial Bearing Set",
    category: "Machinery Parts",
    warehouse: "Warehouse A",
    quantity: 15,
    reorderLevel: 20,
    status: "low" as const,
    unitPrice: 156.00,
    totalValue: 2340.00,
    supplier: "BearingCorp",
    lastUpdated: "2024-01-15",
  },
  {
    id: 2,
    sku: "SKU-002", 
    name: "Steel Pipe 2inch x 10ft",
    category: "Raw Materials",
    warehouse: "Warehouse B",
    quantity: 156,
    reorderLevel: 50,
    status: "good" as const,
    unitPrice: 30.00,
    totalValue: 4680.00,
    supplier: "SteelWorks Inc",
    lastUpdated: "2024-01-14",
  },
  {
    id: 3,
    sku: "SKU-003",
    name: "Safety Helmet Type A",
    category: "Safety Equipment",
    warehouse: "Warehouse A",
    quantity: 8,
    reorderLevel: 25,
    status: "critical" as const,
    unitPrice: 30.00,
    totalValue: 240.00,
    supplier: "SafetyFirst Ltd",
    lastUpdated: "2024-01-13",
  },
  {
    id: 4,
    sku: "SKU-004",
    name: "Motor Oil 5W-30",
    category: "Fluids",
    warehouse: "Warehouse C",
    quantity: 89,
    reorderLevel: 30,
    status: "good" as const,
    unitPrice: 20.00,
    totalValue: 1780.00,
    supplier: "OilTech Solutions",
    lastUpdated: "2024-01-12",
  },
  {
    id: 5,
    sku: "SKU-005",
    name: "Hydraulic Fluid",
    category: "Fluids",
    warehouse: "Warehouse B", 
    quantity: 22,
    reorderLevel: 30,
    status: "reorder" as const,
    unitPrice: 40.00,
    totalValue: 880.00,
    supplier: "FluidDynamics Co",
    lastUpdated: "2024-01-11",
  },
  {
    id: 6,
    sku: "SKU-006",
    name: "Electric Motor 5HP",
    category: "Machinery Parts",
    warehouse: "Warehouse A",
    quantity: 12,
    reorderLevel: 10,
    status: "good" as const,
    unitPrice: 450.00,
    totalValue: 5400.00,
    supplier: "MotorWorks",
    lastUpdated: "2024-01-10",
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

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [warehouseFilter, setWarehouseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    sku: "",
    name: "",
    category: "",
    warehouse: "",
    quantity: "",
    reorderLevel: "",
    unitPrice: "",
    supplier: "",
    description: "",
  });

  const filteredData = inventoryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesWarehouse = warehouseFilter === "all" || item.warehouse === warehouseFilter;
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;

    return matchesSearch && matchesWarehouse && matchesStatus && matchesCategory;
  });

  const totalValue = filteredData.reduce((sum, item) => sum + item.totalValue, 0);
  const lowStockItems = filteredData.filter(item => item.status === "low" || item.status === "critical").length;

  const handleAddItem = () => {
    // Basic validation
    if (!newItem.sku || !newItem.name || !newItem.category || !newItem.warehouse || 
        !newItem.quantity || !newItem.reorderLevel || !newItem.unitPrice || !newItem.supplier) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Here you would typically make an API call to add the item
    toast.success("Item added successfully!");
    setIsAddDialogOpen(false);
    
    // Reset form
    setNewItem({
      sku: "",
      name: "",
      category: "",
      warehouse: "",
      quantity: "",
      reorderLevel: "",
      unitPrice: "",
      supplier: "",
      description: "",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Package className="h-8 w-8" />
              Inventory Management
            </h1>
            <p className="text-muted-foreground">
              Manage stock levels across all warehouses
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Inventory Item</DialogTitle>
                  <DialogDescription>
                    Add a new item to your inventory. Fill in all required fields.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sku">SKU *</Label>
                      <Input
                        id="sku"
                        placeholder="SKU-001"
                        value={newItem.sku}
                        onChange={(e) => setNewItem({...newItem, sku: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter product name"
                        value={newItem.name}
                        onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={newItem.category} onValueChange={(value) => setNewItem({...newItem, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Machinery Parts">Machinery Parts</SelectItem>
                          <SelectItem value="Raw Materials">Raw Materials</SelectItem>
                          <SelectItem value="Safety Equipment">Safety Equipment</SelectItem>
                          <SelectItem value="Fluids">Fluids</SelectItem>
                          <SelectItem value="Tools">Tools</SelectItem>
                          <SelectItem value="Electronics">Electronics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="warehouse">Warehouse *</Label>
                      <Select value={newItem.warehouse} onValueChange={(value) => setNewItem({...newItem, warehouse: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select warehouse" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Warehouse A">Warehouse A</SelectItem>
                          <SelectItem value="Warehouse B">Warehouse B</SelectItem>
                          <SelectItem value="Warehouse C">Warehouse C</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="0"
                        value={newItem.quantity}
                        onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reorderLevel">Reorder Level *</Label>
                      <Input
                        id="reorderLevel"
                        type="number"
                        placeholder="0"
                        value={newItem.reorderLevel}
                        onChange={(e) => setNewItem({...newItem, reorderLevel: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unitPrice">Unit Price *</Label>
                      <Input
                        id="unitPrice"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={newItem.unitPrice}
                        onChange={(e) => setNewItem({...newItem, unitPrice: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supplier">Supplier *</Label>
                    <Input
                      id="supplier"
                      placeholder="Enter supplier name"
                      value={newItem.supplier}
                      onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter item description (optional)"
                      value={newItem.description}
                      onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddItem}>
                    Add Item
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredData.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{lowStockItems}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Warehouses</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, SKU, or supplier..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={warehouseFilter} onValueChange={setWarehouseFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Warehouse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Warehouses</SelectItem>
                  <SelectItem value="Warehouse A">Warehouse A</SelectItem>
                  <SelectItem value="Warehouse B">Warehouse B</SelectItem>
                  <SelectItem value="Warehouse C">Warehouse C</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="good">Good Stock</SelectItem>
                  <SelectItem value="low">Low Stock</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="reorder">Reorder Soon</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Machinery Parts">Machinery Parts</SelectItem>
                  <SelectItem value="Raw Materials">Raw Materials</SelectItem>
                  <SelectItem value="Safety Equipment">Safety Equipment</SelectItem>
                  <SelectItem value="Fluids">Fluids</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Warehouse</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.sku}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.warehouse}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{item.quantity}</span>
                        <span className="text-xs text-muted-foreground">
                          Reorder: {item.reorderLevel}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(item.status, item.quantity, item.reorderLevel)}
                    </TableCell>
                    <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                    <TableCell>${item.totalValue.toLocaleString()}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Inventory;