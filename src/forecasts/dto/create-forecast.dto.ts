// dto/create-forecast.dto.ts
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateForecastDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  forecastedDemand: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsNotEmpty()
  @IsString()
  period: string;

  @IsNumber()
  @IsNotEmpty()
  predictedQuantity: number;

  @IsString()
  @IsOptional()
  method?: string;
}
