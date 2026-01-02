import { Module } from '@nestjs/common';
import { ImportDataService } from './import-data.service';
import { ImportDataController } from './import-data.controller';
import { UserModule } from '../users/users.module';
import { CustomersModule } from 'src/customers/customers.module';
import { StoresModule } from 'src/stores/stores.module';
import { SubCategoriesModule } from 'src/sub-categories/sub-categories.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { BrandsModule } from 'src/brands/brands.module';
import { ProductsModule } from 'src/products/products.module';
import { SOSRulesModule } from 'src/sos-rules/sos-rules.module';
import { TargetSOSModule } from 'src/target-sos/target-sos.module';
import { OOLRulesModule } from 'src/ool-rules/ool-rules.module';

@Module({
  imports: [
    UserModule,
    CustomersModule,
    StoresModule,
    SubCategoriesModule,
    CategoriesModule,
    ProductsModule,
    BrandsModule,
    SOSRulesModule,
    TargetSOSModule,
    OOLRulesModule,
  ],
  controllers: [ImportDataController],
  providers: [ImportDataService],
})
export class ImportDataModule {}
