import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('forecasts')
export class Forecast {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  itemId: number; // ID of the inventory item being forecasted

  @Column()
  period: string; // e.g., '2025-09' or 'Week 40'

  @Column('float')
  predictedQuantity: number; // Predicted demand or stock quantity

  @Column({ nullable: true })
  method: string; // Forecasting method used, e.g., 'ARIMA', 'Moving Average'

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;
}
