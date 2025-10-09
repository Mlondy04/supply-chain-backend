//stock-movements.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { StockMovementsService } from './stock-movements.service';
import { StockMovement } from './entities/stock-movement.entity';
import { CreateStockMovementDto } from './dto/create-stock-movement.dto';
import { UpdateStockMovementDto } from './dto/update-stock-movement.dto';

@Controller('stock-movements')
export class StockMovementsController {
  constructor(private readonly stockMovementsService: StockMovementsService) {}

  @Get()
  findAll(): Promise<StockMovement[]> {
    return this.stockMovementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<StockMovement> {
    return this.stockMovementsService.findOne(Number(id));
  }

  @Post()
  create(@Body() body: CreateStockMovementDto): Promise<StockMovement> {
    return this.stockMovementsService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: UpdateStockMovementDto): Promise<StockMovement> {
    return this.stockMovementsService.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.stockMovementsService.remove(Number(id));
  }
}
