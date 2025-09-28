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
    return this.inventoryRepo.find();
  }

  async findOne(id: number): Promise<InventoryItem> {
    const item = await this.inventoryRepo.findOneBy({ id });
    if (!item) throw new NotFoundException(`Item with ID ${id} not found`);
    return item;
  }

  async create(data: Partial<InventoryItem>): Promise<InventoryItem> {
    const item = this.inventoryRepo.create(data);
    return this.inventoryRepo.save(item);
  }

  async update(id: number, data: Partial<InventoryItem>): Promise<InventoryItem> {
    await this.findOne(id); // will throw if not found
    await this.inventoryRepo.update(id, { ...data, lastUpdated: new Date() });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.inventoryRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
  }
}
