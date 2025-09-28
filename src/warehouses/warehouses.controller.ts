import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { WarehouseService } from './warehouses.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

@Controller('warehouses')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  async createWarehouse(@Body() data: CreateWarehouseDto) {
    return this.warehouseService.createWarehouse(data);
  }

  @Get()
  async getAllWarehouses() {
    return this.warehouseService.getAllWarehouses();
  }

  @Get(':id')
  async getWarehouseById(@Param('id') id: number) {
    return this.warehouseService.getWarehouseById(id);
  }

  @Put(':id')
  async updateWarehouse(@Param('id') id: number, @Body() data: UpdateWarehouseDto) {
    return this.warehouseService.updateWarehouse(id, data);
  }

  @Delete(':id')
  async deleteWarehouse(@Param('id') id: number) {
    return this.warehouseService.deleteWarehouse(id);
  }
}
