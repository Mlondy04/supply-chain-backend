import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Forecast } from './entities/forecast.entity';
import { CreateForecastDto } from './dto/create-forecast.dto';
import { UpdateForecastDto } from './dto/update-forecast.dto';

@Injectable()
export class ForecastService {
  constructor(
    @InjectRepository(Forecast)
    private forecastRepository: Repository<Forecast>,
  ) {}

  async createForecast(dto: CreateForecastDto): Promise<Forecast> {
  const forecast = this.forecastRepository.create({
    itemId: parseInt(dto.productId),  // adapt if productId is string
    period: dto.period,
    predictedQuantity: dto.predictedQuantity,
    method: dto.method,
    notes: dto.notes,
  });
  return this.forecastRepository.save(forecast);
}


  async getAllForecasts(): Promise<Forecast[]> {
    return this.forecastRepository.find({ order: { createdAt: 'DESC' } });
  }

  async getForecastsByItem(itemId: number): Promise<Forecast[]> {
    return this.forecastRepository.find({ where: { itemId }, order: { createdAt: 'DESC' } });
  }

  async getForecastById(id: number): Promise<Forecast | null> {
    return this.forecastRepository.findOne({ where: { id } });
  }

  async deleteForecast(id: number): Promise<void> {
    await this.forecastRepository.delete(id);
  }

  async updateForecast(id: number, dto: UpdateForecastDto): Promise<Forecast> {
  const forecast = await this.forecastRepository.findOne({ where: { id } });
  if (!forecast) {
    throw new Error(`Forecast with ID ${id} not found`);
  }

  Object.assign(forecast, dto);
  return this.forecastRepository.save(forecast);
}

}
