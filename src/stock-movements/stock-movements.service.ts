import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockMovement } from './entities/stock-movement.entity';

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

  async create(data: Partial<StockMovement>): Promise<StockMovement> {
    const movement = this.stockRepo.create(data);
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
