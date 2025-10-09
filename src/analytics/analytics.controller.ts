// analytics.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsOverviewDto } from './dto/analytics-overview.dto';
import { TopProductDto } from './dto/top-products.dto';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('overview')
  async getOverview(): Promise<AnalyticsOverviewDto> {
    return this.analyticsService.getOverview();
  }

  @Get('top-products')
  async getTopProducts(): Promise<TopProductDto[]> {
    return this.analyticsService.getTopProducts();
  }

  @Get('metrics')
  async getMetrics(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.analyticsService.getMetrics(startDate, endDate);
  }

  @Get("demand")
  async getDemandForecast() {
    return this.analyticsService.getDemandForecast();
  }

  @Get("stock-levels")
  async getStockLevels() {
    return this.analyticsService.getStockLevels();
  }

  @Get("warehouses")
  async getWarehouseDistribution() {
    return this.analyticsService.getWarehouseDistribution();
  }

  @Get("trends/monthly")
  async getMonthlyTrends() {
    return this.analyticsService.getMonthlyTrends();
  }

  @Get("trends/categories")
  async getCategoryTrends() {
    return this.analyticsService.getCategoryTrends();
  }

  @Get("trends/seasonality")
  async getSeasonality() {
    return this.analyticsService.getSeasonality();
  }

   @Get('demand-forecast')
  async getDemand_Forecast(
    @Query('period') period: '3months' | '6months' | '12months' = '6months',
  ) {
    return this.analyticsService.getDemand_Forecast(period);
  }

@Get('category-forecast')
  async getCategoryForecast(
    @Query('period') period: '3months' | '6months' | '12months' = '6months',
  ) {
    return this.analyticsService.getCategoryForecast(period);
  }

@Get('risk-factors')
async getRiskFactors() {
  return this.analyticsService.getRiskFactors();
}



}
