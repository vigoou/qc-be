/*
  Warnings:

  - The primary key for the `npd` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `osa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `audit_date` to the `npd` table without a default value. This is not possible if the table is not empty.
  - Added the required column `audit_date` to the `osa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."npd" DROP CONSTRAINT "npd_pkey",
ADD COLUMN     "audit_date" INTEGER NOT NULL,
ADD CONSTRAINT "npd_pkey" PRIMARY KEY ("year_month", "store_code", "product_code", "audit_date");

-- AlterTable
ALTER TABLE "public"."osa" DROP CONSTRAINT "osa_pkey",
ADD COLUMN     "audit_date" INTEGER NOT NULL,
ADD CONSTRAINT "osa_pkey" PRIMARY KEY ("year_month", "store_code", "product_code", "audit_date");

-- CreateIndex
CREATE INDEX "npd_product_code_idx" ON "public"."npd"("product_code");

-- CreateIndex
CREATE INDEX "osa_product_code_idx" ON "public"."osa"("product_code");
