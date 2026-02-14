import { Injectable } from '@nestjs/common';
import { BaseProcessor } from './base.processor';
import { PrismaService } from '../../common/prisma.service';

interface CustomerData {
  name: string;
  ka: string;
  channel: string;
  code: string;
}

interface StoreData {
  essStoreCode: string;
  name: string;
  typeCode: string;
  type: string;
  formatType: string;
  status: boolean;
  frequency: number;
  auditTime: number;
  region: string;
  province: string;
  district: string;
  ward: string;
  address: string;
  latitude: string;
  longitude: string;
  customerCode: string;
  supervisorId?: string;
  saleRepId?: string;
  sipId?: string;
}

interface UserData {
  email: string;
  name: string;
  phone?: string;
  role: string;
}

interface BrandData {
  code: string;
  name: string;
}

interface CategoryData {
  code: string;
  name: string;
  nameVN?: string;
}

interface SubCategoryData {
  code: string;
  name: string;
  nameVN?: string;
}

interface ProductData {
  productCode: string;
  oldProductCode?: string;
  name: string;
  nameVN?: string;
  packageSize?: string;
  barcode?: string;
  length: number;
  unit?: string;
  brandCode: string;
  categoryCode?: string;
  subCategoryCode?: string;
  status: boolean;
}

interface SOSRuleData {
  categoryCode: string;
  subCategoryCode: string;
  brandCode: string;
  ruleBig?: string;
  ruleSmall?: string;
  note?: string;
}

interface TargetSOSData {
  storeCode: string;
  categoryCode: string;
  target: number;
}

interface OOLRuleData {
  offCode: string;
  offName: string;
  offNameVN: string;
  ruleBig: boolean;
  ruleSmall: boolean;
  note?: string;
}

@Injectable()
export class MasterDataProcessor extends BaseProcessor {
  private totalCustomers = 0;
  private totalStores = 0;
  private totalUsers = 0;
  private totalBrands = 0;
  private totalCategories = 0;
  private totalSubCategories = 0;
  private totalProducts = 0;
  private totalSOSRules = 0;
  private totalTargetSOS = 0;
  private totalOOLRules = 0;

  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected async processSheet(worksheet: any) {
    const sheetName = worksheet.name;

    console.log(`\n[MasterData] Processing sheet: ${sheetName}`);

    switch (sheetName) {
      case 'Danh sách cửa hàng':
        await this.readStoreSheet(worksheet);
        break;
      case 'Danh sách sản phẩm':
        await this.readProductSheet(worksheet);
        break;
      case 'Danh mục SOS':
        await this.readSOSRuleSheet(worksheet);
        break;
      case 'Target SOS':
        await this.readTargetSOSSheet(worksheet);
        break;
      case 'OOL':
        await this.readOOLRuleSheet(worksheet);
        break;
      default:
        console.log(`[MasterData] Skipping unknown sheet: ${sheetName}`);
    }
  }

  // =============================================
  // READ STORE SHEET
  // =============================================
  private async readStoreSheet(worksheet: any) {
    let rowIndex = 0;
    const HEADER_ROW = 2; // Row 2 is header
    const START_ROW = 4; // Row 4 is data start

    // ⭐ Column mapping based on header order
    const columnMap = {
      KA: -1,
      CHANNEL: -1,
      CUSTOMER_ID: -1,
      CUSTOMER: -1,
      ESSSTORECODE: -1,
      STORE_ID: -1,
      STORE_NAME: -1,
      STORETYPECODE: -1,
      TYPE_STORE: -1,
      FORMATTYPE: -1,
      STATUS: -1,
      SUP_MAIL: -1,
      SUPERVISOR: -1,
      SR: -1,
      SR_MAIL: -1,
      FREQUENCY: -1, // Tần suất
      AUDIT_TIME: -1, // Thời gian chấm
      REGION_NAME: -1,
      PROVINCENAME: -1,
      DISTRICTNAME: -1,
      WARDNAME: -1,
      STORE_ADDRESS: -1,
      PS: -1,
      GHI_CHU: -1,
      LONGITUDE: -1,
      LATITUDE: -1,
      SR_PHONE: -1,
      SIP_PHONE: -1,
    };

    const customers = new Map<string, CustomerData>();
    const users = new Map<string, UserData>();
    const stores: StoreData[] = [];

    for await (const row of worksheet) {
      const rowValue = row.values;
      rowIndex++;

      // Skip row 1
      if (rowIndex < HEADER_ROW) {
        continue;
      }

      // Row 2 - Parse header to find column indexes
      if (rowIndex === HEADER_ROW) {
        console.log(`[Store] Parsing header row...`);

        for (let i = 1; i < rowValue.length; i++) {
          const header = this.getCellValue(rowValue[i])?.trim().toUpperCase();

          if (!header) continue;

          // Map headers to column indexes
          if (header === 'KA') columnMap.KA = i;
          else if (header === 'CHANNEL') columnMap.CHANNEL = i;
          else if (header === 'CUSTOMER_ID') columnMap.CUSTOMER_ID = i;
          else if (header === 'CUSTOMER') columnMap.CUSTOMER = i;
          else if (header === 'ESSSTORECODE') columnMap.ESSSTORECODE = i;
          else if (header === 'STORE_ID') columnMap.STORE_ID = i;
          else if (header === 'STORE_NAME') columnMap.STORE_NAME = i;
          else if (header === 'STORETYPECODE') columnMap.STORETYPECODE = i;
          else if (header === 'TYPE_STORE') columnMap.TYPE_STORE = i;
          else if (header === 'FORMATTYPE') columnMap.FORMATTYPE = i;
          else if (header === 'STATUS') columnMap.STATUS = i;
          else if (header === 'SUP_MAIL') columnMap.SUP_MAIL = i;
          else if (header === 'SUPERVISOR') columnMap.SUPERVISOR = i;
          else if (header === 'SR') columnMap.SR = i;
          else if (header === 'SR_MAIL') columnMap.SR_MAIL = i;
          else if (header === 'TẦN SUẤT' || header.includes('TẦN SUẤT'))
            columnMap.FREQUENCY = i;
          else if (header === 'THỜI GIAN CHẤM' || header.includes('THỜI GIAN'))
            columnMap.AUDIT_TIME = i;
          else if (header === 'REGION NAME' || header === 'REGION_NAME')
            columnMap.REGION_NAME = i;
          else if (header === 'PROVINCENAME') columnMap.PROVINCENAME = i;
          else if (header === 'DISTRICTNAME') columnMap.DISTRICTNAME = i;
          else if (header === 'WARDNAME') columnMap.WARDNAME = i;
          else if (header === 'STORE_ADDRESS') columnMap.STORE_ADDRESS = i;
          else if (header === 'PS') columnMap.PS = i;
          else if (header === 'GHI CHU' || header === 'GHI_CHU')
            columnMap.GHI_CHU = i;
          else if (header === 'LONGITUDE') columnMap.LONGITUDE = i;
          else if (header === 'LATITUDE') columnMap.LATITUDE = i;
          else if (header === 'SR_PHONE') columnMap.SR_PHONE = i;
          else if (header === 'SIP_PHONE') columnMap.SIP_PHONE = i;
        }

        console.log(`[Store] Column mapping:`, columnMap);
        continue;
      }

      if (rowIndex < START_ROW) {
        continue;
      }

      // Skip if column mapping not complete
      if (columnMap.ESSSTORECODE === -1 || columnMap.CUSTOMER_ID === -1) {
        console.error('[Store] Column mapping incomplete, skipping data rows');
        break;
      }

      // ⭐ Extract data using column map
      const customerCode = this.getCellValue(
        rowValue[columnMap.CUSTOMER_ID],
      )?.trim();
      const customerName = this.getCellValue(
        rowValue[columnMap.CUSTOMER],
      )?.trim();
      const ka = this.getCellValue(rowValue[columnMap.KA])?.trim();
      const channel = this.getCellValue(rowValue[columnMap.CHANNEL])?.trim();

      // Collect unique customers
      if (customerCode && customerName && ka && channel) {
        customers.set(customerCode, {
          code: customerCode,
          name: customerName,
          ka,
          channel,
        });
      }

      // Supervisor
      const supEmail = this.getCellValue(rowValue[columnMap.SUP_MAIL])
        ?.toLowerCase()
        ?.trim();
      const supName = this.getCellValue(rowValue[columnMap.SUPERVISOR])?.trim();

      if (supEmail && supName && supEmail !== '-') {
        users.set(supEmail, {
          email: supEmail,
          name: supName,
          role: 'SUPERVISOR',
        });
      }

      // Sale Rep
      const srEmail = this.getCellValue(rowValue[columnMap.SR_MAIL])
        ?.toLowerCase()
        ?.trim();
      const srName = this.getCellValue(rowValue[columnMap.SR])?.trim();
      const srPhone = this.getCellValue(rowValue[columnMap.SR_PHONE])?.trim();

      if (srEmail && srName && srEmail !== '-') {
        users.set(srEmail, {
          email: srEmail,
          name: srName,
          phone: srPhone,
          role: 'SALE_REP',
        });
      }

      // Store data
      const essStoreCode = this.getCellValue(
        rowValue[columnMap.ESSSTORECODE],
      )?.trim();
      const storeName = this.getCellValue(
        rowValue[columnMap.STORE_NAME],
      )?.trim();

      if (essStoreCode && storeName && customerCode) {
        stores.push({
          essStoreCode,
          name: storeName,
          customerCode,
          supervisorId: supEmail,
          saleRepId: srEmail,
          typeCode:
            this.getCellValue(rowValue[columnMap.STORETYPECODE])?.trim() || '',
          type: this.getCellValue(rowValue[columnMap.TYPE_STORE])?.trim() || '',
          formatType:
            this.getCellValue(rowValue[columnMap.FORMATTYPE])?.trim() || '',
          status: true,
          frequency: this.getCellValueNumber(rowValue[columnMap.FREQUENCY]),
          auditTime: this.getCellValueNumber(rowValue[columnMap.AUDIT_TIME]),
          region:
            this.getCellValue(rowValue[columnMap.REGION_NAME])?.trim() || '',
          province:
            this.getCellValue(rowValue[columnMap.PROVINCENAME])?.trim() || '',
          district:
            this.getCellValue(rowValue[columnMap.DISTRICTNAME])?.trim() || '',
          ward: this.getCellValue(rowValue[columnMap.WARDNAME])?.trim() || '',
          address:
            this.getCellValue(rowValue[columnMap.STORE_ADDRESS])?.trim() || '',
          latitude:
            this.getCellValue(rowValue[columnMap.LATITUDE])?.trim() || '',
          longitude:
            this.getCellValue(rowValue[columnMap.LONGITUDE])?.trim() || '',
        });
      }
    }

    console.log(`\n[Store] Collected data:`);
    console.log(`  - Unique customers: ${customers.size}`);
    console.log(`  - Unique users: ${users.size}`);
    console.log(`  - Stores: ${stores.length}`);

    // ⭐ DEBUG: Check customer codes
    console.log(`\n[DEBUG] Sample customers:`);
    const sampleCustomers = Array.from(customers.values()).slice(0, 5);
    sampleCustomers.forEach((c) => {
      console.log(`  - Code: "${c.code}" | Name: "${c.name}"`);
    });

    console.log(`\n[DEBUG] Sample stores with customerCode:`);
    const sampleStores = stores.slice(0, 5);
    sampleStores.forEach((s) => {
      console.log(`  - Store: "${s.name}" | CustomerCode: "${s.customerCode}"`);
    });

    // ⭐ Check for missing customers
    const uniqueCustomerCodes = new Set(stores.map((s) => s.customerCode));
    const existingCustomerCodes = new Set(
      Array.from(customers.values()).map((c) => c.code),
    );
    const missingCodes = Array.from(uniqueCustomerCodes).filter(
      (code) => !existingCustomerCodes.has(code),
    );

    if (missingCodes.length > 0) {
      console.warn(
        `\n[WARNING] ⚠️  Stores reference ${missingCodes.length} missing customers:`,
      );
      console.warn(missingCodes.slice(0, 10));
    }

    // Create customers first
    await this.createCustomers(Array.from(customers.values()));

    // Create users
    await this.createUsers(Array.from(users.values()));

    // Create stores
    await this.createStores(stores);

    console.log(`\n[Store] Summary:`);
    console.log(`  - Customers: ${this.totalCustomers}`);
    console.log(`  - Users: ${this.totalUsers}`);
    console.log(`  - Stores: ${this.totalStores}`);
  }

  // =============================================
  // READ PRODUCT SHEET
  // =============================================
  private async readProductSheet(worksheet: any) {
    let rowIndex = 0;
    const HEADER_ROW = 1;
    const START_ROW = 2; // Data starts from row 2

    // ⭐ Column mapping based on header order
    const columnMap = {
      CATEGORY: -1,
      CATEGORY_ID: -1,
      CATEGORY_CODE: -1,
      CATEGORY_VN: -1,
      BRAND: -1,
      BRAND_CODE: -1,
      BRAND_ID: -1,
      ITEM_CODE: -1,
      PRODUCT_NAME: -1,
      PRODUCT_NAME_VN: -1,
      PACKSIZE: -1,
      BARCODE: -1,
      LENGTH: -1,
      UNIT_OF_DIMENSION: -1,
      SUB_CAT_VN: -1,
      SUB_CAT_ID: -1,
    };

    const brands = new Map<string, BrandData>();
    const categories = new Map<string, CategoryData>();
    const subCategories = new Map<string, SubCategoryData>();
    const products: ProductData[] = [];

    for await (const row of worksheet) {
      const rowValue = row.values;
      rowIndex++;

      // Skip before header
      if (rowIndex < HEADER_ROW) {
        continue;
      }

      // Row 1 - Parse header to find column indexes
      if (rowIndex === HEADER_ROW) {
        console.log(`[Product] Parsing header row...`);

        for (let i = 1; i < rowValue.length; i++) {
          const header = this.getCellValue(rowValue[i])?.trim().toUpperCase();

          if (!header) break;

          // Map headers to column indexes
          if (header === 'CATEGORY') columnMap.CATEGORY = i;
          else if (header === 'CATEGORY_ID') columnMap.CATEGORY_ID = i;
          else if (header === 'CATEGORY_CODE') columnMap.CATEGORY_CODE = i;
          else if (header === 'CATEGORY_VN') columnMap.CATEGORY_VN = i;
          else if (header === 'BRAND') columnMap.BRAND = i;
          else if (header === 'BRAND_CODE') columnMap.BRAND_CODE = i;
          else if (header === 'BRAND_ID') columnMap.BRAND_ID = i;
          else if (header === 'ITEM_CODE') columnMap.ITEM_CODE = i;
          else if (header === 'PRODUCT_NAME') columnMap.PRODUCT_NAME = i;
          else if (header === 'PRODUCT_NAME_VN') columnMap.PRODUCT_NAME_VN = i;
          else if (header === 'PACKSIZE') columnMap.PACKSIZE = i;
          else if (header === 'BARCODE') columnMap.BARCODE = i;
          else if (header === 'LENGTH') columnMap.LENGTH = i;
          else if (
            header === 'UNIT OF DIMENSION' ||
            header === 'UNIT_OF_DIMENSION'
          )
            columnMap.UNIT_OF_DIMENSION = i;
          else if (header === 'SUB_CAT_VN') columnMap.SUB_CAT_VN = i;
          else if (header === 'SUB_CAT_ID') columnMap.SUB_CAT_ID = i;
        }

        console.log(`[Product] Column mapping:`, columnMap);
        continue;
      }

      // Skip before data start
      if (rowIndex < START_ROW) {
        continue;
      }

      // Skip if column mapping not complete
      if (columnMap.ITEM_CODE === -1 || columnMap.BRAND_CODE === -1) {
        console.error(
          '[Product] Column mapping incomplete, skipping data rows',
        );
        break;
      }

      // ⭐ Extract data using column map
      // Brand
      const brandCode = this.getCellValue(
        rowValue[columnMap.BRAND_CODE],
      )?.trim();
      const brandName = this.getCellValue(rowValue[columnMap.BRAND])?.trim();

      if (brandCode && brandName) {
        brands.set(brandCode, { code: brandCode, name: brandName });
      }

      // Category
      const categoryCode = this.getCellValue(
        rowValue[columnMap.CATEGORY_CODE],
      )?.trim();
      const categoryName = this.getCellValue(
        rowValue[columnMap.CATEGORY],
      )?.trim();
      const categoryVN = this.getCellValue(
        rowValue[columnMap.CATEGORY_VN],
      )?.trim();

      if (categoryCode && categoryName) {
        categories.set(categoryCode, {
          code: categoryCode,
          name: categoryName,
          nameVN: categoryVN,
        });
      }

      // SubCategory
      const subCatCode = this.getCellValue(
        rowValue[columnMap.SUB_CAT_ID],
      )?.trim();
      const subCatVN = this.getCellValue(
        rowValue[columnMap.SUB_CAT_VN],
      )?.trim();

      if (subCatCode && subCatVN) {
        subCategories.set(subCatCode, {
          code: subCatCode,
          name: subCatVN,
          nameVN: subCatVN,
        });
      }

      // Product
      const itemCode = this.getCellValue(rowValue[columnMap.ITEM_CODE])?.trim();
      // console.log(
      //   `Processing row ${rowIndex}: itemCode=${itemCode}, brandCode=${brandCode}`,
      // );
      if (itemCode && brandCode) {
        products.push({
          productCode: itemCode,
          name:
            this.getCellValue(rowValue[columnMap.PRODUCT_NAME])?.trim() || '',
          nameVN:
            this.getCellValue(rowValue[columnMap.PRODUCT_NAME_VN])?.trim() ||
            '',
          packageSize: this.getCellValue(rowValue[columnMap.PACKSIZE])?.trim(),
          barcode: this.getCellValue(rowValue[columnMap.BARCODE])?.trim(),
          length: this.getCellValueNumber(rowValue[columnMap.LENGTH]),
          unit: this.getCellValue(
            rowValue[columnMap.UNIT_OF_DIMENSION],
          )?.trim(),
          brandCode,
          categoryCode: categoryCode || undefined,
          subCategoryCode: subCatCode || undefined,
          status: true,
        });
      }
    }

    console.log(`\n[Product] Collected data:`);
    console.log(`  - Unique brands: ${brands.size}`);
    console.log(`  - Unique categories: ${categories.size}`);
    console.log(`  - Unique subCategories: ${subCategories.size}`);
    console.log(`  - Products: ${products.length}`);

    // ⭐ DEBUG: Check sample data
    console.log(`\n[DEBUG] Sample brands:`);
    const sampleBrands = Array.from(brands.values()).slice(0, 3);
    sampleBrands.forEach((b) => {
      console.log(`  - Code: "${b.code}" | Name: "${b.name}"`);
    });

    console.log(`\n[DEBUG] Sample categories:`);
    const sampleCategories = Array.from(categories.values()).slice(0, 3);
    sampleCategories.forEach((c) => {
      console.log(
        `  - Code: "${c.code}" | Name: "${c.name}" | VN: "${c.nameVN}"`,
      );
    });

    console.log(`\n[DEBUG] Sample products:`);
    const sampleProducts = products.slice(0, 3);
    sampleProducts.forEach((p) => {
      console.log(
        `  - Code: "${p.productCode}" | Name: "${p.name}" | Brand: "${p.brandCode}"`,
      );
    });

    // ⭐ Check for missing brands
    const uniqueBrandCodes = new Set(products.map((p) => p.brandCode));
    const existingBrandCodes = new Set(
      Array.from(brands.values()).map((b) => b.code),
    );
    const missingBrandCodes = Array.from(uniqueBrandCodes).filter(
      (code) => !existingBrandCodes.has(code),
    );

    if (missingBrandCodes.length > 0) {
      console.warn(
        `\n[WARNING] ⚠️  Products reference ${missingBrandCodes.length} missing brands:`,
      );
      console.warn(missingBrandCodes.slice(0, 10));
    }

    // Create in order: brands → categories → subcategories → products
    await this.createBrands(Array.from(brands.values()));
    await this.createCategories(Array.from(categories.values()));
    await this.createSubCategories(Array.from(subCategories.values()));
    await this.createProducts(products);
    console.log(`\n[Product] Summary:`);
    console.log(`  - Brands: ${this.totalBrands}`);
    console.log(`  - Categories: ${this.totalCategories}`);
    console.log(`  - SubCategories: ${this.totalSubCategories}`);
    console.log(`  - Products: ${this.totalProducts}`);
  }

  // =============================================
  // READ SOS RULE SHEET
  // =============================================
  private async readSOSRuleSheet(worksheet: any) {
    let rowIndex = 0;
    const HEADER_ROW = 1;
    const START_ROW = 3; // Data starts from row 3

    // ⭐ Column mapping based on header order
    const columnMap = {
      CATEGORY: -1,
      CATEGORY_ID: -1,
      CATEGORY_CODE: -1,
      CATEGORY_VN: -1,
      SUB_CAT_VN: -1,
      SUB_CAT_ID: -1,
      BRAND: -1,
      BRAND_CODE: -1,
      BRAND_ID: -1,
      RULE_SMALL: -1, // QUY TẮC ĐO Small format
      RULE_BIG: -1, // QUY TẮC ĐO Big format
    };

    const sosRules: SOSRuleData[] = [];

    for await (const row of worksheet) {
      const rowValue = row.values;
      rowIndex++;

      // Skip before header
      if (rowIndex < HEADER_ROW) {
        continue;
      }

      // Row 1 - Parse header to find column indexes
      if (rowIndex === HEADER_ROW) {
        console.log(`[SOSRule] Parsing header row...`);

        for (let i = 1; i < rowValue.length; i++) {
          const header = this.getCellValue(rowValue[i])?.trim().toUpperCase();

          if (!header) break;

          // Map headers to column indexes
          if (header === 'CATEGORY') columnMap.CATEGORY = i;
          else if (header === 'CATEGORY_ID') columnMap.CATEGORY_ID = i;
          else if (header === 'CATEGORY_CODE') columnMap.CATEGORY_CODE = i;
          else if (header === 'CATEGORY_VN') columnMap.CATEGORY_VN = i;
          else if (header === 'SUB_CAT_VN') columnMap.SUB_CAT_VN = i;
          else if (header === 'SUB_CAT_ID') columnMap.SUB_CAT_ID = i;
          else if (header === 'BRAND') columnMap.BRAND = i;
          else if (header === 'BRAND_CODE') columnMap.BRAND_CODE = i;
          else if (header === 'BRAND_ID') columnMap.BRAND_ID = i;
          else if (
            header.includes('SMALL FORMAT') ||
            header.includes('SMALL')
          ) {
            columnMap.RULE_SMALL = i;
          } else if (header.includes('BIG FORMAT') || header.includes('BIG')) {
            columnMap.RULE_BIG = i;
          }
        }

        console.log(`[SOSRule] Column mapping:`, columnMap);
        continue;
      }

      // Skip before data start
      if (rowIndex < START_ROW) {
        continue;
      }

      // Skip if column mapping not complete
      if (
        columnMap.CATEGORY_CODE === -1 ||
        columnMap.SUB_CAT_ID === -1 ||
        columnMap.BRAND_CODE === -1
      ) {
        console.error(
          '[SOSRule] Column mapping incomplete, skipping data rows',
        );
        break;
      }

      // ⭐ Extract data using column map
      const categoryCode = this.getCellValue(
        rowValue[columnMap.CATEGORY_CODE],
      )?.trim();
      const subCategoryCode = this.getCellValue(
        rowValue[columnMap.SUB_CAT_ID],
      )?.trim();
      const brandCode = this.getCellValue(
        rowValue[columnMap.BRAND_CODE],
      )?.trim();
      const ruleSmall = this.getCellValueRichText(
        rowValue[columnMap.RULE_SMALL],
      )?.trim();
      const ruleBig = this.getCellValueRichText(
        rowValue[columnMap.RULE_BIG],
      )?.trim();
      // console.log(
      //   `Processing row ${rowIndex}: ruleBig=${ruleBig}, ruleSmall=${ruleSmall}}`,
      // );
      if (categoryCode && subCategoryCode && brandCode) {
        sosRules.push({
          categoryCode,
          subCategoryCode,
          brandCode,
          ruleBig,
          ruleSmall,
        });
      }
    }

    console.log(`\n[SOSRule] Collected data:`);
    console.log(`  - Total rules: ${sosRules.length}`);

    // ⭐ DEBUG: Check sample rules
    console.log(`\n[DEBUG] Sample SOS Rules:`);
    const sampleRules = sosRules.slice(0, 3);
    sampleRules.forEach((r) => {
      console.log(
        `  - Category: "${r.categoryCode}" | SubCat: "${r.subCategoryCode}" | Brand: "${r.brandCode}"`,
      );
      console.log(`    Small: "${r.ruleSmall}" | Big: "${r.ruleBig}"`);
    });

    // ⭐ Check for missing references & AUTO-CREATE
    const uniqueCategoryCodes = new Set(sosRules.map((r) => r.categoryCode));
    const uniqueSubCategoryCodes = new Set(
      sosRules.map((r) => r.subCategoryCode),
    );
    const uniqueBrandCodes = new Set(sosRules.map((r) => r.brandCode));

    console.log(`\n[SOSRule] Checking for missing references...`);

    // Check & auto-create missing categories
    const existingCategories = await this.prisma.category.findMany({
      where: { code: { in: Array.from(uniqueCategoryCodes) } },
      select: { code: true },
    });
    const existingCategoryCodes = new Set(
      existingCategories.map((c) => c.code),
    );
    const missingCategories = Array.from(uniqueCategoryCodes).filter(
      (code) => !existingCategoryCodes.has(code),
    );

    if (missingCategories.length > 0) {
      console.warn(
        `  ⚠️  Auto-creating ${missingCategories.length} missing categories:`,
        missingCategories,
      );
      await this.prisma.category.createMany({
        data: missingCategories.map((code) => ({
          code,
          name: `Category ${code}`,
          nameVN: `Danh mục ${code}`,
        })),
        skipDuplicates: true,
      });
      console.log(`  ✅ Created ${missingCategories.length} categories`);
    } else {
      console.log(`  ✅ All categories exist`);
    }

    // Check & auto-create missing subcategories
    const existingSubCategories = await this.prisma.subCategory.findMany({
      where: { code: { in: Array.from(uniqueSubCategoryCodes) } },
      select: { code: true },
    });
    const existingSubCategoryCodes = new Set(
      existingSubCategories.map((s) => s.code),
    );
    const missingSubCategories = Array.from(uniqueSubCategoryCodes).filter(
      (code) => !existingSubCategoryCodes.has(code),
    );

    if (missingSubCategories.length > 0) {
      console.warn(
        `  ⚠️  Auto-creating ${missingSubCategories.length} missing subcategories:`,
        missingSubCategories,
      );
      await this.prisma.subCategory.createMany({
        data: missingSubCategories.map((code) => ({
          code,
          name: `SubCategory ${code}`,
          nameVN: `Danh mục phụ ${code}`,
        })),
        skipDuplicates: true,
      });
      console.log(`  ✅ Created ${missingSubCategories.length} subcategories`);
    } else {
      console.log(`  ✅ All subcategories exist`);
    }

    // Check & auto-create missing brands
    const existingBrands = await this.prisma.brand.findMany({
      where: { code: { in: Array.from(uniqueBrandCodes) } },
      select: { code: true },
    });
    const existingBrandCodes = new Set(existingBrands.map((b) => b.code));
    const missingBrands = Array.from(uniqueBrandCodes).filter(
      (code) => !existingBrandCodes.has(code),
    );

    if (missingBrands.length > 0) {
      console.warn(
        `  ⚠️  Auto-creating ${missingBrands.length} missing brands:`,
        missingBrands,
      );
      await this.prisma.brand.createMany({
        data: missingBrands.map((code) => ({
          code,
          name: `Brand ${code}`,
        })),
        skipDuplicates: true,
      });
      console.log(`  ✅ Created ${missingBrands.length} brands`);
    } else {
      console.log(`  ✅ All brands exist`);
    }

    // Create SOS rules
    await this.createSOSRules(sosRules);

    console.log(`\n[SOSRule] Summary:`);
    console.log(`  - Created: ${this.totalSOSRules} rules`);
  }

  // =============================================
  // READ TARGET SOS SHEET
  // =============================================
  private async readTargetSOSSheet(worksheet: any) {
    let rowIndex = 0;
    const HEADER_ROW = 1;
    const targets: TargetSOSData[] = [];

    for await (const row of worksheet) {
      const rowValue = row.values;
      rowIndex++;

      if (rowIndex <= HEADER_ROW) continue;

      const storeCode = this.getCellValue(rowValue[1])?.trim();
      const categoryCode = this.getCellValue(rowValue[2])?.trim();
      const targetStr = this.getCellValue(rowValue[3])?.trim();

      if (storeCode && categoryCode && targetStr) {
        const target = parseFloat(targetStr.replace('%', '')) / 100;
        targets.push({ storeCode, categoryCode, target });
      }
    }

    await this.createTargetSOS(targets);

    console.log(`[TargetSOS] Created ${this.totalTargetSOS} targets`);
  }

  // =============================================
  // READ OOL RULE SHEET
  // =============================================
  private async readOOLRuleSheet(worksheet: any) {
    console.log(`\n[OOLRule] Starting to read OOL Rule sheet...`);
    let rowIndex = 0;
    const HEADER_ROW = 1;
    const START_ROW = 2; // Data starts from row 2

    // ⭐ Column mapping based on header order
    const columnMap = {
      OFF_LOCATION_ID: -1,
      OFF_LOCATION: -1,
      OFF_LOCATION_VN: -1,
      BIG_FORMAT: -1,
      SMALL_FORMAT: -1,
    };

    const oolRules: OOLRuleData[] = [];

    for await (const row of worksheet) {
      const rowValue = row.values;
      rowIndex++;

      // Skip before header
      if (rowIndex < HEADER_ROW) {
        continue;
      }

      // Row 1 - Parse header to find column indexes
      if (rowIndex === HEADER_ROW) {
        console.log(`[OOLRule] Parsing header row...`);

        for (let i = 1; i < rowValue.length; i++) {
          const header = this.getCellValue(rowValue[i])?.trim().toUpperCase();

          if (!header) break;

          // Map headers to column indexes
          if (header === 'OFF_LOCATION_ID') columnMap.OFF_LOCATION_ID = i;
          else if (header === 'OFF_LOCATION') columnMap.OFF_LOCATION = i;
          else if (header === 'OFF_LOCATION_VN') columnMap.OFF_LOCATION_VN = i;
          else if (
            header === 'BIG FORMART' ||
            header === 'BIG FORMAT' ||
            header.includes('BIG')
          )
            columnMap.BIG_FORMAT = i;
          else if (header === 'SMALL FORMAT' || header.includes('SMALL'))
            columnMap.SMALL_FORMAT = i;
        }

        console.log(`[OOLRule] Column mapping:`, columnMap);
        continue;
      }

      // Skip before data start
      if (rowIndex < START_ROW) {
        continue;
      }

      // Skip if column mapping not complete
      if (
        columnMap.OFF_LOCATION_ID === -1 ||
        columnMap.OFF_LOCATION === -1 ||
        columnMap.OFF_LOCATION_VN === -1
      ) {
        console.error(
          '[OOLRule] Column mapping incomplete, skipping data rows',
        );
        break;
      }

      // ⭐ Extract data using column map
      const offCode = this.getCellValue(
        rowValue[columnMap.OFF_LOCATION_ID],
      )?.trim();
      const offName = this.getCellValue(
        rowValue[columnMap.OFF_LOCATION],
      )?.trim();
      const offNameVN = this.getCellValue(
        rowValue[columnMap.OFF_LOCATION_VN],
      )?.trim();
      const bigFormatValue = this.getCellValue(rowValue[columnMap.BIG_FORMAT])
        ?.trim()
        ?.toLowerCase();
      const smallFormatValue = this.getCellValue(
        rowValue[columnMap.SMALL_FORMAT],
      )
        ?.trim()
        ?.toLowerCase();

      // ⭐ Check for 'x' or 'X' to determine true/false
      const isBig = bigFormatValue === 'x' || bigFormatValue === '1';
      const isSmall = smallFormatValue === 'x' || smallFormatValue === '1';

      if (offCode && offName && offNameVN) {
        oolRules.push({
          offCode,
          offName,
          offNameVN,
          ruleBig: isBig,
          ruleSmall: isSmall,
        });
      }
    }

    console.log(`\n[OOLRule] Collected data:`);
    console.log(`  - Total rules: ${oolRules.length}`);

    // ⭐ DEBUG: Check sample rules
    console.log(`\n[DEBUG] Sample OOL Rules:`);
    const sampleRules = oolRules.slice(0, 5);
    sampleRules.forEach((r) => {
      console.log(
        `  - Code: "${r.offCode}" | Name: "${r.offName}" | VN: "${r.offNameVN}"`,
      );
      console.log(`    Big: ${r.ruleBig} | Small: ${r.ruleSmall}`);
    });
    await this.createOOLRules(oolRules);
  }

  // =============================================
  // HELPER: CREATE FUNCTIONS
  // =============================================

  private async createCustomers(customers: CustomerData[]) {
    const chunk: CustomerData[] = [];

    for (const customer of customers) {
      chunk.push(customer);

      if (chunk.length >= this.CHUNK_SIZE) {
        await this.saveCustomerChunk(chunk.splice(0, chunk.length));
      }
    }

    if (chunk.length > 0) {
      await this.saveCustomerChunk(chunk);
    }
  }

  private async saveCustomerChunk(chunk: CustomerData[]) {
    await this.prisma.customer.createMany({
      data: chunk,
      skipDuplicates: true,
    });
    this.totalCustomers += chunk.length;
    console.log(`[Customer] Saved ${this.totalCustomers} customers`);
  }

  private async createUsers(users: UserData[]) {
    for (const user of users) {
      await this.prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          userName: user.email,
          email: user.email,
          name: user.name,
          phoneNumber: user.phone || '',
          password: '123456',
          role: {
            connectOrCreate: {
              where: { name: user.role },
              create: { name: user.role },
            },
          },
        },
      });
      this.totalUsers++;
    }
    console.log(`[User] Created ${this.totalUsers} users`);
  }

  private async createStores(stores: StoreData[]) {
    const chunk: any[] = [];

    for (const store of stores) {
      const supervisor = store.supervisorId
        ? await this.prisma.user.findUnique({
            where: { email: store.supervisorId },
          })
        : null;
      const saleRep = store.saleRepId
        ? await this.prisma.user.findUnique({
            where: { email: store.saleRepId },
          })
        : null;
      chunk.push({
        essStoreCode: store.essStoreCode,
        name: store.name,
        typeCode: store.typeCode,
        type: store.type,
        formatType: store.formatType,
        status: store.status,
        frequency: store.frequency,
        auditTime: store.auditTime,
        region: store.region,
        province: store.province,
        district: store.district,
        ward: store.ward,
        address: store.address,
        latitude: store.latitude,
        longitude: store.longitude,
        customerCode: store.customerCode,
        supervisorId: supervisor?.id,
        saleRepId: saleRep?.id,
      });

      if (chunk.length >= this.CHUNK_SIZE) {
        await this.saveStoreChunk(chunk.splice(0, chunk.length));
      }
    }

    if (chunk.length > 0) {
      await this.saveStoreChunk(chunk);
    }
  }

  private async saveStoreChunk(chunk: any[]) {
    await this.prisma.store.createMany({
      data: chunk,
      skipDuplicates: true,
    });
    this.totalStores += chunk.length;
    console.log(`[Store] Saved ${this.totalStores} stores`);
  }

  private async createBrands(brands: BrandData[]) {
    await this.prisma.brand.createMany({
      data: brands,
      skipDuplicates: true,
    });
    this.totalBrands = brands.length;
  }

  private async createCategories(categories: CategoryData[]) {
    await this.prisma.category.createMany({
      data: categories,
      skipDuplicates: true,
    });
    this.totalCategories = categories.length;
  }

  private async createSubCategories(subCategories: SubCategoryData[]) {
    await this.prisma.subCategory.createMany({
      data: subCategories,
      skipDuplicates: true,
    });
    this.totalSubCategories = subCategories.length;
  }

  private async createProducts(products: ProductData[]) {
    const chunk: ProductData[] = [];

    for (const product of products) {
      chunk.push(product);

      if (chunk.length >= this.CHUNK_SIZE) {
        await this.saveProductChunk(chunk.splice(0, chunk.length));
      }
    }

    if (chunk.length > 0) {
      await this.saveProductChunk(chunk);
    }
  }

  private async saveProductChunk(chunk: ProductData[]) {
    await this.prisma.product.createMany({
      data: chunk,
      skipDuplicates: true,
    });
    this.totalProducts += chunk.length;
    console.log(`[Product] Saved ${this.totalProducts} products`);
  }

  private async createSOSRules(rules: SOSRuleData[]) {
    for (const rule of rules) {
      await this.prisma.sOSRule.upsert({
        where: {
          categoryCode_subCategoryCode_brandCode: {
            categoryCode: rule.categoryCode,
            subCategoryCode: rule.subCategoryCode,
            brandCode: rule.brandCode,
          },
        },
        update: {
          ruleBig: rule.ruleBig,
          ruleSmall: rule.ruleSmall,
          note: rule.note,
        },
        create: rule,
      });
      this.totalSOSRules++;
    }
  }

  private async createTargetSOS(targets: TargetSOSData[]) {
    // for (const target of targets) {
    //   await this.prisma.targetSOS.upsert({
    //     where: {
    //       storeCode_categoryCode: {
    //         storeCode: target.storeCode,
    //         categoryCode: target.categoryCode,
    //       },
    //     },
    //     update: { target: target.target },
    //     create: target,
    //   });
    //   this.totalTargetSOS++;
    // }
  }

  private async createOOLRules(rules: OOLRuleData[]) {
    console.log(
      `\n[OOLRule] Creating OOL Rules in database... ${rules.length} rules`,
    );
    await this.prisma.oOLRule.createMany({
      data: rules,
      skipDuplicates: true,
    });
    this.totalOOLRules = rules.length;
  }

  private getCellValue(cell: any): string | null {
    if (!cell) return null;
    if (typeof cell === 'string') return cell;
    if (typeof cell === 'number') return cell.toString();
    if (cell.text) return cell.text;
    if (cell.result) return cell.result.toString();
    return cell.toString();
  }

  private getCellValueNumber(cell: any): number {
    if (!cell) return 0;
    if (typeof cell === 'number') return Math.floor(cell);
    const str = this.getCellValue(cell);
    if (!str) return 0;
    const num = parseInt(str.replace(/[^\d]/g, ''));
    return isNaN(num) ? 0 : num;
  }

  private getCellValueRichText(cell: any): string | null {
    if (!cell) return null;

    // ⭐ Handle rich text format
    if (cell.richText && Array.isArray(cell.richText)) {
      return cell.richText.map((rt: any) => rt.text || '').join('');
    }

    if (typeof cell === 'string') return cell;
    if (typeof cell === 'number') return cell.toString();
    if (cell.text) return cell.text;
    if (cell.result) return cell.result.toString();

    // ⭐ Check if it's an object with richText property
    if (typeof cell === 'object' && cell.richText) {
      return cell.richText.map((rt: any) => rt.text || '').join('');
    }

    return cell.toString();
  }
}
