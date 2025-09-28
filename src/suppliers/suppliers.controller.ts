import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { SupplierService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  async createSupplier(@Body() data: CreateSupplierDto) {
    return this.supplierService.createSupplier(data);
  }

  @Get()
  async getAllSuppliers() {
    return this.supplierService.getAllSuppliers();
  }

  @Get(':id')
  async getSupplierById(@Param('id') id: number) {
    return this.supplierService.getSupplierById(id);
  }

  @Put(':id')
  async updateSupplier(@Param('id') id: number, @Body() data: UpdateSupplierDto) {
    return this.supplierService.updateSupplier(id, data);
  }

  @Delete(':id')
  async deleteSupplier(@Param('id') id: number) {
    return this.supplierService.deleteSupplier(id);
  }
}
