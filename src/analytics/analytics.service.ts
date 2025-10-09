// analytics.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Order } from '../orders/entities/orders.entity';
import { InventoryItem } from '../inventory/entities/inventory-item.entity';
import { AnalyticsOverviewDto } from './dto/analytics-overview.dto';
import { TopProductDto } from './dto/top-products.dto';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(InventoryItem) private inventoryRepo: Repository<InventoryItem>,
  ) {}

  async getOverview(): Promise<AnalyticsOverviewDto> {
    const now = new Date();
    const last30 = new Date();
    last30.setDate(now.getDate() - 30);

    const prev30 = new Date();
    prev30.setDate(now.getDate() - 60);

    // --- Revenue Growth ---
    const revenueRow = await this.orderRepo
      .createQueryBuilder('order')
      .select('SUM(order.total)', 'currentRevenue')
      .where('order.createdAt BETWEEN :start AND :end', { start: last30, end: now })
      .getRawOne<{ currentRevenue: string }>();

    const pastRevenueRow = await this.orderRepo
      .createQueryBuilder('order')
      .select('SUM(order.total)', 'pastRevenue')
      .where('order.createdAt BETWEEN :start AND :end', { start: prev30, end: last30 })
      .getRawOne<{ pastRevenue: string }>();

    const current = parseFloat(revenueRow?.currentRevenue ?? '0');
    const past = parseFloat(pastRevenueRow?.pastRevenue ?? '0');
    const revenueGrowth = past > 0 ? ((current - past) / past) * 100 : 100;

    // --- Order Fulfillment Rate ---
    const totalOrdersRow = await this.orderRepo
      .createQueryBuilder('order')
      .select('COUNT(order.id)', 'totalOrders')
      .getRawOne<{ totalOrders: string }>();

    const fulfilledOrdersRow = await this.orderRepo
      .createQueryBuilder('order')
      .select('COUNT(order.id)', 'fulfilledOrders')
      .where('order.status = :status', { status: 'fulfilled' })
      .getRawOne<{ fulfilledOrders: string }>();

    const totalOrders = parseInt(totalOrdersRow?.totalOrders ?? '0', 10);
    const fulfilledOrders = parseInt(fulfilledOrdersRow?.fulfilledOrders ?? '0', 10);
    const fulfillmentRate = (fulfilledOrders / (totalOrders || 1)) * 100;

    // --- Inventory Turnover ---
    const avgStockRow = await this.inventoryRepo
      .createQueryBuilder('inv')
      .select('AVG(inv.quantity)', 'avgStock')
      .getRawOne<{ avgStock: string }>();

    const cogsRow = await this.orderRepo
      .createQueryBuilder('order')
      .select('SUM(order.total)', 'cogs')
      .getRawOne<{ cogs: string }>();

    const avgStock = parseFloat(avgStockRow?.avgStock ?? '0');
    const cogs = parseFloat(cogsRow?.cogs ?? '0');
    const turnover = cogs / (avgStock || 1);

    // --- Cost Efficiency (placeholder for now) ---
    const efficiency = 87.3; // TODO: compute real cost/revenue ratio

    return {
      revenueGrowth: `${revenueGrowth.toFixed(2)}%`,
      orderFulfillment: `${fulfillmentRate.toFixed(2)}%`,
      inventoryTurnover: `${turnover.toFixed(2)}x`,
      costEfficiency: `${efficiency.toFixed(2)}%`,
    };
  }

  async getTopProducts(): Promise<TopProductDto[]> {
  const orders = await this.orderRepo.find();

  const productCounts: Record<number, number> = {};

  for (const order of orders) {
    if (order.items && Array.isArray(order.items)) {
      for (const item of order.items) {
        // ✅ Safe parsing and validation
        const productId = Number(item.productId);
        const quantity = Number(item.quantity);

        if (!productId || isNaN(productId) || !quantity || isNaN(quantity)) {
          continue; // skip invalid entries
        }

        productCounts[productId] = (productCounts[productId] || 0) + quantity;
      }
    }
  }

  const topProducts = await Promise.all(
    Object.entries(productCounts).map(async ([productId, total]) => {
      const product = await this.inventoryRepo.findOne({
        where: { id: Number(productId) },
      });

      return {
        name: product?.ItemName || "Unknown",
        sku: product?.sku || "N/A",
        units: total as number,
        revenue: (Number(product?.unitPrice) || 0) * (total as number),
        growth: 0, // placeholder — can compute later
      } as TopProductDto;
    })
  );

  // ✅ Sort by revenue descending and take top 5
  return topProducts
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);
}



  async getMetrics(startDate?: string, endDate?: string) {
    const where: any = {};

    if (startDate && endDate) {
      where.createdAt = Between(new Date(startDate), new Date(endDate));
    }

    const orders = await this.orderRepo.find({ where });

    const totalRevenue = orders.reduce(
      (sum, order) => sum + Number(order.total),
      0,
    );

    return {
      currentRevenue: totalRevenue.toString(),
      orderCount: orders.length,
      startDate: startDate || null,
      endDate: endDate || null,
    };
  }

  // Demand Forecast: sum of orders per month
  async getDemandForecast(): Promise<{ month: string; actual: number; forecast: number }[]> {
    // Example: last 6 months
    const now = new Date();
    const months: { month: string; start: Date; end: Date }[] = [];

    for (let i = 5; i >= 0; i--) {
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
      const monthName = start.toLocaleString("default", { month: "short" });
      months.push({ month: monthName, start, end });
    }

    const forecastMultiplier = 1.05; // simple forecast example

    const data = await Promise.all(
      months.map(async ({ month, start, end }) => {
        const ordersRow = await this.orderRepo
          .createQueryBuilder("order")
          .select("SUM(order.total)", "total")
          .where("order.createdAt BETWEEN :start AND :end", { start, end })
          .getRawOne<{ total: string }>();

        const actual = parseFloat(ordersRow?.total ?? "0");
        const forecast = actual * forecastMultiplier; // simple forecast logic

        return { month, actual, forecast };
      })
    );

    return data;
  }

  // Stock Levels by Category
  async getStockLevels(): Promise<{ category: string; current: number; optimal: number }[]> {
    // Example: categories and optimal stock hardcoded or from DB
    const categories = await this.inventoryRepo
      .createQueryBuilder("inv")
      .select("inv.category", "category")
      .addSelect("SUM(inv.quantity)", "current")
      .groupBy("inv.category")
      .getRawMany<{ category: string; current: string }>();

    return categories.map((cat) => ({
      category: cat.category,
      current: parseInt(cat.current, 10),
      optimal: Math.ceil(parseInt(cat.current, 10) * 1.1), // assume 10% buffer
    }));
  }

  // Warehouse Distribution
  async getWarehouseDistribution(): Promise<{ name: string; value: number; color: string }[]> {
  const orders = await this.orderRepo.find({ relations: ['warehouse'] });

  const warehouseTotals: Record<string, number> = {};

  for (const order of orders) {
    if (!order.warehouse) continue;

    const warehouseName = order.warehouse.name || 'Unknown';
    if (!warehouseTotals[warehouseName]) warehouseTotals[warehouseName] = 0;

    // 🧠 Handle the case where items is stored as a JSON string
    const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;

    if (Array.isArray(items)) {
      for (const item of items) {
        const quantity = Number(item.quantity) || 0;
        warehouseTotals[warehouseName] += quantity;
      }
    }
  }

  // 🧾 Convert aggregated totals into an array
  const warehousesArray = Object.entries(warehouseTotals).map(([name, total]) => ({
    name,
    total,
  }));

  // Avoid divide-by-zero errors
  const totalSum = warehousesArray.reduce((sum, w) => sum + w.total, 0) || 1;

  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  return warehousesArray.map((w, idx) => ({
    name: w.name,
    value: Math.round((w.total / totalSum) * 100),
    color: colors[idx % colors.length],
  }));
}


async getMonthlyTrends(): Promise<{ month: string; revenue: number; orders: number; growth: number }[]> {
  const now = new Date();
  const months: { month: string; start: Date; end: Date }[] = [];

  // Last 6 months
  for (let i = 5; i >= 0; i--) {
    const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
    const monthName = start.toLocaleString("default", { month: "short", year: "2-digit" });
    months.push({ month: monthName, start, end });
  }

  const data: { month: string; revenue: number; orders: number; growth: number }[] = [];

  for (let i = 0; i < months.length; i++) {
    const { month, start, end } = months[i];
    const orders = await this.orderRepo.find({ where: { createdAt: Between(start, end) } });

    let revenue = 0;
    for (const order of orders) {
      revenue += Number(order.total || 0);
    }

    const prevRevenue = i > 0 ? data[i - 1].revenue : 0;
    const growth = prevRevenue ? ((revenue - prevRevenue) / prevRevenue) * 100 : 0;

    data.push({
      month,
      revenue: Math.round(revenue * 100) / 100,
      orders: orders.length,
      growth: Math.round(growth * 10) / 10,
    });
  }

  return data;
}

// Category Performance Trends (last 4 weeks)
async getCategoryTrends(): Promise<any[]> {
  const weeks: { week: string; start: Date; end: Date }[] = [];
  const now = new Date();
  
  // Last 4 weeks
  for (let i = 3; i >= 0; i--) {
    const start = new Date(now);
    start.setDate(start.getDate() - (i * 7));
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    weeks.push({ week: `Week ${4 - i}`, start, end });
  }

  const results = await Promise.all(
    weeks.map(async ({ week, start, end }) => {
      const orders = await this.orderRepo.find({
        where: { createdAt: Between(start, end) },
      });

      const categorySales: Record<string, number> = {};

      for (const order of orders) {
        if (Array.isArray(order.items)) {
          for (const item of order.items) {
            const product = await this.inventoryRepo.findOne({ where: { id: Number(item.productId) } });
            if (!product) continue;

            const category = product.category || "Uncategorized";
            const revenue = (product.unitPrice || 0) * (item.quantity || 0);
            categorySales[category] = (categorySales[category] || 0) + revenue;
          }
        }
      }

      const entry: any = { week };
      Object.entries(categorySales).forEach(([category, sales]) => {
        entry[category.toLowerCase()] = Math.round(sales * 100) / 100;
      });

      return entry;
    })
  );

  return results;
}


// Seasonality Pattern (Quarterly Sales)
async getSeasonality(): Promise<{ quarter: string; value: number }[]> {
  const quarters: { quarter: string; start: Date; end: Date }[] = [];
  const now = new Date();

  for (let i = 7; i >= 0; i--) {
    const q = Math.floor((now.getMonth() - i * 3) / 3);
    const year = now.getFullYear();
    const start = new Date(year, q * 3, 1);
    const end = new Date(year, q * 3 + 3, 0);
    const quarter = `Q${q + 1} '${year.toString().slice(-2)}`;
    quarters.push({ quarter, start, end });
  }

  return Promise.all(
    quarters.map(async ({ quarter, start, end }) => {
      const row = await this.orderRepo
        .createQueryBuilder("order")
        .select("SUM(order.total)", "value")
        .where("order.createdAt BETWEEN :start AND :end", { start, end })
        .getRawOne<{ value: string }>();

      return { quarter, value: parseFloat(row?.value ?? "0") };
    })
  );
}

  async getDemand_Forecast(period: '3months' | '6months' | '12months' = '6months') {
    const monthsCount = period === '3months' ? 3 : period === '6months' ? 6 : 12;
    const now = new Date();
    const months: { month: string; start: Date; end: Date }[] = [];

    for (let i = monthsCount - 1; i >= 0; i--) {
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
      const monthName = start.toLocaleString('default', { month: 'short' });
      months.push({ month: monthName, start, end });
    }

    const forecastMultiplier = 1.05; // simple 5% growth forecast

    const data = await Promise.all(
      months.map(async ({ month, start, end }) => {
        const ordersRow = await this.orderRepo
          .createQueryBuilder('order')
          .select('SUM(order.total)', 'total')
          .where('order.createdAt BETWEEN :start AND :end', { start, end })
          .getRawOne<{ total: string }>();

        const actual = parseFloat(ordersRow?.total ?? '0'); // fallback to 0
        const forecast = actual * forecastMultiplier;

        return { month, actual, forecast };
      }),
    );

    return data;
  }

  async getCategoryForecast(period: '3months' | '6months' | '12months' = '6months') {
    const monthsCount = period === '3months' ? 3 : period === '6months' ? 6 : 12;
    const now = new Date();
    const startPeriod = new Date(now.getFullYear(), now.getMonth() - monthsCount + 1, 1);

    // Fetch all orders in the period
    const orders = await this.orderRepo.find({
      where: { createdAt: Between(startPeriod, now) },
    });

    const categoryTotals: Record<string, number> = {};

    for (const order of orders) {
      if (!order.items) continue;
      const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;

      for (const item of items) {
        const productId = Number(item.productId);
        const quantity = Number(item.quantity) || 0;

        if (!productId || quantity <= 0) continue;

        const product = await this.inventoryRepo.findOne({ where: { id: productId } });
        if (!product) continue;

        const category = product.category || 'Uncategorized';
        categoryTotals[category] = (categoryTotals[category] || 0) + quantity;
      }
    }

    // Compute forecast per category: simple 5% growth
    return Object.entries(categoryTotals).map(([category, current]) => ({
      category,
      current,
      forecast: Math.round(current * 1.05),
      change: `${Math.round(((current * 1.05 - current) / (current || 1)) * 100 * 10) / 10}%`,
    }));
  }

  async getRiskFactors(): Promise<any[]> {
  // Example: could fetch from DB, or compute dynamically
  return [
    { factor: "Seasonal Demand Spike", impact: "High", probability: "85%", timeline: "Next 2 months", recommendation: "Increase stock by 20%" },
    { factor: "Supply Chain Delay", impact: "Medium", probability: "45%", timeline: "Next month", recommendation: "Diversify suppliers" },
    { factor: "Economic Downturn", impact: "High", probability: "25%", timeline: "Next quarter", recommendation: "Monitor closely" }
  ];
}

}
