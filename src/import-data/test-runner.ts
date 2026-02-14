import { PrismaService } from '../common/prisma.service';
import { BigProcessor } from './processors/big.processor';
import { ChecklistBigProcessor } from './processors/checklist-big.processor';
import * as path from 'path';
import { MasterDataProcessor } from './processors/master-data.processor';
// async function runDiscovery() {
//   const filePath = path.join(
//     __dirname,
//     '../../src/assets/2026-1/checklist_big_012026.xlsx',
//   );
//   const prisma = new PrismaService();

//   console.log('files');
//   const processor = new ChecklistBigProcessor(prisma);
//   await processor.execute(filePath);
// }

// runDiscovery();

async function runDiscoveryBig() {
  const filePath = path.join(
    __dirname,
    '../../src/assets/2026-1/full_detail_3_day_bf.xlsx',
  );
  const prisma = new PrismaService();

  console.log('files');
  const processor = new BigProcessor(prisma);
  await processor.execute(filePath);
}

runDiscoveryBig();

// async function runDiscoveryMaster() {
//   const filePath = path.join(__dirname, '../../src/assets/master-data.xlsx');
//   const prisma = new PrismaService();

//   console.log('files');
//   const processor = new MasterDataProcessor(prisma);
//   await processor.execute(filePath);
// }

// runDiscoveryMaster();
