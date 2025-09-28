import { Controller, Get, Post, Param, Body, Delete, Put } from '@nestjs/common';
import { ForecastService } from './forecasts.service';
import { CreateForecastDto } from './dto/create-forecast.dto';
import { UpdateForecastDto } from './dto/update-forecast.dto';

@Controller('forecasts')
export class ForecastController {
  constructor(private readonly forecastService: ForecastService) {}

  @Post()
  async createForecast(@Body() data: CreateForecastDto) {
    return this.forecastService.createForecast(data);
  }

  @Get()
  async getAllForecasts() {
    return this.forecastService.getAllForecasts();
  }

  @Get(':id')
  async getForecastById(@Param('id') id: number) {
    return this.forecastService.getForecastById(id);
  }

  @Get('item/:itemId')
  async getForecastsByItem(@Param('itemId') itemId: number) {
    return this.forecastService.getForecastsByItem(itemId);
  }

  @Put(':id')
  async updateForecast(@Param('id') id: number, @Body() data: UpdateForecastDto) {
    return this.forecastService.updateForecast(id, data);
  }

  @Delete(':id')
  async deleteForecast(@Param('id') id: number) {
    return this.forecastService.deleteForecast(id);
  }
}
