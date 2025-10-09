// dto/create-stock-movement.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStockMovementDto {
  @IsNotEmpty()
  @IsNumber()
  inventoryId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  movementType: 'inbound' | 'outbound' | 'transfer' | 'adjustment';

  @IsNumber()
  warehouseFromId?: number;

  @IsNumber()
  warehouseToId?: number;

  @IsString()
  reference?: string | null;

  @IsString()
  notes?: String;
}

