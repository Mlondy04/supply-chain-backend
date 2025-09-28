// dto/create-barcode-scan.dto.ts
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateBarcodeScanDto {
  @IsNotEmpty()
  @IsString()
  barcode: string;

  @IsOptional()
  @IsNumber()
  inventoryId?: number;

  @IsOptional()
  @IsString()
  scanType?: 'INBOUND' | 'OUTBOUND';
}
