// dto/update-barcode-scan.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateBarcodeScanDto } from './create-barcode-scans.dto';

export class UpdateBarcodeScanDto extends PartialType(CreateBarcodeScanDto) {}
