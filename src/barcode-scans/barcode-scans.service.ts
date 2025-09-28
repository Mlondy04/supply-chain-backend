import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BarcodeScan } from './entities/barcode-scan.entity';
import { UpdateBarcodeScanDto } from './dto/update-barcode-scans.dto';

@Injectable()
export class BarcodeScanService {
  constructor(
    @InjectRepository(BarcodeScan)
    private barcodeScanRepository: Repository<BarcodeScan>,
  ) {}

  async createScan(data: Partial<BarcodeScan>): Promise<BarcodeScan> {
    const scan = this.barcodeScanRepository.create(data);
    return this.barcodeScanRepository.save(scan);
  }

  async getAllScans(): Promise<BarcodeScan[]> {
    return this.barcodeScanRepository.find({ order: { createdAt: 'DESC' } });
  }

  async getScanById(id: number): Promise<BarcodeScan | null> {
    return this.barcodeScanRepository.findOne({ where: { id } });
  }

  async getScansByItem(itemId: number): Promise<BarcodeScan[]> {
    return this.barcodeScanRepository.find({ where: { itemId }, order: { createdAt: 'DESC' } });
  }

  async getScansByWarehouse(warehouseId: number): Promise<BarcodeScan[]> {
    return this.barcodeScanRepository.find({ where: { warehouseId }, order: { createdAt: 'DESC' } });
  }

  async deleteScan(id: number): Promise<void> {
    await this.barcodeScanRepository.delete(id);
  }

  async updateScan(id: number, updateDto: UpdateBarcodeScanDto): Promise<BarcodeScan> {
    const scan = await this.barcodeScanRepository.preload({
      id,
      ...updateDto,
    });
    if (!scan) {
      throw new NotFoundException(`Scan with id ${id} not found`);
    }
    return this.barcodeScanRepository.save(scan);
  }
}
