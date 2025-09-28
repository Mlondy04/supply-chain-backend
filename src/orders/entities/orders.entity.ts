import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Customer } from '../../customers/entities/customers.entity';
import { Warehouse } from '../../warehouses/entities/warehouse.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, customer => customer.orders)
  customer: Customer;

  @ManyToOne(() => Warehouse, { nullable: true })
  warehouse: Warehouse;

  @Column({ type: 'json' })
  items: any; // Array of items with quantity, itemId, etc.

  @Column({ default: 'PENDING' })
  status: string; // PENDING, SHIPPED, DELIVERED, CANCELED

  @Column({ nullable: true })
  notes: string;

  @Column('decimal', { precision: 10, scale: 2 , default: 0})
  total: number;

  @CreateDateColumn()
  createdAt: Date;
}
