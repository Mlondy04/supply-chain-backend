// dto/top-products.dto.ts
export class TopProductDto {
  name: string;
  sku: string;
  revenue: number;  // <-- now a number
  units: number;    // <-- now a number
  growth: number;   // <-- now a number
}
