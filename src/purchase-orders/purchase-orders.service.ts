import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { PurchaseOrderItem } from './entities/purchase-order-item.entity';
import { Supplier } from 'src/suppliers/entities/supplier.entity';
import { Warehouse } from 'src/warehouses/entities/warehouse.entity';
import { CreatePurchaseOrderDto } from './dto/create-purchase-orders.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-orders.dto';
import { InventoryItem } from 'src/inventory/entities/inventory-item.entity';

@Injectable()
export class PurchaseOrdersService {
  constructor(
    @InjectRepository(PurchaseOrder)
    private readonly poRepo: Repository<PurchaseOrder>,

    @InjectRepository(Supplier)
    private readonly supplierRepo: Repository<Supplier>,

    @InjectRepository(Warehouse)
    private readonly warehouseRepo: Repository<Warehouse>,

    @InjectRepository(PurchaseOrderItem)
    private readonly poItemRepo: Repository<PurchaseOrderItem>,

    @InjectRepository(InventoryItem)
    private readonly inventoryRepo: Repository<InventoryItem>,

  ) {}

  // Helper to calculate totalAmount
  private calculateTotalAmount(items: PurchaseOrderItem[]): number {
    return items.reduce((sum, item) => sum + item.quantity * Number(item.unitPrice), 0);
  }

  // Get all purchase orders
  async findAll(): Promise<any[]> {
    const orders = await this.poRepo.find({
      relations: ['items', 'items.item', 'supplier', 'warehouse'],
    });

    return orders.map(order => ({
      ...order,
      totalAmount: this.calculateTotalAmount(order.items),
    }));
  }

  // Get one purchase order
  async findOne(id: number): Promise<any> {
    const order = await this.poRepo.findOne({
      where: { id },
      relations: ['items', 'items.item', 'supplier', 'warehouse'],
    });

    if (!order) throw new NotFoundException(`Purchase Order #${id} not found`);

    return {
      ...order,
      totalAmount: this.calculateTotalAmount(order.items),
    };
  }

  // Create purchase order
  async createPurchaseOrder(dto: CreatePurchaseOrderDto): Promise<any> {
  const supplier = await this.supplierRepo.findOne({ where: { id: dto.supplierId } });
  if (!supplier) throw new NotFoundException('Supplier not found');

  let warehouse: Warehouse | null = null;
  if (dto.warehouseId) {
    warehouse = await this.warehouseRepo.findOne({ where: { id: dto.warehouseId } });
    if (!warehouse) throw new NotFoundException('Warehouse not found');
  }

  // Create base purchase order
  const purchaseOrder = this.poRepo.create({
    supplier,
    warehouse: warehouse ?? undefined,
    status: dto.status || 'pending',
    priority: dto.priority || 'medium',
    poNumber: dto.poNumber || `PO-${Date.now()}`,
    dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
  });

  // Attach items with correct unitPrice from InventoryItem
  purchaseOrder.items = await Promise.all(
    dto.items.map(async (i) => {
      const product = await this.inventoryRepo.findOne({ where: { id: i.productId } });
      if (!product) {
        throw new NotFoundException(`Item with ID ${i.productId} not found`);
      }

      // ✅ Create a PurchaseOrderItem, not just assign InventoryItem
      const poItem = this.poItemRepo.create({
        item: product,             // InventoryItem relation
        quantity: i.quantity,
        unitPrice: Number(product.unitPrice),
      });

      return poItem;
    }),
  );

  const savedPO = await this.poRepo.save(purchaseOrder);

  return {
    ...savedPO,
    totalAmount: this.calculateTotalAmount(savedPO.items),
  };
}



  // Update purchase order
  async updatePurchaseOrder(id: number, dto: UpdatePurchaseOrderDto): Promise<any> {
    const existing = await this.poRepo.findOne({
      where: { id },
      relations: ['items', 'items.item', 'supplier', 'warehouse'],
    });

    if (!existing) throw new NotFoundException(`Purchase Order #${id} not found`);

    if (dto.supplierId) {
      const supplier = await this.supplierRepo.findOne({ where: { id: dto.supplierId } });
      if (!supplier) throw new NotFoundException('Supplier not found');
      existing.supplier = supplier;
    }

    if (dto.warehouseId) {
      const warehouse = await this.warehouseRepo.findOne({ where: { id: dto.warehouseId } });
      if (!warehouse) throw new NotFoundException('Warehouse not found');
      existing.warehouse = warehouse;
    }

    if (dto.items) {
      dto.items.forEach(updateItem => {
        const existingItem = existing.items.find(i => i.id === updateItem.id);
        if (existingItem) {
          if (updateItem.quantity !== undefined) existingItem.quantity = updateItem.quantity;
          if (updateItem.unitPrice !== undefined) existingItem.unitPrice = updateItem.unitPrice;
        }
      });
    }

    if (dto.status !== undefined) existing.status = dto.status;
    if (dto.priority !== undefined) existing.priority = dto.priority;
    if (dto.dueDate !== undefined) existing.dueDate = dto.dueDate;
    if (dto.poNumber !== undefined) existing.poNumber = dto.poNumber;

    const savedPO = await this.poRepo.save(existing);

    return {
      ...savedPO,
      totalAmount: this.calculateTotalAmount(savedPO.items),
    };
  }

  // Delete purchase order
  async remove(id: number): Promise<void> {
    const result = await this.poRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Purchase Order #${id} not found`);
    }
  }
}
