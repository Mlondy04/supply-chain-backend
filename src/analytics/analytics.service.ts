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
    const results = await this.orderRepo.query(`
      SELECT p.name, p.sku,
             SUM(oi.quantity) as units,
             SUM(oi.quantity * oi.price) as revenue
      FROM order_items oi
      JOIN products p ON oi.productId = p.id
      GROUP BY p.id
      ORDER BY revenue DESC
      LIMIT 5;
    `);

    return results.map((row: any) => ({
      name: row.name,
      sku: row.sku,
      revenue: `$${parseFloat(row.revenue ?? '0').toFixed(2)}`,
      units: row.units ?? '0',
      growth: '+0%', // placeholder until you add period comparisons
    }));
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
}
