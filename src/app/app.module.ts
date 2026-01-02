import { Module } from '@nestjs/common';
import { UserModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from '../auth/role/roles.guard';
import { ImportDataModule } from '../import-data/import-data.module';
import { StoresModule } from '../stores/stores.module';
import { CustomersModule } from '../customers/customers.module';
import { CategoriesModule } from '../categories/categories.module';
import { BrandsModule } from '../brands/brands.module';
import { ProductsModule } from '../products/products.module';
import { RolesModule } from '../roles/roles.module';
import { SubCategoriesModule } from '../sub-categories/sub-categories.module';
import { TargetSOSModule } from '../target-sos/target-sos.module';
import { SubCategoryInCategoryModule } from '../sub-category-in-category/sub-category-in-category.module';
import { SOSRulesModule } from '../sos-rules/sos-rules.module';
import { OOLRulesModule } from '../ool-rules/ool-rules.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.AUTH_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    UserModule,
    AuthModule,
    ImportDataModule,
    StoresModule,
    CustomersModule,
    CategoriesModule,
    BrandsModule,
    ProductsModule,
    RolesModule,
    SubCategoriesModule,
    TargetSOSModule,
    SubCategoryInCategoryModule,
    SOSRulesModule,
    OOLRulesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
