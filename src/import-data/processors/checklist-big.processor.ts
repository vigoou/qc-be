import { Injectable } from '@nestjs/common';
import { BaseProcessor } from './base.processor';
import { PrismaService } from '../../common/prisma.service';

interface OSAChecklistItem {
  yearMonth: number;
  storeCode: string;
  productCode: string;
  oldProductId: string;
  newProductId: string;
  stock: number;
}

interface NPDChecklistItem {
  yearMonth: number;
  storeId: string;
  productId: string;
}

@Injectable()
export class ChecklistBigProcessor extends BaseProcessor {
  private totalOSA = 0;
  private totalNPD = 0;

  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected async processSheet(worksheet: any) {
    if (worksheet.name === '1. OSA') {
      await this.readOSA(worksheet);
    } else if (worksheet.name === '2. NPD') {
      await this.readNPD(worksheet);
    }
  }

  private async readOSA(worksheet: any) {
    const STORE_START_COLUMN = 'X';
    const HEADER_ROW = 11;
    let chunk: OSAChecklistItem[] = [];
    let storeCodes: Map<string, number> | null = null;
    let rowIndex = 0;

    const indexOfProductId = this.getColumnIndex('F');
    const indexOfProductIdNew = this.getColumnIndex('E');
    const indexOfProductIdOld = this.getColumnIndex('D');

    for await (const row of worksheet) {
      const rowValue = row.values;
      rowIndex++;

      // Extract store codes from header row
      if (rowIndex === HEADER_ROW) {
        storeCodes = this.extractStoreCodes(row, STORE_START_COLUMN);
        console.log(
          `[OSA] Found ${storeCodes.size} stores:`,
          Array.from(storeCodes.keys()),
        );
        continue;
      }

      // Skip rows before header
      if (rowIndex < HEADER_ROW || !storeCodes) {
        continue;
      }

      // Process data rows
      const itemCode = rowValue[indexOfProductId] || '';
      const itemCodeOld = rowValue[indexOfProductIdOld] || '';
      const itemCodeNew = rowValue[indexOfProductIdNew] || '';

      if (!itemCode) continue;

      storeCodes.forEach((colIndex, storeCode) => {
        const stock = parseInt(rowValue[colIndex]);

        if (stock && stock > 0) {
          chunk.push({
            yearMonth: 202601,
            storeCode: storeCode,
            productCode: itemCode.toString().trim(),
            oldProductId: itemCodeOld.toString().trim(),
            newProductId: itemCodeNew.toString().trim(),
            stock: stock,
          });
        }
      });

      // Save chunk when reaches limit
      if (chunk.length >= this.CHUNK_SIZE) {
        await this.saveOSAChunk(chunk);
        chunk = [];
      }
    }

    // Save remaining data
    if (chunk.length > 0) {
      await this.saveOSAChunk(chunk);
    }
  }

  private async readNPD(worksheet: any) {
    const STORE_START_COLUMN = 'V';
    const HEADER_ROW = 7;
    let chunk: NPDChecklistItem[] = [];
    let storeCodes: Map<string, number> | null = null;
    let rowIndex = 0;

    const indexOfProductId = this.getColumnIndex('D');

    for await (const row of worksheet) {
      const rowValue = row.values;
      rowIndex++;

      // Extract store codes from header row
      if (rowIndex === HEADER_ROW) {
        storeCodes = this.extractStoreCodes(row, STORE_START_COLUMN);
        continue;
      }

      // Skip rows before header
      if (rowIndex < HEADER_ROW || !storeCodes) {
        continue;
      }

      // Process data rows
      const itemCode = rowValue[indexOfProductId] || '';

      if (!itemCode) continue;

      storeCodes.forEach((colIndex, storeCode) => {
        const stock = (rowValue[colIndex] || '') === 'Y';
        if (stock) {
          chunk.push({
            yearMonth: 202601,
            storeId: storeCode,
            productId: itemCode.toString().trim(),
          });
        }
      });

      // Save chunk when reaches limit
      if (chunk.length >= this.CHUNK_SIZE) {
        await this.saveNPDChunk(chunk);
        chunk = [];
      }
    }

    // Save remaining data
    if (chunk.length > 0) {
      await this.saveNPDChunk(chunk);
    }
  }

  private async saveOSAChunk(chunk: OSAChecklistItem[]) {
    await this.prisma.oSAChecklist.createMany({
      data: chunk,
      skipDuplicates: true,
    });
    this.totalOSA += chunk.length;
    console.log(`[OSA] Saved ${this.totalOSA} records`);
  }

  private async saveNPDChunk(chunk: NPDChecklistItem[]) {
    await this.prisma.nPDChecklist.createMany({
      data: chunk,
      skipDuplicates: true,
    });
    this.totalNPD += chunk.length;
    console.log(`[NPD] Saved ${this.totalNPD} records`);
  }

  private extractStoreCodes(
    headerRow: any,
    startColumn: string,
  ): Map<string, number> {
    const cells = headerRow.values;
    const startIndex = this.getColumnIndex(startColumn);
    const hashIndexes = new Map<string, number>();

    for (let i = startIndex; i < cells.length; i++) {
      const storeCode = cells[i];
      if (storeCode && storeCode.toString().trim()) {
        hashIndexes.set(storeCode.toString().trim(), i);
      }
    }

    return hashIndexes;
  }

  private getColumnIndex(column: string): number {
    let index = 0;
    for (let i = 0; i < column.length; i++) {
      index = index * 26 + column.charCodeAt(i) - 'A'.charCodeAt(0) + 1;
    }
    return index;
  }
}
