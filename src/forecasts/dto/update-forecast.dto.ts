// dto/update-forecast.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateForecastDto } from './create-forecast.dto';

export class UpdateForecastDto extends PartialType(CreateForecastDto) {}
