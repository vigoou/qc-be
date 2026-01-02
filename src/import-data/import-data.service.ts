import { OOLRulesService } from './../ool-rules/ool-rules.service';
import { TargetSOSService } from './../target-sos/target-sos.service';
import { SOSRulesService } from './../sos-rules/sos-rules.service';
import { SubCategory } from './../../node_modules/.prisma/client/index.d';
import { ProductsService } from './../products/products.service';
import { CategoriesService } from './../categories/categories.service';
import { SubCategoriesService } from './../sub-categories/sub-categories.service';
import { BrandsService } from './../brands/brands.service';
import { StoresService } from './../stores/stores.service';
import { CustomersService } from './../customers/customers.service';
import { Injectable } from '@nestjs/common';
import { CreateImportDatumDto } from './dto/create-import-datum.dto';
import { UpdateImportDatumDto } from './dto/update-import-datum.dto';
import { UsersService } from '../users/users.service';
import * as XLSX from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';
import { Brand, Category, Customer, Prisma, User } from '@prisma/client';
import { Role } from 'src/enum/role.enum';

interface SheetData {
  sheetName: string;
  data: any[];
}

interface EmployeeData {
  email: string;
  name: string;
  phone?: string;
}

@Injectable()
export class ImportDataService {
  constructor(
    private readonly usersService: UsersService,
    private readonly customersService: CustomersService,
    private readonly storesService: StoresService,
    private readonly brandsService: BrandsService,
    private readonly subCategoriesService: SubCategoriesService,
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
    private readonly sosRulesService: SOSRulesService,
    private readonly targetSOSService: TargetSOSService,
    private readonly oolRulesService: OOLRulesService,
  ) {}

  readMasterDataFile(fileName: string): SheetData[] {
    try {
      // Construct file path
      const filePath = path.join(process.cwd(), 'src', 'assets', fileName);

      // Check if file exists
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }

      // Read the Excel file
      const workbook = XLSX.readFile(filePath);

      // Get all sheet names
      const sheetNames = workbook.SheetNames;

      // Read data from all sheets
      const allSheetsData: SheetData[] = sheetNames.map((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        let rawData: any[];

        if (sheetName === 'Danh sách cửa hàng') {
          rawData = XLSX.utils.sheet_to_json(worksheet, {
            defval: null,
            raw: false,
            range: 1, // Use row 2 (index 1) as header, skip row 1
          });
        } else {
          rawData = XLSX.utils.sheet_to_json(worksheet, {
            defval: null,
            raw: false,
          });
        }

        // Trim all header keys
        const data = rawData.map((row) => {
          const trimmedRow: any = {};
          Object.keys(row).forEach((key) => {
            trimmedRow[key.trim()] = row[key];
          });
          return trimmedRow;
        });

        return {
          sheetName,
          data,
        };
      });

      allSheetsData.forEach((sheet) => {
        if (sheet.sheetName === 'Danh sách cửa hàng') {
          // this.readStoreSheet(sheet);
        }
        // if (sheet.sheetName === 'Danh sách sản phẩm') {
        //   this.readProductSheet(sheet);
        // }
        // if (sheet.sheetName === 'Danh mục SOS') {
        //   this.readSOSRuleSheet(sheet);
        // }
        // if (sheet.sheetName === 'Target SOS') {
        //   this.readSOSTargetSheet(sheet);
        // }
        // if (sheet.sheetName === 'OOL') {
        //   this.readOOLRuleSheet(sheet);
        // }
      });

      // read sheet store supervisors
      // const supervisorSheet = allSheetsData.find(
      //   (sheet) => sheet.sheetName === 'store_supervisors',
      // );
      console.log(
        `Successfully read file: ${allSheetsData.length} sheets found.`,
      );
      return allSheetsData;
    } catch (error) {
      throw new Error(`Error reading Excel file: ${error.message}`);
    }
  }

  async readStoreSheet(sheetData: any) {
    const data = sheetData.data;
    const supervisors = new Array<EmployeeData>();

    let resultCustomer: Customer | null = null;
    let resultSup: User | null = null;
    let resultSaleRep: User | null = null;

    const stores = new Array<Prisma.StoreCreateInput>();

    for (const storeData of data) {
      const supEmail = storeData['SUP_MAIL']?.toLowerCase()?.trim();
      const supName = storeData['SUPERVISOR']?.trim();

      // supervisor
      if (supName && supEmail && supEmail != '-') {
        resultSup = await this.readAndAddSupervisor({
          email: supEmail,
          name: supName,
        });
      }

      const saleRepName = storeData['SR']?.trim();
      const saleRepEmail = storeData['SR_MAIL']?.toLowerCase()?.trim();
      const saleRepPhone = storeData['SR_PHONE']?.toLowerCase()?.trim();

      // sale rep
      if (saleRepName && saleRepEmail && saleRepEmail != '-') {
        resultSaleRep = await this.readAndAddSupervisor({
          email: saleRepEmail,
          name: saleRepName,
          phone: saleRepPhone,
        });
      }

      // customer
      const ka = storeData['KA']?.trim();
      const channel = storeData['CHANNEL']?.trim();
      const customerCode = storeData['CUSTOMER_ID']?.trim();
      const customerName = storeData['CUSTOMER']?.trim();
      if (customerCode && customerName && ka && channel) {
        resultCustomer = await this.customersService.createCustomerIfNotExists({
          name: customerName,
          ka: ka,
          code: customerCode,
          channel: channel,
        });
      }

      // store
      const storeCode = storeData['ESSSTORECODE']?.trim();
      const storeName = storeData['STORE_NAME']?.trim();
      const storeId = storeData['STORE_ID']?.trim();
      if (storeCode && storeName && storeId && resultCustomer) {
        const storeCreateInput: Prisma.StoreCreateInput = {
          id: storeId,
          essStoreCode: storeCode,
          name: storeName,
          customers: {
            connect: { id: resultCustomer.id },
          },
          supervisor: {
            connect: { id: resultSup ? resultSup.id : '' },
          },
          saleRep: {
            connect: { id: resultSaleRep ? resultSaleRep.id : '' },
          },
          typeCode: storeData['STORETYPECODE']?.trim() || '',
          type: storeData['TYPE_STORE']?.trim() || '',
          formatType: storeData['FORMAT_TYPE']?.trim() || '',
          status: true,
          frequency: parseInt(storeData['Tần suất']) || 0,
          auditTime: parseInt(storeData['Thời gian chấm']) || 0,
          region: storeData['REGION NAME']?.trim() || '',
          province: storeData['PROVINCENAME']?.trim() || '',
          district: storeData['DISTRICTNAME']?.trim() || '',
          ward: storeData['WARDNAME']?.trim() || '',
          address: storeData['STORE_ADDRESS']?.trim() || '',
          latitude: storeData['LATITUDE']?.trim() || '',
          longitude: storeData['LONGITUDE']?.trim() || '',
        };
        // await this.storesService.createStore(storeCreateInput);
        stores.push(storeCreateInput);
      }
    }
    this.readAndAddStores(stores);
    console.log(`Found ${supervisors.length} unique supervisors`);
  }

  readAndAddStores(stores: Prisma.StoreCreateInput[]) {
    stores.forEach((storeData: any) => {
      this.storesService.createStoreIfNotExists(storeData);
    });
  }

  readAndAddSupervisor(userData: EmployeeData): Promise<User> {
    const currentTime = new Date();
    const createUser: Prisma.UserCreateInput = {
      userName: userData.email,
      phoneNumber: userData.phone || '',
      email: userData.email,
      name: userData.name,
      password: '123456', // You might want to generate a secure password
      role: {
        connectOrCreate: {
          where: {
            name: Role.SUPERVISOR,
          },
          create: {
            name: Role.SUPERVISOR,
            createdAt: currentTime,
            updatedAt: currentTime,
          },
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.usersService.createUserIfNotExists(createUser);
  }

  async readAndAddSaleReps(userData: EmployeeData): Promise<User> {
    const currentTime = new Date();
    const createUser: Prisma.UserCreateInput = {
      userName: userData.email,
      phoneNumber: userData.phone || '',
      email: userData.email,
      name: userData.name,
      password: '123456', // You might want to generate a secure password
      role: {
        connectOrCreate: {
          where: {
            name: Role.SALE_REP,
          },
          create: {
            name: Role.SALE_REP,
            createdAt: currentTime,
            updatedAt: currentTime,
          },
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return await this.usersService.createUserIfNotExists(createUser);
  }

  async readProductSheet(sheetData: any) {
    const data = sheetData.data;
    console.log(`Total products to process: ${data.length}`);
    for (const productData of data) {
      const category = productData['CATEGORY']?.trim();
      const categoryId = productData['CATEGORY_ID']?.trim();
      const categoryCode = productData['CATEGORY_CODE']?.trim();
      const categoryVn = productData['CATEGORY_VN']?.trim();
      const subCatId = productData['SUB_CAT_ID']?.trim();
      const subCatVn = productData['SUB_CAT_VN']?.trim();
      const brand = productData['BRAND']?.trim();
      const brandCode = productData['BRAND_CODE']?.trim();
      const brandId = productData['BRAND_ID']?.trim();
      const itemCode = productData['ITEM_CODE']?.trim();

      let resultSubCategory: SubCategory | null = null;

      // sub category
      if (subCatId && subCatVn) {
        resultSubCategory =
          await this.subCategoriesService.createSubCategoryIfNotExists({
            name: subCatVn,
            code: subCatId,
          });
      }

      let resultCat: Category | null = null;
      if (category && categoryId) {
        resultCat = await this.categoriesService.createCategoryIfNotExists({
          id: categoryId,
          name: category,
          code: categoryCode,
          nameVN: categoryVn,
        });
      }

      let resultBrand: Brand | null = null;
      // brand
      if (brandId && brand && brandCode) {
        resultBrand = await this.brandsService.createBrandIfNotExists({
          id: brandId,
          name: brand,
          code: brandCode,
        });
      }

      // product
      if (itemCode && resultBrand) {
        await this.productsService.createProductIfNotExists({
          productCode: itemCode,
          name: productData['PRODUCT_NAME']?.trim() || '',
          nameVN: productData['PRODUCT_NAME_VN']?.trim() || '',
          packageSize: productData['PACKSIZE']?.trim() || '',
          barcode: productData['BARCODE']?.trim() || '',
          length: parseInt(productData['LENGTH']) || 0,
          unit: productData['UNIT']?.trim() || '',
          category: resultCat
            ? {
                connect: { id: resultCat.id },
              }
            : undefined,
          subCategory: resultSubCategory
            ? {
                connect: { id: resultSubCategory.id },
              }
            : undefined,
          brand: {
            connect: { id: resultBrand.id },
          },
          status: true,
        });
      } else {
        console.log('Missing item code for product:', productData);
      }
    }
  }

  async readSOSRuleSheet(sheetData: any) {
    const data = sheetData.data;
    console.log(`Total SOS rules to process: ${data.length}`);
    for (const sosData of data) {
      const categoryId = sosData['CATEGORY_ID']?.trim();
      const subcategoryCode = sosData['SUB_CAT_ID']?.trim();
      const brandCode = sosData['BRAND_CODE']?.trim();
      const ruleBig = sosData['QUY TẮC ĐO Big format']?.trim();
      const ruleSmall = sosData['QUY TẮC ĐO Small format']?.trim();

      const subCategory =
        await this.subCategoriesService.findByCode(subcategoryCode);
      const brand = await this.brandsService.findByCode(brandCode);
      if (subCategory && categoryId && brand) {
        await this.sosRulesService.createSOSRuleIfNotExists(
          {
            brand: {
              connect: {
                id: brand.id,
              },
            },
            category: {
              connect: {
                id: categoryId,
              },
            },
            subCategory: {
              connect: {
                id: subCategory.id,
              },
            },
            ruleBig: ruleBig,
            ruleSmall: ruleSmall,
          },
          brand.id,
          categoryId,
          subCategory.id,
        );
      }

      // process sosData here
      console.log('Processing SOS rule:', sosData);
      // You can implement the logic to create or update SOS rules in the database
    }
  }

  async readSOSTargetSheet(sheetData: any) {
    const data = sheetData.data;
    console.log(`Total SOS targets to process: ${data.length}`);

    const targetKey = Object.keys(data[0]).filter((key) =>
      key.toLowerCase().includes('target'),
    )[0];
    for (const sosData of data) {
      const storeId = sosData['STORE_ID']?.trim();
      const categoryCode = sosData['CATEGORY_CODE']?.trim();
      const target = sosData[targetKey]?.trim();
      const decimalValue = parseFloat(target.replace('%', '')) / 100;
      const category = await this.categoriesService.findByCode(categoryCode);

      const storeExist = await this.storesService.checkStoreExists(storeId);
      if (storeId && category && storeExist) {
        await this.targetSOSService.createOrUpdateTargetSOSIfNotExists(
          {
            store: {
              connect: {
                id: storeId,
              },
            },
            category: {
              connect: {
                id: category.id,
              },
            },
            target: decimalValue,
          },
          storeId,
          category.id,
        );
      } else {
        console.log(
          `Skipping Target SOS for Store ID: ${storeId}, Category Code: ${categoryCode} - Store exists: ${storeExist}, Category exists: ${
            category ? 'yes' : 'no'
          }`,
        );
      }
    }
    console.log('Finished processing SOS targets.');
  }

  async readOOLRuleSheet(sheetData: any) {
    const data = sheetData.data;
    console.log(`Total OOL rules to process: ${data.length}`);

    for (const oolData of data) {
      const offLocationCode = oolData['OFF_LOCATION_ID']?.trim();
      const offLocationName = oolData['OFF_LOCATION']?.trim();
      const offLocationVN = oolData['OFF_LOCATION_VN']?.trim();
      const isBig = oolData['Big Formart']?.trim();
      const isSmall = oolData['Small Format']?.trim();
      const isSmallFormat = isSmall?.toLowerCase() === 'x';
      const isBigFormat = isBig?.toLowerCase() === 'x';

      if (offLocationCode && offLocationName && offLocationVN) {
        await this.oolRulesService.createOOLRuleIfNotExists({
          offCode: offLocationCode,
          offName: offLocationName,
          offNameVN: offLocationVN,
          ruleBig: isBigFormat,
          ruleSmall: isSmallFormat,
        });
      }
    }
    console.log('Finished processing OOL rules.');
  }
  // /**
  //  * Read all Excel files from assets folder
  //  * @returns Object containing all files with their sheets data
  //  */
  // async readAllMasterDataFiles(): Promise<Record<string, SheetData[]>> {
  //   try {
  //     const assetsPath = path.join(process.cwd(), 'src', 'assets');

  //     // Get all Excel files in assets folder
  //     const files = fs
  //       .readdirSync(assetsPath)
  //       .filter(
  //         (file) =>
  //           file.endsWith('.xlsx') ||
  //           file.endsWith('.xls') ||
  //           file.endsWith('.xlsm'),
  //       );

  //     const allFilesData: Record<string, SheetData[]> = {};

  //     for (const file of files) {
  //       const sheetsData = await this.readMasterDataFile(file);
  //       allFilesData[file] = sheetsData;
  //     }

  //     return allFilesData;
  //   } catch (error) {
  //     throw new Error(`Error reading master data files: ${error.message}`);
  //   }
  // }

  create(createImportDatumDto: CreateImportDatumDto) {
    return 'This action adds a new importDatum';
  }

  findAll() {
    return `This action returns all importData`;
  }

  findOne(id: number) {
    return `This action returns a #${id} importDatum`;
  }

  update(id: number, updateImportDatumDto: UpdateImportDatumDto) {
    return `This action updates a #${id} importDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} importDatum`;
  }
}
