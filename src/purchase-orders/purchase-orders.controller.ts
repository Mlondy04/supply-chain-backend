import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PurchaseOrdersService } from './purchase-orders.service';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { CreatePurchaseOrderDto } from './dto/create-purchase-orders.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-orders.dto';

@Controller('purchase-orders')
export class PurchaseOrdersController {
  constructor(private readonly purchaseOrdersService: PurchaseOrdersService) {}

  @Get()
  findAll(): Promise<PurchaseOrder[]> {
    return this.purchaseOrdersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<PurchaseOrder> {
    return this.purchaseOrdersService.findOne(Number(id));
  }

  @Post()
  create(@Body() body: CreatePurchaseOrderDto): Promise<PurchaseOrder> {
    return this.purchaseOrdersService.createPurchaseOrder(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: UpdatePurchaseOrderDto): Promise<PurchaseOrder> {
    return this.purchaseOrdersService.updatePurchaseOrder(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.purchaseOrdersService.remove(Number(id));
  }
}
