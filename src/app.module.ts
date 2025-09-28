import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryModule } from './inventory/inventory.module';
import { PurchaseOrdersModule } from './purchase-orders/purchase-orders.module';
import { StockMovementsModule } from './stock-movements/stock-movements.module';
import { ForecastModule } from './forecasts/forecasts.module';
import { SupplierModule } from './suppliers/suppliers.module';
import { WarehouseModule } from './warehouses/warehouses.module';
import { OrderModule } from './orders/orders.module';
import { CustomerModule } from './customers/customers.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    // Database connection
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'VeganColander#3',
      database: 'supply_chain',
      autoLoadEntities: true,
      synchronize: true, // ⚠️ Dev only, disable in prod
    }),

    // Feature modules
    InventoryModule,
    PurchaseOrdersModule,
    StockMovementsModule,
    ForecastModule,
    SupplierModule,
    WarehouseModule, 
    OrderModule,
    CustomerModule,
    AnalyticsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
