import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { CustomerService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async createCustomer(@Body() data: CreateCustomerDto) {
    return this.customerService.createCustomer(data);
  }

  @Get()
  async getAllCustomers() {
    return this.customerService.getAllCustomers();
  }

  @Get(':id')
  async getCustomerById(@Param('id') id: number) {
    return this.customerService.getCustomerById(id);
  }

  @Put(':id')
  async updateCustomer(@Param('id') id: number, @Body() data: UpdateCustomerDto) {
    return this.customerService.updateCustomer(id, data);
  }

  @Delete(':id')
  async deleteCustomer(@Param('id') id: number) {
    return this.customerService.deleteCustomer(id);
  }
}
