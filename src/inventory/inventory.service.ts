// inventory.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryItem } from './entities/inventory-item.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryItem)
    private readonly inventoryRepo: Repository<InventoryItem>,
  ) {}

  async findAll(): Promise<InventoryItem[]> {
    const items = await this.inventoryRepo.find();
    return items.map(item => ({
      ...item,
      totalValue: Number(item.unitPrice ?? 0) * Number(item.quantity ?? 0),
    }));
  }

  async findOne(id: number): Promise<InventoryItem> {
    const item = await this.inventoryRepo.findOneBy({ id });
    if (!item) throw new NotFoundException(`Item with ID ${id} not found`);
    return {
      ...item,
      totalValue: Number(item.unitPrice ?? 0) * Number(item.quantity ?? 0),
    };
  }

  async create(data: Partial<InventoryItem>): Promise<InventoryItem> {
    const item = this.inventoryRepo.create(data);
    const saved = await this.inventoryRepo.save(item);
    return {
      ...saved,
      totalValue: Number(saved.unitPrice ?? 0) * Number(saved.quantity ?? 0),
    };
  }

  async update(id: number, data: Partial<InventoryItem>): Promise<InventoryItem> {
    await this.findOne(id); // will throw if not found
    await this.inventoryRepo.update(id, { ...data, lastUpdated: new Date() });
    const updated = await this.findOne(id);
    return {
      ...updated,
      totalValue: Number(updated.unitPrice ?? 0) * Number(updated.quantity ?? 0),
    };
  }

  async remove(id: number): Promise<void> {
    const result = await this.inventoryRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
  }
}
