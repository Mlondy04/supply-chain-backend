import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/orders.entity';
import { Customer } from '../customers/entities/customers.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async createOrder(data: { customerId: number } & Partial<Order>): Promise<Order> {
  const order = this.orderRepository.create({
    ...data,
    customer: { id: data.customerId },
  });
  return this.orderRepository.save(order);
}

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['customer', 'warehouse'], order: { createdAt: 'DESC' } });
  }

  async getOrderById(id: number): Promise<Order | null> {
    return this.orderRepository.findOne({ where: { id }, relations: ['customer', 'warehouse'] });
  }

  async updateOrder(id: number, data: Partial<Order>): Promise<Order | null> {
    await this.orderRepository.update(id, data);
    return this.getOrderById(id);
  }

  async deleteOrder(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
