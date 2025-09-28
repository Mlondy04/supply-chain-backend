import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customers.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async createCustomer(data: Partial<Customer>): Promise<Customer> {
    const customer = this.customerRepository.create(data);
    return this.customerRepository.save(customer);
  }

  async getAllCustomers(): Promise<Customer[]> {
    return this.customerRepository.find({ order: { createdAt: 'DESC' } });
  }

  async getCustomerById(id: number): Promise<Customer | null> {
    return this.customerRepository.findOne({ where: { id }, relations: ['orders'] });
  }

  async updateCustomer(id: number, data: Partial<Customer>): Promise<Customer | null> {
    await this.customerRepository.update(id, data);
    return this.getCustomerById(id);
  }

  async deleteCustomer(id: number): Promise<void> {
    await this.customerRepository.delete(id);
  }
}
