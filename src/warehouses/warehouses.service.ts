import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from './entities/warehouse.entity';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private warehouseRepository: Repository<Warehouse>,
  ) {}

  async createWarehouse(data: Partial<Warehouse>): Promise<Warehouse> {
    const warehouse = this.warehouseRepository.create(data);
    return this.warehouseRepository.save(warehouse);
  }

  async getAllWarehouses(): Promise<Warehouse[]> {
    return this.warehouseRepository.find({ order: { createdAt: 'DESC' } });
  }

  async getWarehouseById(id: number): Promise<Warehouse | null> {
    return this.warehouseRepository.findOne({ where: { id } });
  }

  async updateWarehouse(id: number, data: Partial<Warehouse>): Promise<Warehouse | null> {
    await this.warehouseRepository.update(id, data);
    return this.getWarehouseById(id);
  }

  async deleteWarehouse(id: number): Promise<void> {
    await this.warehouseRepository.delete(id);
  }
}
