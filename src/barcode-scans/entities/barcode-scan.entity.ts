import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('barcode_scans')
export class BarcodeScan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  itemId: number; // ID of the inventory item being scanned

  @Column()
  warehouseId: number; // ID of the warehouse where the scan occurred

  @Column()
  scannedBy: string; // User or system that performed the scan

  @Column({ nullable: true })
  scanType: string; // 'IN' or 'OUT'

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;
}
