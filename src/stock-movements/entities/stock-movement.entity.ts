//stock-movement.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { InventoryItem } from '../../inventory/entities/inventory-item.entity';
import { Warehouse } from '../../warehouses/entities/warehouse.entity';

@Entity('stock_movements')
export class StockMovement {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => InventoryItem, { eager: true, nullable:true })
  item: InventoryItem | null;

  @Column({
    type: 'varchar',
    enum: ['inbound', 'outbound', 'transfer', 'adjustment'],
  })
  movementType: string; 

  @Column()
  quantity: number;

  @ManyToOne(() => Warehouse, { nullable: true, eager: true })
  warehouseFrom: Warehouse | null;

  @ManyToOne(() => Warehouse, { nullable: true, eager: true })
  warehouseTo: Warehouse | null;

  @Column({ nullable: true, type: 'varchar'})
  reference: string | null; // e.g. PO number, invoice, production line

  @Column({ nullable: true })
  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;
}
