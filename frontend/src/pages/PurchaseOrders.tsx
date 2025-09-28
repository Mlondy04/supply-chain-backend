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
  ShoppingCart, 
  Search, 
  Filter, 
  Plus, 
  Eye,
  Download,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle
} from "lucide-react";

const purchaseOrdersData = [
  {
    id: 1,
    poNumber: "PO-2024-001",
    supplier: "BearingCorp",
    status: "pending" as const,
    priority: "high" as const,
    orderDate: "2024-01-15",
    expectedDelivery: "2024-01-25",
    totalAmount: 12450.00,
    items: 3,
    warehouse: "Warehouse A",
    requestedBy: "John Smith",
  },
  {
    id: 2,
    poNumber: "PO-2024-002",
    supplier: "SteelWorks Inc",
    status: "approved" as const,
    priority: "medium" as const,
    orderDate: "2024-01-14",
    expectedDelivery: "2024-01-22",
    totalAmount: 8920.00,
    items: 5,
    warehouse: "Warehouse B",
    requestedBy: "Sarah Johnson",
  },
  {
    id: 3,
    poNumber: "PO-2024-003",
    supplier: "SafetyFirst Ltd",
    status: "delivered" as const,
    priority: "low" as const,
    orderDate: "2024-01-10",
    expectedDelivery: "2024-01-18",
    totalAmount: 3240.00,
    items: 8,
    warehouse: "Warehouse A",
    requestedBy: "Mike Davis",
  },
  {
    id: 4,
    poNumber: "PO-2024-004",
    supplier: "OilTech Solutions",
    status: "shipped" as const,
    priority: "medium" as const,
    orderDate: "2024-01-12",
    expectedDelivery: "2024-01-20",
    totalAmount: 5680.00,
    items: 2,
    warehouse: "Warehouse C",
    requestedBy: "Emma Wilson",
  },
  {
    id: 5,
    poNumber: "PO-2024-005",
    supplier: "FluidDynamics Co",
    status: "cancelled" as const,
    priority: "low" as const,
    orderDate: "2024-01-08",
    expectedDelivery: "2024-01-16",
    totalAmount: 2150.00,
    items: 1,
    warehouse: "Warehouse B",
    requestedBy: "David Brown",
  },
  {
    id: 6,
    poNumber: "PO-2024-006",
    supplier: "MotorWorks",
    status: "pending" as const,
    priority: "high" as const,
    orderDate: "2024-01-16",
    expectedDelivery: "2024-01-28",
    totalAmount: 15750.00,
    items: 4,
    warehouse: "Warehouse A",
    requestedBy: "Lisa Anderson",
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
    case "approved":
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Approved</Badge>;
    case "shipped":
      return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Shipped</Badge>;
    case "delivered":
      return <Badge className="bg-success">Delivered</Badge>;
    case "cancelled":
      return <Badge className="bg-destructive">Cancelled</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function getPriorityBadge(priority: string) {
  switch (priority) {
    case "high":
      return <Badge className="bg-red-100 text-red-800 border-red-200">High</Badge>;
    case "medium":
      return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Medium</Badge>;
    case "low":
      return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Low</Badge>;
    default:
      return <Badge variant="outline">{priority}</Badge>;
  }
}

const PurchaseOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [warehouseFilter, setWarehouseFilter] = useState("all");
  const [isNewOrderDialogOpen, setIsNewOrderDialogOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    supplier: "",
    priority: "",
    expectedDelivery: "",
    warehouse: "",
    requestedBy: "",
    items: [
      {
        name: "",
        quantity: "",
        unitPrice: "",
        notes: "",
      }
    ],
    notes: "",
  });

  const filteredData = purchaseOrdersData.filter(order => {
    const matchesSearch = order.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.requestedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || order.priority === priorityFilter;
    const matchesWarehouse = warehouseFilter === "all" || order.warehouse === warehouseFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesWarehouse;
  });

  const totalValue = filteredData.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingOrders = filteredData.filter(order => order.status === "pending").length;
  const shippedOrders = filteredData.filter(order => order.status === "shipped").length;
  const deliveredOrders = filteredData.filter(order => order.status === "delivered").length;

  const addItem = () => {
    setNewOrder({
      ...newOrder,
      items: [...newOrder.items, { name: "", quantity: "", unitPrice: "", notes: "" }]
    });
  };

  const removeItem = (index: number) => {
    const updatedItems = newOrder.items.filter((_, i) => i !== index);
    setNewOrder({ ...newOrder, items: updatedItems });
  };

  const updateItem = (index: number, field: string, value: string) => {
    const updatedItems = newOrder.items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setNewOrder({ ...newOrder, items: updatedItems });
  };

  const calculateTotal = () => {
    return newOrder.items.reduce((total, item) => {
      const quantity = parseFloat(item.quantity) || 0;
      const unitPrice = parseFloat(item.unitPrice) || 0;
      return total + (quantity * unitPrice);
    }, 0);
  };

  const handleCreateOrder = () => {
    // Basic validation
    if (!newOrder.supplier || !newOrder.priority || !newOrder.expectedDelivery || 
        !newOrder.warehouse || !newOrder.requestedBy) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (newOrder.items.some(item => !item.name || !item.quantity || !item.unitPrice)) {
      toast.error("Please complete all item details");
      return;
    }

    // Here you would typically make an API call to create the order
    toast.success("Purchase order created successfully!");
    setIsNewOrderDialogOpen(false);
    
    // Reset form
    setNewOrder({
      supplier: "",
      priority: "",
      expectedDelivery: "",
      warehouse: "",
      requestedBy: "",
      items: [{ name: "", quantity: "", unitPrice: "", notes: "" }],
      notes: "",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <ShoppingCart className="h-8 w-8" />
              Purchase Orders
            </h1>
            <p className="text-muted-foreground">
              Manage and track purchase orders across all suppliers
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Dialog open={isNewOrderDialogOpen} onOpenChange={setIsNewOrderDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Order
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Purchase Order</DialogTitle>
                  <DialogDescription>
                    Create a new purchase order for your suppliers. Fill in all required fields.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-6 py-4">
                  {/* Basic Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="supplier">Supplier *</Label>
                      <Input
                        id="supplier"
                        placeholder="Enter supplier name"
                        value={newOrder.supplier}
                        onChange={(e) => setNewOrder({...newOrder, supplier: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="requestedBy">Requested By *</Label>
                      <Input
                        id="requestedBy"
                        placeholder="Enter requester name"
                        value={newOrder.requestedBy}
                        onChange={(e) => setNewOrder({...newOrder, requestedBy: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority *</Label>
                      <Select value={newOrder.priority} onValueChange={(value) => setNewOrder({...newOrder, priority: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="warehouse">Warehouse *</Label>
                      <Select value={newOrder.warehouse} onValueChange={(value) => setNewOrder({...newOrder, warehouse: value})}>
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
                    <div className="space-y-2">
                      <Label htmlFor="expectedDelivery">Expected Delivery *</Label>
                      <Input
                        id="expectedDelivery"
                        type="date"
                        value={newOrder.expectedDelivery}
                        onChange={(e) => setNewOrder({...newOrder, expectedDelivery: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-semibold">Order Items *</Label>
                      <Button type="button" variant="outline" size="sm" onClick={addItem}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Item
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {newOrder.items.map((item, index) => (
                        <Card key={index} className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                              <Label>Item Name *</Label>
                              <Input
                                placeholder="Enter item name"
                                value={item.name}
                                onChange={(e) => updateItem(index, "name", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Quantity *</Label>
                              <Input
                                type="number"
                                placeholder="0"
                                value={item.quantity}
                                onChange={(e) => updateItem(index, "quantity", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Unit Price *</Label>
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                value={item.unitPrice}
                                onChange={(e) => updateItem(index, "unitPrice", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Line Total</Label>
                              <div className="h-10 px-3 py-2 border rounded-md bg-muted flex items-center">
                                ${((parseFloat(item.quantity) || 0) * (parseFloat(item.unitPrice) || 0)).toFixed(2)}
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                              <Label>Notes</Label>
                              <Input
                                placeholder="Item notes (optional)"
                                value={item.notes}
                                onChange={(e) => updateItem(index, "notes", e.target.value)}
                              />
                            </div>
                            {newOrder.items.length > 1 && (
                              <div className="flex justify-end">
                                <Button 
                                  type="button" 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => removeItem(index)}
                                >
                                  Remove Item
                                </Button>
                              </div>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="flex justify-end">
                      <div className="text-lg font-semibold">
                        Total: ${calculateTotal().toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Order Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="notes">Order Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Additional notes for this purchase order (optional)"
                      value={newOrder.notes}
                      onChange={(e) => setNewOrder({...newOrder, notes: e.target.value})}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsNewOrderDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateOrder}>
                    Create Order
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
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredData.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{pendingOrders}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{deliveredOrders}</div>
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
                    placeholder="Search by PO number, supplier, or requester..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
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

        {/* Purchase Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Purchase Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PO Number</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Expected Delivery</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Warehouse</TableHead>
                  <TableHead>Requested By</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.poNumber}</TableCell>
                    <TableCell>{order.supplier}</TableCell>
                    <TableCell>
                      {getStatusBadge(order.status)}
                    </TableCell>
                    <TableCell>
                      {getPriorityBadge(order.priority)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {order.orderDate}
                      </div>
                    </TableCell>
                    <TableCell>{order.expectedDelivery}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{order.items} items</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      ${order.totalAmount.toLocaleString()}
                    </TableCell>
                    <TableCell>{order.warehouse}</TableCell>
                    <TableCell>{order.requestedBy}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
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

export default PurchaseOrders;