import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/orders.entity';
import { Customer } from '../customers/entities/customers.entity';
import { OrderService } from './orders.service';
import { OrderController } from './orders.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Customer])],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
