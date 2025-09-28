// dto/create-order.dto.ts
import { IsNotEmpty, IsNumber, IsArray, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  @IsOptional()
  @IsNumber()
  warehouseId?: number;

  @IsArray()
  items: { productId: number; quantity: number }[];

  @IsOptional()
  @IsString()
  notes?: string;
}
