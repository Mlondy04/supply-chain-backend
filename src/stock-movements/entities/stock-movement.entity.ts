import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { InventoryItem } from '../../inventory/entities/inventory-item.entity';
import { Warehouse } from '../../warehouses/entities/warehouse.entity';

@Entity('stock_movements')
export class StockMovement {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => InventoryItem, { eager: true })
  item: InventoryItem;

  @Column({
    type: 'varchar',
    enum: ['in', 'out', 'transfer'],
  })
  movementType: string; // in | out | transfer

  @Column()
  quantity: number;

  @ManyToOne(() => Warehouse, { nullable: true, eager: true })
  warehouseFrom: Warehouse;

  @ManyToOne(() => Warehouse, { nullable: true, eager: true })
  warehouseTo: Warehouse;

  @Column({ nullable: true })
  reference: string; // e.g. PO number, invoice, production line

  @Column({ nullable: true })
  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;
}
