import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('inventory_items')
export class InventoryItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  sku: string;

  @Column({nullable: true})
  ItemName: string;

  @Column({ nullable: true })
  category: string;

  @Column({ default: 0 })
  quantity: number;

  @Column({ default: 0 })
  reorderLevel: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  unitPrice: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastUpdated: Date;

  totalValue?: number;
}
