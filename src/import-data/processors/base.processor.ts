// src/import/processors/base.processor.ts
import * as ExcelJS from 'exceljs';
import { PrismaService } from 'src/common/prisma.service';

export abstract class BaseProcessor {
  constructor(protected readonly prisma: PrismaService) {}
  protected CHUNK_SIZE = 1000;

  async execute(filePath: string) {
    console.log(`Processing file: ${filePath}`);
    const workbook = new ExcelJS.stream.xlsx.WorkbookReader(filePath, {});
    for await (const worksheetReader of workbook) {
      await this.processSheet(worksheetReader);
    }
  }

  protected abstract processSheet(worksheet: any): Promise<void>;
}
