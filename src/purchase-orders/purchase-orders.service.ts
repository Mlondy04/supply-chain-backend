import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { CreatePurchaseOrderDto } from './dto/create-purchase-orders.dto';
import { Supplier } from 'src/suppliers/entities/supplier.entity';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-orders.dto';
import { PurchaseOrderItem } from './entities/purchase-order-item.entity';

@Injectable()
export class PurchaseOrdersService {
  constructor(
    @InjectRepository(PurchaseOrder)
    private readonly poRepo: Repository<PurchaseOrder>,
    @InjectRepository(Supplier) // Assuming Supplier entity is imported correctly
    private readonly supplierRepository: Repository<any>, // Replace 'any' with actual Supplier entity
    @InjectRepository(PurchaseOrderItem) // <-- add this
    private readonly poItemRepo: Repository<PurchaseOrderItem>,
  ) {}

  async findAll(): Promise<PurchaseOrder[]> {
    return this.poRepo.find({ relations: ['items'] });
  }

  async findOne(id: number): Promise<PurchaseOrder> {
    const po = await this.poRepo.findOne({
      where: { id },
      relations: ['items'],
    });
    if (!po) throw new NotFoundException(`Purchase Order #${id} not found`);
    return po;
  }

  // purchase-orders.service.ts
async createPurchaseOrder(dto: CreatePurchaseOrderDto): Promise<PurchaseOrder> {
  // 1️⃣ Find supplier
  const supplier = await this.supplierRepository.findOne({ where: { id: dto.supplierId } });
  if (!supplier) throw new NotFoundException('Supplier not found');

  // 3️⃣ Create nested PurchaseOrderItem entities
  const purchaseOrder = this.poRepo.create({
    supplier,
    status: dto.status || 'pending',
    priority: dto.priority || 'medium',
    poNumber: dto.poNumber || `PO-${Date.now()}`,
    dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
    items: dto.items.map(i => ({
      item: { id: i.productId }, // relation by id
      quantity: i.quantity,
      unitPrice: 0,
    })),
  });

  // 4️⃣ Save the purchase order with cascade insert of items
  return this.poRepo.save(purchaseOrder);
}



async updatePurchaseOrder(
  id: number,
  dto: UpdatePurchaseOrderDto
): Promise<PurchaseOrder> {
  const existing = await this.poRepo.findOne({
    where: { id },
    relations: ['items', 'items.item', 'supplier'], // include nested item relation
  });

  if (!existing) throw new NotFoundException(`Purchase Order #${id} not found`);

  // Update supplier if provided
  if (dto.supplierId) {
    const supplier = await this.supplierRepository.findOne({ where: { id: dto.supplierId } });
    if (!supplier) throw new NotFoundException('Supplier not found');
    existing.supplier = supplier;
  }

  // Update items if provided
  if (dto.items) {
    dto.items.forEach(updateItem => {
      const existingItem = existing.items.find(i => i.id === updateItem.id);
      if (existingItem) {
        // Only update fields that are provided
        if (updateItem.quantity !== undefined) existingItem.quantity = updateItem.quantity;
        if (updateItem.unitPrice !== undefined) existingItem.unitPrice = updateItem.unitPrice;
      }
    });
  }

  // Update other PO fields if provided
  if (dto.status !== undefined) existing.status = dto.status;
  if (dto.priority !== undefined) existing.priority = dto.priority;
  if (dto.dueDate !== undefined) existing.dueDate = dto.dueDate;
  if (dto.poNumber !== undefined) existing.poNumber = dto.poNumber;

  return this.poRepo.save(existing); // saves PO + updated items
}


  async remove(id: number): Promise<void> {
    const result = await this.poRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Purchase Order #${id} not found`);
    }
  }
}
