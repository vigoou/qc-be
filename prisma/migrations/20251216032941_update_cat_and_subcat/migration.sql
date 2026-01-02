/*
  Warnings:

  - You are about to drop the column `nameVN` on the `category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."category" DROP COLUMN "nameVN",
ADD COLUMN     "name_vn" TEXT;

-- AlterTable
ALTER TABLE "public"."product" ALTER COLUMN "name_vn" DROP NOT NULL,
ALTER COLUMN "package_size" DROP NOT NULL,
ALTER COLUMN "barcode" DROP NOT NULL,
ALTER COLUMN "unit" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."sub_category" ALTER COLUMN "name_vn" DROP NOT NULL;
