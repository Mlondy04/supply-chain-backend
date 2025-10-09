import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Supplier } from '../../suppliers/entities/supplier.entity';
import { PurchaseOrderItem } from './purchase-order-item.entity';
import { Warehouse } from 'src/warehouses/entities/warehouse.entity';

@Entity('purchase_orders')
export class PurchaseOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  poNumber: string;

  @ManyToOne(() => Supplier, { eager: true })
  supplier: Supplier;

  @ManyToOne(() => Warehouse, { eager: true, nullable: true })
  warehouse?: Warehouse;   // ← store warehouse as object

  @Column({
    type: 'varchar',
    default: 'pending',
  })
  status: string; // pending | approved | processing | received

  @Column({
    type: 'varchar',
    default: 'medium',
  })
  priority: string; // low | medium | high

  @Column({ type: 'date', nullable: true })
  dueDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => PurchaseOrderItem, (item) => item.purchaseOrder, { cascade: true })
  items: PurchaseOrderItem[];
}
