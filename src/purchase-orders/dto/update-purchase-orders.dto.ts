// dto/update-purchase-order.dto.ts
import { IsOptional, IsArray, IsNumber, IsString } from 'class-validator';

export class UpdatePurchaseOrderDto {
  @IsOptional()
  @IsNumber()
  supplierId?: number;

  @IsOptional()
  @IsArray()
  items?: {
    id: number; // <- this must be the PurchaseOrderItem id
    quantity?: number;
    unitPrice?: number;
  }[];

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  priority?: string;

  @IsOptional()
  @IsString()
  poNumber?: string;

  @IsOptional()
  @IsString()
  dueDate?: Date;
}
