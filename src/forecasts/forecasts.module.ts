import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Forecast } from './entities/forecast.entity';
import { ForecastService } from './forecasts.service';
import { ForecastController } from './forecasts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Forecast])],
  providers: [ForecastService],
  controllers: [ForecastController],
  exports: [ForecastService],
})
export class ForecastModule {}
