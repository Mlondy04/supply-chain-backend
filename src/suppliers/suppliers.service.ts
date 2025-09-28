import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  async createSupplier(data: Partial<Supplier>): Promise<Supplier> {
    const supplier = this.supplierRepository.create(data);
    return this.supplierRepository.save(supplier);
  }

  async getAllSuppliers(): Promise<Supplier[]> {
    return this.supplierRepository.find({ order: { createdAt: 'DESC' } });
  }

  async getSupplierById(id: number): Promise<Supplier | null> {
    return this.supplierRepository.findOne({ where: { id } });
  }

  async updateSupplier(id: number, data: Partial<Supplier>): Promise<Supplier | null> {
    await this.supplierRepository.update(id, data);
    return this.getSupplierById(id);
  }

  async deleteSupplier(id: number): Promise<void> {
    await this.supplierRepository.delete(id);
  }
}
