import { Controller, Get, Post, Param, Body, Delete, Put } from '@nestjs/common';
import { BarcodeScanService } from './barcode-scans.service';
import { CreateBarcodeScanDto } from './dto/create-barcode-scans.dto';
import { UpdateBarcodeScanDto } from './dto/update-barcode-scans.dto';

@Controller('barcode-scans')
export class BarcodeScanController {
  constructor(private readonly barcodeScanService: BarcodeScanService) {}

  @Post()
  async createScan(@Body() data: CreateBarcodeScanDto) {
    return this.barcodeScanService.createScan(data);
  }

  @Get()
  async getAllScans() {
    return this.barcodeScanService.getAllScans();
  }

  @Get(':id')
  async getScanById(@Param('id') id: number) {
    return this.barcodeScanService.getScanById(id);
  }

  @Get('item/:itemId')
  async getScansByItem(@Param('itemId') itemId: number) {
    return this.barcodeScanService.getScansByItem(itemId);
  }

  @Get('warehouse/:warehouseId')
  async getScansByWarehouse(@Param('warehouseId') warehouseId: number) {
    return this.barcodeScanService.getScansByWarehouse(warehouseId);
  }

  @Put(':id')
  async updateScan(@Param('id') id: number, @Body() data: UpdateBarcodeScanDto) {
    return this.barcodeScanService.updateScan(id, data);
  }

  @Delete(':id')
  async deleteScan(@Param('id') id: number) {
    return this.barcodeScanService.deleteScan(id);
  }
}
