import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarcodeScan } from './entities/barcode-scan.entity';
import { BarcodeScanService } from './barcode-scans.service';
import { BarcodeScanController } from './barcode-scans.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BarcodeScan])],
  providers: [BarcodeScanService],
  controllers: [BarcodeScanController],
  exports: [BarcodeScanService],
})
export class BarcodeScanModule {}
