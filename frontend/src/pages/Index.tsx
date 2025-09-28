import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricsGrid } from "@/components/MetricsGrid";
import { InventoryOverview } from "@/components/InventoryOverview";
import { PurchaseOrdersModule } from "@/components/PurchaseOrdersModule";
import { StockMovementLogs } from "@/components/StockMovementLogs";
import { AnalyticsCharts } from "@/components/AnalyticsCharts";
import { BarcodeScannerFeature } from "@/components/BarcodeScannerFeature";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold">Supply Chain Dashboard</h1>
          <p className="text-muted-foreground">
            Multi-warehouse inventory management and analytics overview
          </p>
        </div>

        {/* Key Metrics */}
        <MetricsGrid />

        {/* Main Dashboard Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Inventory & Orders */}
          <div className="lg:col-span-2 space-y-6">
            <InventoryOverview />
            <PurchaseOrdersModule />
            <AnalyticsCharts />
          </div>

          {/* Right Column - Activity & Tools */}
          <div className="space-y-6">
            <BarcodeScannerFeature />
            <StockMovementLogs />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
