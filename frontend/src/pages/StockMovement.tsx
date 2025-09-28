import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Activity, 
  Search, 
  Filter, 
  Plus, 
  Download,
  ArrowUp,
  ArrowDown,
  ArrowLeftRight,
  Edit3,
  Clock
} from "lucide-react";

const stockMovementData = [
  {
    id: 1,
    timestamp: "2024-01-15 14:30",
    type: "inbound" as const,
    product: "Industrial Bearing Set",
    sku: "SKU-001",
    quantity: 50,
    fromLocation: "Supplier: BearingCorp",
    toLocation: "Warehouse A",
    reference: "PO-2024-001",
    reason: "Purchase Order Receipt",
    performedBy: "John Smith",
    status: "completed" as const,
  },
  {
    id: 2,
    timestamp: "2024-01-15 11:15",
    type: "outbound" as const,
    product: "Steel Pipe 2inch x 10ft",
    sku: "SKU-002",
    quantity: -25,
    fromLocation: "Warehouse B",
    toLocation: "Customer: ABC Manufacturing",
    reference: "SO-2024-045",
    reason: "Sales Order Fulfillment",
    performedBy: "Sarah Johnson",
    status: "completed" as const,
  },
  {
    id: 3,
    timestamp: "2024-01-15 09:45",
    type: "transfer" as const,
    product: "Safety Helmet Type A",
    sku: "SKU-003",
    quantity: 15,
    fromLocation: "Warehouse C",
    toLocation: "Warehouse A",
    reference: "TF-2024-012",
    reason: "Stock Rebalancing",
    performedBy: "Mike Davis",
    status: "in-transit" as const,
  },
  {
    id: 4,
    timestamp: "2024-01-14 16:20",
    type: "adjustment" as const,
    product: "Motor Oil 5W-30",
    sku: "SKU-004",
    quantity: -3,
    fromLocation: "Warehouse C",
    toLocation: "Warehouse C",
    reference: "ADJ-2024-008",
    reason: "Physical Count Adjustment",
    performedBy: "Emma Wilson",
    status: "completed" as const,
  },
  {
    id: 5,
    timestamp: "2024-01-14 13:10",
    type: "inbound" as const,
    product: "Hydraulic Fluid",
    sku: "SKU-005",
    quantity: 30,
    fromLocation: "Supplier: FluidDynamics Co",
    toLocation: "Warehouse B",
    reference: "PO-2024-003",
    reason: "Purchase Order Receipt",
    performedBy: "David Brown",
    status: "completed" as const,
  },
  {
    id: 6,
    timestamp: "2024-01-14 10:30",
    type: "outbound" as const,
    product: "Electric Motor 5HP",
    sku: "SKU-006",
    quantity: -2,
    fromLocation: "Warehouse A",
    toLocation: "Customer: Industrial Solutions Ltd",
    reference: "SO-2024-038",
    reason: "Sales Order Fulfillment",
    performedBy: "Lisa Anderson",
    status: "completed" as const,
  },
  {
    id: 7,
    timestamp: "2024-01-13 15:45",
    type: "transfer" as const,
    product: "Industrial Bearing Set",
    sku: "SKU-001",
    quantity: 10,
    fromLocation: "Warehouse A",
    toLocation: "Warehouse B",
    reference: "TF-2024-009",
    reason: "Emergency Stock Transfer",
    performedBy: "John Smith",
    status: "completed" as const,
  },
  {
    id: 8,
    timestamp: "2024-01-13 12:20",
    type: "adjustment" as const,
    product: "Safety Helmet Type A",
    sku: "SKU-003",
    quantity: 2,
    fromLocation: "Warehouse A",
    toLocation: "Warehouse A",
    reference: "ADJ-2024-007",
    reason: "Found Items",
    performedBy: "Mike Davis",
    status: "completed" as const,
  },
];

function getMovementTypeIcon(type: string) {
  switch (type) {
    case "inbound":
      return <ArrowDown className="h-4 w-4 text-green-600" />;
    case "outbound":
      return <ArrowUp className="h-4 w-4 text-red-600" />;
    case "transfer":
      return <ArrowLeftRight className="h-4 w-4 text-blue-600" />;
    case "adjustment":
      return <Edit3 className="h-4 w-4 text-purple-600" />;
    default:
      return <Activity className="h-4 w-4" />;
  }
}

function getMovementTypeBadge(type: string) {
  switch (type) {
    case "inbound":
      return <Badge className="bg-green-100 text-green-800 border-green-200">Inbound</Badge>;
    case "outbound":
      return <Badge className="bg-red-100 text-red-800 border-red-200">Outbound</Badge>;
    case "transfer":
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Transfer</Badge>;
    case "adjustment":
      return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Adjustment</Badge>;
    default:
      return <Badge variant="outline">{type}</Badge>;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "completed":
      return <Badge className="bg-success">Completed</Badge>;
    case "in-transit":
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">In Transit</Badge>;
    case "pending":
      return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Pending</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

const StockMovement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [warehouseFilter, setWarehouseFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form state for new movement
  const [formData, setFormData] = useState({
    type: "inbound",
    product: "",
    sku: "",
    quantity: "",
    fromLocation: "",
    toLocation: "",
    reference: "",
    reason: "",
    performedBy: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("New movement:", formData);
    setIsDialogOpen(false);
    // Reset form
    setFormData({
      type: "inbound",
      product: "",
      sku: "",
      quantity: "",
      fromLocation: "",
      toLocation: "",
      reference: "",
      reason: "",
      performedBy: ""
    });
  };

  const filteredData = stockMovementData.filter(movement => {
    const matchesSearch = movement.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.performedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === "all" || movement.type === typeFilter;
    const matchesStatus = statusFilter === "all" || movement.status === statusFilter;
    const matchesWarehouse = warehouseFilter === "all" || 
                            movement.fromLocation.includes(warehouseFilter) || 
                            movement.toLocation.includes(warehouseFilter);

    return matchesSearch && matchesType && matchesStatus && matchesWarehouse;
  });

  const totalMovements = filteredData.length;
  const inboundMovements = filteredData.filter(m => m.type === "inbound").length;
  const outboundMovements = filteredData.filter(m => m.type === "outbound").length;
  const transferMovements = filteredData.filter(m => m.type === "transfer").length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Activity className="h-8 w-8" />
              Stock Movement
            </h1>
            <p className="text-muted-foreground">
              Track all inventory movements and transfers across warehouses
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Record Movement
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Record Stock Movement</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Movement Type *</Label>
                      <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inbound">Inbound</SelectItem>
                          <SelectItem value="outbound">Outbound</SelectItem>
                          <SelectItem value="transfer">Transfer</SelectItem>
                          <SelectItem value="adjustment">Adjustment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="Enter quantity"
                        value={formData.quantity}
                        onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="product">Product Name *</Label>
                      <Input
                        id="product"
                        placeholder="Enter product name"
                        value={formData.product}
                        onChange={(e) => setFormData({...formData, product: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sku">SKU *</Label>
                      <Input
                        id="sku"
                        placeholder="Enter SKU"
                        value={formData.sku}
                        onChange={(e) => setFormData({...formData, sku: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fromLocation">From Location *</Label>
                      <Input
                        id="fromLocation"
                        placeholder="e.g. Warehouse A, Supplier Name"
                        value={formData.fromLocation}
                        onChange={(e) => setFormData({...formData, fromLocation: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="toLocation">To Location *</Label>
                      <Input
                        id="toLocation"
                        placeholder="e.g. Warehouse B, Customer Name"
                        value={formData.toLocation}
                        onChange={(e) => setFormData({...formData, toLocation: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reference">Reference</Label>
                      <Input
                        id="reference"
                        placeholder="e.g. PO-2024-001"
                        value={formData.reference}
                        onChange={(e) => setFormData({...formData, reference: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="performedBy">Performed By *</Label>
                      <Input
                        id="performedBy"
                        placeholder="Enter performer name"
                        value={formData.performedBy}
                        onChange={(e) => setFormData({...formData, performedBy: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason *</Label>
                    <Textarea
                      id="reason"
                      placeholder="Enter reason for movement"
                      value={formData.reason}
                      onChange={(e) => setFormData({...formData, reason: e.target.value})}
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Record Movement</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Movements</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMovements}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inbound</CardTitle>
              <ArrowDown className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{inboundMovements}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Outbound</CardTitle>
              <ArrowUp className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{outboundMovements}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transfers</CardTitle>
              <ArrowLeftRight className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{transferMovements}</div>
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
                    placeholder="Search by product, SKU, reference, or user..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Movement Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="inbound">Inbound</SelectItem>
                  <SelectItem value="outbound">Outbound</SelectItem>
                  <SelectItem value="transfer">Transfer</SelectItem>
                  <SelectItem value="adjustment">Adjustment</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-transit">In Transit</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>

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
            </div>
          </CardContent>
        </Card>

        {/* Stock Movement Table */}
        <Card>
          <CardHeader>
            <CardTitle>Movement History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Performed By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((movement) => (
                  <TableRow key={movement.id} className="animate-fade-in">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div className="text-sm">
                          <div className="font-medium">{movement.timestamp.split(' ')[0]}</div>
                          <div className="text-muted-foreground">{movement.timestamp.split(' ')[1]}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getMovementTypeIcon(movement.type)}
                        {getMovementTypeBadge(movement.type)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{movement.product}</div>
                        <div className="text-sm text-muted-foreground">{movement.sku}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`font-medium ${movement.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{movement.fromLocation}</TableCell>
                    <TableCell className="text-sm">{movement.toLocation}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {movement.reference}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{movement.reason}</TableCell>
                    <TableCell>
                      {getStatusBadge(movement.status)}
                    </TableCell>
                    <TableCell className="text-sm">{movement.performedBy}</TableCell>
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

export default StockMovement;