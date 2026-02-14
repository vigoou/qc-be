import { Injectable } from '@nestjs/common';
import { BaseProcessor } from './base.processor';
import { PrismaService } from '../../common/prisma.service';

interface OSAItem {
  yearMonth: number;
  auditDate: number;
  storeCode: string;
  productCode: string;
  stock: number;
  currentStock: number;
  priceList: boolean;
  location: string;
  note?: string;
  comment?: string;
  projectTeamRevised?: string;
  projectTeamResponse?: string;
  finalReject: boolean;
  saleRepFeedBack?: string;
  allowEditPrice: boolean;
  priceAfterEdit?: number;
  createdAt: Date;
}

interface NPDItem {
  yearMonth: number;
  auditDate: number;
  storeCode: string;
  productCode: string;
  stock: number;
  currentStock: number;
  priceList: boolean;
  location: string;
  note?: string;
  comment?: string;
  projectTeamRevised?: string;
  projectTeamResponse?: string;
  finalReject: boolean;
  saleRepFeedBack?: string;
  allowEditPrice: boolean;
  priceAfterEdit?: number;
  createdAt: Date;
}

interface SOSItem {
  yearMonth: number;
  auditDate: number;
  storeCode: string;
  categoryCode: string;
  subCategoryCode: string;
  brandCode: string;
  totalLength: number;
  sosLength: number;
  msUnileverLength: number;
  privateLabelLength: number;
  importedLabelLength: number;
  note?: string;
  comment?: string;
  qcIsReject: boolean;
  qcReasonReject?: string;
  projectTeamRevised?: string;
  projectTeamResponse?: string;
  finalReject: boolean;
  createdAt: Date;
}

interface MissingReference {
  storeCode: string;
  productCode: string;
  rowIndex: number;
  yearMonth: number;
}

@Injectable()
export class BigProcessor extends BaseProcessor {
  private totalOSA = 0;
  private totalNPD = 0;
  private totalSOS = 0;
  private totalSkipped = 0;
  private missingReferences: MissingReference[] = [];

  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected async processSheet(worksheet: any) {
    const sheetName = worksheet.name.toLowerCase();

    console.log(`Processing sheet: ${worksheet.name}`);

    // // Xử lý worksheet OSA
    // if (sheetName.includes('osa_raw')) {
    //   await this.readOSA(worksheet);
    // }

    // // Xử lý worksheet NPD
    // if (sheetName.includes('npd')) {
    //   await this.readNPD(worksheet);
    // }

    // Xử lý worksheet SOS
    if (sheetName.includes('sos')) {
      await this.readSOS(worksheet);
    }
  }

  private async readOSA(worksheet: any) {
    const HEADER_ROW = 1;
    let chunk: OSAItem[] = [];
    let rowIndex = 0;

    const uniqueStores = new Set<string>();
    const uniqueProducts = new Set<string>();

    // Column indexes for OSA
    // Report of Month | Loại | Date | Time | Store ID - Unilever | Store name | Customer ID | Customer | Supervisor | PS Category ID | PS Category | Product ID | Product Name | Vị trí | Target | Stock | Void (0/1/Blank) | OSA (1/0) | Lý do rớt | Comment | Reject (0/1) | Lí do reject | Team dự án revise | Team dự án phản hồi | Final reject | Region

    const indexOfYearMonth = this.getColumnIndex('A'); // Report of Month
    const indexOfDate = this.getColumnIndex('C'); // Date
    const indexOfTime = this.getColumnIndex('D'); // Time
    const indexOfStoreId = this.getColumnIndex('E'); // Store ID - Unilever
    const indexOfProductId = this.getColumnIndex('L'); // Product ID
    const indexOfLocation = this.getColumnIndex('N'); // Vị trí
    const indexOfTarget = this.getColumnIndex('O'); // Target
    const indexOfStock = this.getColumnIndex('P'); // Stock
    const indexOfVoid = this.getColumnIndex('Q'); // Void (0/1/Blank)
    const indexOfReason = this.getColumnIndex('S'); // Lý do rớt
    const indexOfComment = this.getColumnIndex('T'); // Comment
    const indexOfTeamRevise = this.getColumnIndex('W'); // Team dự án revise
    const indexOfTeamResponse = this.getColumnIndex('X'); // Team dự án phản hồi
    const indexOfFinalReject = this.getColumnIndex('Y'); // Final reject

    for await (const row of worksheet) {
      const rowValue = row.values;
      rowIndex++;

      // Skip header rows
      if (rowIndex <= HEADER_ROW) {
        if (rowIndex === HEADER_ROW) {
          console.log(`[OSA] Parsing header...`);
          console.log(`[OSA] Sample columns:`, {
            A_YearMonth: rowValue[indexOfYearMonth],
            E_StoreId: rowValue[indexOfStoreId],
            L_ProductId: rowValue[indexOfProductId],
            N_Location: rowValue[indexOfLocation],
            Q_Void: rowValue[indexOfVoid],
            T_Comment: rowValue[indexOfComment],
          });
        }
        continue;
      }

      // Extract required fields
      const storeId = rowValue[indexOfStoreId]?.toString().trim() || '';
      const productId = rowValue[indexOfProductId]?.toString().trim() || '';

      // Skip if missing required fields
      if (!storeId || !productId) {
        continue;
      }

      // Collect unique stores & products
      uniqueStores.add(storeId);
      uniqueProducts.add(productId);

      // Parse yearMonth
      const yearMonth = this.parseYearMonth(rowValue[indexOfYearMonth]);

      // Parse date/time
      const dateStr = rowValue[indexOfDate]?.toString() || '';
      const timeStr = rowValue[indexOfTime]?.toString() || '';
      const createdAt = this.parseDateTime(dateStr, timeStr);

      const auditDate = parseInt(
        createdAt.getFullYear().toString() +
          String(createdAt.getMonth() + 1).padStart(2, '0') +
          String(createdAt.getDate()).padStart(2, '0'),
      );

      // Parse stock
      const stock = parseInt(rowValue[indexOfStock]) || 0;
      const target = parseInt(rowValue[indexOfTarget]) || 0;

      // Parse priceList from VOID column
      const voidValue = rowValue[indexOfVoid]?.toString().trim();
      const priceList = voidValue !== '1';

      // Parse boolean fields
      const finalReject = this.parseBoolean(rowValue[indexOfFinalReject]);

      // Build OSA item
      const osaItem: OSAItem = {
        yearMonth: yearMonth,
        storeCode: storeId,
        productCode: productId,
        auditDate: auditDate,
        stock: target,
        currentStock: stock,
        priceList: priceList,
        location: rowValue[indexOfLocation]?.toString() || '',
        note: rowValue[indexOfReason]?.toString() || null,
        comment: rowValue[indexOfComment]?.toString() || null,
        projectTeamRevised: rowValue[indexOfTeamRevise]?.toString() || null,
        projectTeamResponse: rowValue[indexOfTeamResponse]?.toString() || null,
        finalReject: finalReject,
        allowEditPrice: false,
        priceAfterEdit: undefined,
        createdAt: createdAt,
      };

      chunk.push(osaItem);

      // Save chunk when reaches limit
      if (chunk.length >= this.CHUNK_SIZE) {
        await this.saveOSAChunk(chunk, rowIndex);
        chunk = [];
      }
    }

    // Save remaining data
    if (chunk.length > 0) {
      await this.saveOSAChunk(chunk, rowIndex);
    }

    console.log(`\n[OSA] ============ SUMMARY ============`);
    console.log(`[OSA] Total records imported: ${this.totalOSA}`);
    console.log(`[OSA] Total records skipped: ${this.totalSkipped}`);
    console.log(`[OSA] Unique stores: ${uniqueStores.size}`);
    console.log(`[OSA] Unique products: ${uniqueProducts.size}`);

    if (this.missingReferences.length > 0) {
      console.warn(
        `\n[OSA] ⚠️  Found ${this.missingReferences.length} rows with missing references`,
      );
      console.warn(`[OSA] Sample missing references (first 10):`);
      this.missingReferences.slice(0, 10).forEach((ref) => {
        console.warn(
          `  Row ${ref.rowIndex}: Store="${ref.storeCode}", Product="${ref.productCode}", YearMonth=${ref.yearMonth}`,
        );
      });
    }

    console.log(`[OSA] ===================================\n`);

    return {
      totalImported: this.totalOSA,
      totalSkipped: this.totalSkipped,
      missingReferences: this.missingReferences,
    };
  }

  private async saveOSAChunk(chunk: OSAItem[], currentRowIndex: number) {
    try {
      // Get all unique store and product codes from chunk
      const storeCodes = [...new Set(chunk.map((item) => item.storeCode))];
      const productCodes = [...new Set(chunk.map((item) => item.productCode))];

      // Check which stores exist
      const existingStores = await this.prisma.store.findMany({
        where: { essStoreCode: { in: storeCodes } },
        select: { essStoreCode: true },
      });
      const existingStoreCodes = new Set(
        existingStores.map((s) => s.essStoreCode),
      );

      // Check which products exist
      const existingProducts = await this.prisma.product.findMany({
        where: { productCode: { in: productCodes } },
        select: { productCode: true },
      });
      const existingProductCodes = new Set(
        existingProducts.map((p) => p.productCode),
      );

      // Filter valid items
      const validItems: OSAItem[] = [];
      const invalidItems: OSAItem[] = [];

      chunk.forEach((item, index) => {
        const storeExists = existingStoreCodes.has(item.storeCode);
        const productExists = existingProductCodes.has(item.productCode);

        if (storeExists && productExists) {
          validItems.push(item);
        } else {
          invalidItems.push(item);

          this.missingReferences.push({
            storeCode: item.storeCode,
            productCode: item.productCode,
            rowIndex: currentRowIndex - chunk.length + index + 1,
            yearMonth: item.yearMonth,
          });
        }
      });

      // Delete existing records before inserting
      if (validItems.length > 0) {
        const keys = validItems.map((item) => ({
          yearMonth: item.yearMonth,
          storeCode: item.storeCode,
          productCode: item.productCode,
          auditDate: item.auditDate,
        }));

        await this.prisma.oSA.deleteMany({
          where: {
            OR: keys,
          },
        });

        // Insert new data
        await this.prisma.oSA.createMany({
          data: validItems.map((item) => ({
            ...item,
            comment: item.comment || '',
          })),
          skipDuplicates: true,
        });

        this.totalOSA += validItems.length;
      }

      this.totalSkipped += invalidItems.length;

      if (invalidItems.length > 0) {
        console.warn(
          `[OSA] ⚠️  Skipped ${invalidItems.length} items (missing references)`,
        );
      }

      console.log(
        `[OSA] Saved ${this.totalOSA} records (Skipped: ${this.totalSkipped})`,
      );
    } catch (error) {
      console.error('[OSA] Error saving chunk:', error);

      if (error.code === 'P2003') {
        console.error('[OSA] ❌ Foreign key violation!');
        console.error('[OSA] First item in chunk:', chunk[0]);
      }

      throw error;
    }
  }

  private async readNPD(worksheet: any) {
    const HEADER_ROW = 1;
    let chunk: NPDItem[] = [];
    let rowIndex = 0;

    const uniqueStores = new Set<string>();
    const uniqueProducts = new Set<string>();

    // Column indexes for NPD
    // Report of Month | Loại | Date | Time | Store ID - Unilever | Store name | Customer ID | Customer | Supervisor | PS Category ID | PS Category | Product ID | Product Name | Vị trí | Target | Stock | Void (0/1/Blank) | NPD (0/1) | Predefined Note | Comment | Reject (0/1) | Lí do reject | Team dự án revise | Team dự án phản hồi | Final reject | Region

    const indexOfYearMonth = this.getColumnIndex('A'); // Report of Month
    const indexOfDate = this.getColumnIndex('C'); // Date
    const indexOfTime = this.getColumnIndex('D'); // Time
    const indexOfStoreId = this.getColumnIndex('E'); // Store ID - Unilever
    const indexOfProductId = this.getColumnIndex('L'); // Product ID
    const indexOfLocation = this.getColumnIndex('N'); // Vị trí
    const indexOfTarget = this.getColumnIndex('O'); // Target
    const indexOfStock = this.getColumnIndex('P'); // Stock
    const indexOfVoid = this.getColumnIndex('Q'); // Void (0/1/Blank)
    const indexOfNote = this.getColumnIndex('S'); // Predefined Note
    const indexOfComment = this.getColumnIndex('T'); // Comment
    const indexOfTeamRevise = this.getColumnIndex('W'); // Team dự án revise
    const indexOfTeamResponse = this.getColumnIndex('X'); // Team dự án phản hồi
    const indexOfFinalReject = this.getColumnIndex('Y'); // Final reject

    for await (const row of worksheet) {
      const rowValue = row.values;
      rowIndex++;

      // Skip header rows
      if (rowIndex <= HEADER_ROW) {
        if (rowIndex === HEADER_ROW) {
          console.log(`[NPD] Parsing header...`);
          console.log(`[NPD] Sample columns:`, {
            A_YearMonth: rowValue[indexOfYearMonth],
            E_StoreId: rowValue[indexOfStoreId],
            L_ProductId: rowValue[indexOfProductId],
            N_Location: rowValue[indexOfLocation],
            Q_Void: rowValue[indexOfVoid],
            T_Comment: rowValue[indexOfComment],
          });
        }
        continue;
      }

      // Extract required fields
      const storeId = rowValue[indexOfStoreId]?.toString().trim() || '';
      const productId = rowValue[indexOfProductId]?.toString().trim() || '';

      // Skip if missing required fields
      if (!storeId || !productId) {
        continue;
      }

      // Collect unique stores & products
      uniqueStores.add(storeId);
      uniqueProducts.add(productId);

      // Parse yearMonth
      const yearMonth = this.parseYearMonth(rowValue[indexOfYearMonth]);

      // Parse date/time
      const dateStr = rowValue[indexOfDate]?.toString() || '';
      const timeStr = rowValue[indexOfTime]?.toString() || '';
      const createdAt = this.parseDateTime(dateStr, timeStr);

      const auditDate = parseInt(
        createdAt.getFullYear().toString() +
          String(createdAt.getMonth() + 1).padStart(2, '0') +
          String(createdAt.getDate()).padStart(2, '0'),
      );

      // Parse stock
      const stock = parseInt(rowValue[indexOfStock]) || 0;
      const target = parseInt(rowValue[indexOfTarget]) || 0;

      // Parse priceList from VOID column
      const voidValue = rowValue[indexOfVoid]?.toString().trim();
      const priceList = voidValue !== '1';

      // Parse boolean fields
      const finalReject = this.parseBoolean(rowValue[indexOfFinalReject]);

      // Build NPD item
      const npdItem: NPDItem = {
        yearMonth: yearMonth,
        storeCode: storeId,
        productCode: productId,
        auditDate: auditDate,
        stock: target,
        currentStock: stock,
        priceList: priceList,
        location: rowValue[indexOfLocation]?.toString() || '',
        note: rowValue[indexOfNote]?.toString() || null,
        comment: rowValue[indexOfComment]?.toString() || null,
        projectTeamRevised: rowValue[indexOfTeamRevise]?.toString() || null,
        projectTeamResponse: rowValue[indexOfTeamResponse]?.toString() || null,
        finalReject: finalReject,
        allowEditPrice: false,
        priceAfterEdit: undefined,
        createdAt: createdAt,
      };

      chunk.push(npdItem);

      // Save chunk when reaches limit
      if (chunk.length >= this.CHUNK_SIZE) {
        await this.saveNPDChunk(chunk, rowIndex);
        chunk = [];
      }
    }

    // Save remaining data
    if (chunk.length > 0) {
      await this.saveNPDChunk(chunk, rowIndex);
    }

    console.log(`\n[NPD] ============ SUMMARY ============`);
    console.log(`[NPD] Total records imported: ${this.totalNPD}`);
    console.log(`[NPD] Total records skipped: ${this.totalSkipped}`);
    console.log(`[NPD] Unique stores: ${uniqueStores.size}`);
    console.log(`[NPD] Unique products: ${uniqueProducts.size}`);

    if (this.missingReferences.length > 0) {
      console.warn(
        `\n[NPD] ⚠️  Found ${this.missingReferences.length} rows with missing references`,
      );
      console.warn(`[NPD] Sample missing references (first 10):`);
      this.missingReferences.slice(0, 10).forEach((ref) => {
        console.warn(
          `  Row ${ref.rowIndex}: Store="${ref.storeCode}", Product="${ref.productCode}", YearMonth=${ref.yearMonth}`,
        );
      });
    }

    console.log(`[NPD] ===================================\n`);

    return {
      totalImported: this.totalNPD,
      totalSkipped: this.totalSkipped,
      missingReferences: this.missingReferences,
    };
  }

  private async saveNPDChunk(chunk: NPDItem[], currentRowIndex: number) {
    try {
      // Get all unique store and product codes from chunk
      const storeCodes = [...new Set(chunk.map((item) => item.storeCode))];
      const productCodes = [...new Set(chunk.map((item) => item.productCode))];

      // Check which stores exist
      const existingStores = await this.prisma.store.findMany({
        where: { essStoreCode: { in: storeCodes } },
        select: { essStoreCode: true },
      });
      const existingStoreCodes = new Set(
        existingStores.map((s) => s.essStoreCode),
      );

      // Check which products exist
      const existingProducts = await this.prisma.product.findMany({
        where: { productCode: { in: productCodes } },
        select: { productCode: true },
      });
      const existingProductCodes = new Set(
        existingProducts.map((p) => p.productCode),
      );

      // Filter valid items
      const validItems: NPDItem[] = [];
      const invalidItems: NPDItem[] = [];

      chunk.forEach((item, index) => {
        const storeExists = existingStoreCodes.has(item.storeCode);
        const productExists = existingProductCodes.has(item.productCode);

        if (storeExists && productExists) {
          validItems.push(item);
        } else {
          invalidItems.push(item);

          this.missingReferences.push({
            storeCode: item.storeCode,
            productCode: item.productCode,
            rowIndex: currentRowIndex - chunk.length + index + 1,
            yearMonth: item.yearMonth,
          });
        }
      });

      // Delete existing records before inserting
      if (validItems.length > 0) {
        const keys = validItems.map((item) => ({
          yearMonth: item.yearMonth,
          storeCode: item.storeCode,
          productCode: item.productCode,
          auditDate: item.auditDate,
        }));

        await this.prisma.nPD.deleteMany({
          where: {
            OR: keys,
          },
        });

        // Insert new data
        await this.prisma.nPD.createMany({
          data: validItems.map((item) => ({
            ...item,
            auditStatus: 'pending',
          })),
          skipDuplicates: true,
        });

        this.totalNPD += validItems.length;
      }

      this.totalSkipped += invalidItems.length;

      if (invalidItems.length > 0) {
        console.warn(
          `[NPD] ⚠️  Skipped ${invalidItems.length} items (missing references)`,
        );
      }

      console.log(
        `[NPD] Saved ${this.totalNPD} records (Skipped: ${this.totalSkipped})`,
      );
    } catch (error) {
      console.error('[NPD] Error saving chunk:', error);

      if (error.code === 'P2003') {
        console.error('[NPD] ❌ Foreign key violation!');
        console.error('[NPD] First item in chunk:', chunk[0]);
      }

      throw error;
    }
  }

  private async readSOS(worksheet: any) {
    const HEADER_ROW = 1;
    let chunk: SOSItem[] = [];
    let rowIndex = 0;

    const uniqueStores = new Set<string>();
    const uniqueCategories = new Set<string>();

    // Column indexes for SOS
    // Report of Month | Loại | Date | Time | Store ID - Unilever | Store name | Customer ID | Customer | Supervisor | PS Category ID | PS Category | Subcat ID | Subcategory | Brand ID | Brand | Total Category length (in meters) | SOS Total Store | MS Chiều dài Unilever (m) | MS Chiều dài nhãn riêng DOB | MS Chiều dài hàng nhập khẩu | Predefined Note | Comment | Reject (1/0) | Lý do reject | Team dự án revise | Team dự án phản hồi | Final reject

    const indexOfYearMonth = this.getColumnIndex('A'); // Report of Month
    const indexOfDate = this.getColumnIndex('C'); // Date
    const indexOfTime = this.getColumnIndex('D'); // Time
    const indexOfStoreId = this.getColumnIndex('E'); // Store ID - Unilever
    const indexOfPSCategoryId = this.getColumnIndex('J'); // PS Category ID
    const indexOfSubcatId = this.getColumnIndex('L'); // Subcat ID
    const indexOfBrandId = this.getColumnIndex('N'); // Brand ID
    const indexOfTotalCategoryLength = this.getColumnIndex('P'); // Total Category length (in meters)
    const indexOfSOSTotalStore = this.getColumnIndex('Q'); // SOS Total Store
    const indexOfMSUnilever = this.getColumnIndex('R'); // MS Chiều dài Unilever (m)
    const indexOfMSNhanRieng = this.getColumnIndex('S'); // MS Chiều dài nhãn riêng DOB
    const indexOfMSNhapKhau = this.getColumnIndex('T'); // MS Chiều dài hàng nhập khẩu
    const indexOfNote = this.getColumnIndex('U'); // Predefined Note
    const indexOfComment = this.getColumnIndex('V'); // Comment
    const indexOfReject = this.getColumnIndex('W'); // Reject (1/0)
    const indexOfReasonReject = this.getColumnIndex('X'); // Lý do reject
    const indexOfTeamRevise = this.getColumnIndex('Y'); // Team dự án revise
    const indexOfTeamResponse = this.getColumnIndex('Z'); // Team dự án phản hồi
    const indexOfFinalReject = this.getColumnIndex('AA'); // Final reject

    for await (const row of worksheet) {
      const rowValue = row.values;
      rowIndex++;

      // Skip header rows
      if (rowIndex <= HEADER_ROW) {
        if (rowIndex === HEADER_ROW) {
          console.log(`[SOS] Parsing header...`);
          console.log(`[SOS] Sample columns:`, {
            A_YearMonth: rowValue[indexOfYearMonth],
            E_StoreId: rowValue[indexOfStoreId],
            J_PSCategoryId: rowValue[indexOfPSCategoryId],
            L_SubcatId: rowValue[indexOfSubcatId],
            N_BrandId: rowValue[indexOfBrandId],
            V_Comment: rowValue[indexOfComment],
          });
        }
        continue;
      }

      // Extract required fields
      const storeId = rowValue[indexOfStoreId]?.toString().trim() || '';
      const psCategoryId =
        rowValue[indexOfPSCategoryId]?.toString().trim() || '';
      const subcatId = rowValue[indexOfSubcatId]?.toString().trim() || '';
      const brandId = rowValue[indexOfBrandId]?.toString().trim() || '';

      // Skip if missing required fields
      if (!storeId || !psCategoryId || !subcatId || !brandId) {
        continue;
      }

      // Collect unique stores & categories
      uniqueStores.add(storeId);
      uniqueCategories.add(psCategoryId);

      // Parse yearMonth
      const yearMonth = this.parseYearMonth(rowValue[indexOfYearMonth]);

      // Parse date/time
      const dateStr = rowValue[indexOfDate]?.toString() || '';
      const timeStr = rowValue[indexOfTime]?.toString() || '';
      const createdAt = this.parseDateTime(dateStr, timeStr);

      const auditDate = parseInt(
        createdAt.getFullYear().toString() +
          String(createdAt.getMonth() + 1).padStart(2, '0') +
          String(createdAt.getDate()).padStart(2, '0'),
      );

      // Parse numeric fields
      const totalCategoryLength =
        parseFloat(rowValue[indexOfTotalCategoryLength]) || 0;
      const sosTotalStore = parseFloat(rowValue[indexOfSOSTotalStore]) || 0;
      const msUnilever = parseFloat(rowValue[indexOfMSUnilever]) || 0;
      const msNhanRieng = parseFloat(rowValue[indexOfMSNhanRieng]) || 0;
      const msNhapKhau = parseFloat(rowValue[indexOfMSNhapKhau]) || 0;

      // Parse boolean fields
      const reject = this.parseBoolean(rowValue[indexOfReject]);
      const finalReject = this.parseBoolean(rowValue[indexOfFinalReject]);

      // Build SOS item
      const sosItem: SOSItem = {
        yearMonth: yearMonth,
        storeCode: storeId,
        categoryCode: psCategoryId,
        subCategoryCode: subcatId,
        brandCode: brandId,
        auditDate: auditDate,
        totalLength: totalCategoryLength,
        sosLength: sosTotalStore,
        msUnileverLength: msUnilever,
        privateLabelLength: msNhanRieng,
        importedLabelLength: msNhapKhau,
        note: rowValue[indexOfNote]?.toString() || null,
        comment: rowValue[indexOfComment]?.toString() || null,
        qcIsReject: reject,
        qcReasonReject: rowValue[indexOfReasonReject]?.toString() || null,
        projectTeamRevised: rowValue[indexOfTeamRevise]?.toString() || null,
        projectTeamResponse: rowValue[indexOfTeamResponse]?.toString() || null,
        finalReject: finalReject,
        createdAt: createdAt,
      };

      chunk.push(sosItem);

      // Save chunk when reaches limit
      if (chunk.length >= this.CHUNK_SIZE) {
        await this.saveSOSChunk(chunk, rowIndex);
        chunk = [];
      }
    }

    // Save remaining data
    if (chunk.length > 0) {
      await this.saveSOSChunk(chunk, rowIndex);
    }

    console.log(`\n[SOS] ============ SUMMARY ============`);
    console.log(`[SOS] Total records imported: ${this.totalSOS}`);
    console.log(`[SOS] Total records skipped: ${this.totalSkipped}`);
    console.log(`[SOS] Unique stores: ${uniqueStores.size}`);
    console.log(`[SOS] Unique categories: ${uniqueCategories.size}`);

    if (this.missingReferences.length > 0) {
      console.warn(
        `\n[SOS] ⚠️  Found ${this.missingReferences.length} rows with missing references`,
      );
      console.warn(`[SOS] Sample missing references (first 10):`);
      this.missingReferences.slice(0, 10).forEach((ref) => {
        console.warn(
          `  Row ${ref.rowIndex}: Store="${ref.storeCode}", YearMonth=${ref.yearMonth}`,
        );
      });
    }

    console.log(`[SOS] ===================================\n`);

    return {
      totalImported: this.totalSOS,
      totalSkipped: this.totalSkipped,
      missingReferences: this.missingReferences,
    };
  }

  private async saveSOSChunk(chunk: SOSItem[], currentRowIndex: number) {
    try {
      // Get all unique store codes from chunk
      const storeCodes = [...new Set(chunk.map((item) => item.storeCode))];

      // Check which stores exist
      const existingStores = await this.prisma.store.findMany({
        where: { essStoreCode: { in: storeCodes } },
        select: { essStoreCode: true },
      });
      const existingStoreCodes = new Set(
        existingStores.map((s) => s.essStoreCode),
      );

      // Filter valid items
      const validItems: SOSItem[] = [];
      const invalidItems: SOSItem[] = [];

      chunk.forEach((item, index) => {
        const storeExists = existingStoreCodes.has(item.storeCode);

        if (storeExists) {
          validItems.push(item);
        } else {
          invalidItems.push(item);

          this.missingReferences.push({
            storeCode: item.storeCode,
            productCode: '', // SOS không có productCode
            rowIndex: currentRowIndex - chunk.length + index + 1,
            yearMonth: item.yearMonth,
          });
        }
      });

      // Delete existing records before inserting
      if (validItems.length > 0) {
        const keys = validItems.map((item) => ({
          yearMonth: item.yearMonth,
          storeCode: item.storeCode,
          categoryCode: item.categoryCode,
          subCategoryCode: item.subCategoryCode,
          brandCode: item.brandCode,
          auditDate: item.auditDate,
        }));

        await this.prisma.sOS.deleteMany({
          where: {
            OR: keys,
          },
        });

        // Insert new data
        await this.prisma.sOS.createMany({
          data: validItems.map((item) => ({
            ...item,
          })),
          skipDuplicates: true,
        });

        this.totalSOS += validItems.length;
      }

      this.totalSkipped += invalidItems.length;

      if (invalidItems.length > 0) {
        console.warn(
          `[SOS] ⚠️  Skipped ${invalidItems.length} items (missing references)`,
        );
      }

      console.log(
        `[SOS] Saved ${this.totalSOS} records (Skipped: ${this.totalSkipped})`,
      );
    } catch (error) {
      console.error('[SOS] Error saving chunk:', error);

      if (error.code === 'P2003') {
        console.error('[SOS] ❌ Foreign key violation!');
        console.error('[SOS] First item in chunk:', chunk[0]);
      }

      throw error;
    }
  }

  private parseYearMonth(value: any): number {
    if (!value) return 202601;

    const str = value.toString();

    // Try format: "Jan 2026" or "January 2026"
    const monthNames: Record<string, string> = {
      jan: '01',
      feb: '02',
      mar: '03',
      apr: '04',
      may: '05',
      jun: '06',
      jul: '07',
      aug: '08',
      sep: '09',
      oct: '10',
      nov: '11',
      dec: '12',
    };

    const match = str.toLowerCase().match(/(\w+)\s+(\d{4})/);
    if (match) {
      const [, month, year] = match;
      const monthNum = monthNames[month.substring(0, 3)];
      if (monthNum) {
        return parseInt(`${year}${monthNum}`);
      }
    }

    // Try format: "202601"
    if (/^\d{6}$/.test(str)) {
      return parseInt(str);
    }

    // Try format: "2026-01"
    if (/^\d{4}-\d{2}$/.test(str)) {
      return parseInt(str.replace('-', ''));
    }

    return 202601; // Default
  }

  private parseDateTime(dateStr: string, timeStr: string): Date {
    try {
      if (!dateStr) return new Date();

      // Parse date: "19/01/2026"
      const dateParts = dateStr.split('/');
      if (dateParts.length !== 3) return new Date();

      const day = parseInt(dateParts[0]);
      const month = parseInt(dateParts[1]) - 1; // Month is 0-indexed
      const year = parseInt(dateParts[2]);

      // Parse time: "20:36:24"
      let hours = 0;
      let minutes = 0;
      let seconds = 0;

      if (timeStr) {
        const timeParts = timeStr.split(':');
        hours = parseInt(timeParts[0]) || 0;
        minutes = parseInt(timeParts[1]) || 0;
        seconds = parseInt(timeParts[2]) || 0;
      }

      const date = new Date(year, month, day, hours, minutes, seconds);

      // Validate date
      if (isNaN(date.getTime())) {
        console.warn(`Invalid date: ${dateStr} ${timeStr}`);
        return new Date();
      }

      return date;
    } catch (error) {
      console.warn(`Error parsing date: ${dateStr} ${timeStr}`, error);
      return new Date();
    }
  }

  private parseBoolean(value: any): boolean {
    if (!value) return false;
    if (typeof value === 'boolean') return value;

    const str = value.toString().toLowerCase().trim();
    if (!str) return false;

    return str === '1' || str === 'true' || str === 'yes' || str === 'y';
  }

  private getColumnIndex(column: string): number {
    let index = 0;
    for (let i = 0; i < column.length; i++) {
      index = index * 26 + column.charCodeAt(i) - 'A'.charCodeAt(0) + 1;
    }
    return index;
  }
}
