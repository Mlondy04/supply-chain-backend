// dto/create-inventory.dto.ts
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInventoryDto {
  @IsNotEmpty()
  @IsString()
  itemName: string;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsString()
  category?: string;   // ✅ matches entity

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsNumber()
  reorderLevel?: number;  // ✅ also in entity

  @IsOptional()
  @IsNumber()
  unitPrice?: number;  // ✅ added for totalValue calculation

  @IsOptional()
  @IsString()
  warehouseId?: string;
}
