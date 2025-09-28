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
}
