import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryItem } from './entities/inventory-item.entity';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  findAll(): Promise<InventoryItem[]> {
    return this.inventoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<InventoryItem> {
    return this.inventoryService.findOne(Number(id));
  }

  @Post()
  create(@Body() body: CreateInventoryDto): Promise<InventoryItem> {
    return this.inventoryService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: UpdateInventoryDto): Promise<InventoryItem> {
    return this.inventoryService.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.inventoryService.remove(Number(id));
  }
}
