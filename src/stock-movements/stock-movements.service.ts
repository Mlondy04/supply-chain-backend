//stock-movements.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockMovement } from './entities/stock-movement.entity';
import { CreateStockMovementDto } from './dto/create-stock-movement.dto';
import { InventoryItem } from 'src/inventory/entities/inventory-item.entity';
import { Warehouse } from 'src/warehouses/entities/warehouse.entity';

@Injectable()
export class StockMovementsService {
  constructor(
    @InjectRepository(StockMovement)
    private readonly stockRepo: Repository<StockMovement>,
  ) {}

  async findAll(): Promise<StockMovement[]> {
    return this.stockRepo.find();
  }

  async findOne(id: number): Promise<StockMovement> {
    const movement = await this.stockRepo.findOne({ where: { id } });
    if (!movement) throw new NotFoundException(`Stock movement #${id} not found`);
    return movement;
  }

  async create(data: CreateStockMovementDto): Promise<StockMovement> {
    const movement = new StockMovement();
    movement.quantity = data.quantity;
    movement.movementType = data.movementType.toLowerCase(); // normalize
    movement.reference = data.reference || null;
    movement.createdBy = "Admin"; // maybe from auth later

    // ✅ fetch related item
    if (data.inventoryId) {
      movement.item = await this.stockRepo.manager.findOne(InventoryItem, {
        where: { id: data.inventoryId },
      });
    }

    // ✅ handle warehouses if IDs are provided in DTO
    if ((data as any).warehouseFromId) {
      movement.warehouseFrom = await this.stockRepo.manager.findOne(Warehouse, {
        where: { id: (data as any).warehouseFromId },
      });
    }

    if ((data as any).warehouseToId) {
      movement.warehouseTo = await this.stockRepo.manager.findOne(Warehouse, {
        where: { id: (data as any).warehouseToId },
      });
    }

    return this.stockRepo.save(movement);
  }

  async update(id: number, data: Partial<StockMovement>): Promise<StockMovement> {
    const existing = await this.findOne(id);
    Object.assign(existing, data);
    return this.stockRepo.save(existing);
  }

  async remove(id: number): Promise<void> {
    const result = await this.stockRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Stock movement #${id} not found`);
    }
  }
}
