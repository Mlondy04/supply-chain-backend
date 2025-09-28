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
  movementType: 'IN' | 'OUT';

  @IsString()
  notes?: string;
}
