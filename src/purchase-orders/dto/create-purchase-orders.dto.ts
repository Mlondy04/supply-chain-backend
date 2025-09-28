// dto/create-purchase-order.dto.ts
import { IsNotEmpty, IsNumber, IsArray, IsString, IsOptional } from 'class-validator';

export class CreatePurchaseOrderDto {
  @IsNotEmpty()
  @IsNumber()
  supplierId: number;

  @IsArray()
  items: { productId: number; quantity: number }[];

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  poNumber?: string; 

  @IsOptional()
  @IsString()
  status?: string; // e.g., 'pending', 'approved', 'received'

  @IsOptional()
  @IsString()
  priority?: string; // e.g., 'low', 'medium', 'high'

  @IsOptional()
  @IsString()
  dueDate?: string; // ISO date string
}
