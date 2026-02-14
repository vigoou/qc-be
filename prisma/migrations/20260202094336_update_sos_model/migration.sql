/*
  Warnings:

  - The primary key for the `sos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `sos` table. All the data in the column will be lost.
  - Added the required column `audit_date` to the `sos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brand_code` to the `sos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_code` to the `sos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_category_code` to the `sos` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."idx_year_month_sos";

-- AlterTable
ALTER TABLE "public"."sos" DROP CONSTRAINT "sos_pkey",
DROP COLUMN "id",
ADD COLUMN     "audit_date" INTEGER NOT NULL,
ADD COLUMN     "brand_code" TEXT NOT NULL,
ADD COLUMN     "category_code" TEXT NOT NULL,
ADD COLUMN     "qc_evidence" TEXT,
ADD COLUMN     "sub_category_code" TEXT NOT NULL,
ALTER COLUMN "comment" DROP NOT NULL,
ADD CONSTRAINT "sos_pkey" PRIMARY KEY ("year_month", "store_code", "category_code", "sub_category_code", "brand_code", "audit_date");

-- CreateIndex
CREATE INDEX "sos_year_month_store_code_idx" ON "public"."sos"("year_month", "store_code");

-- CreateIndex
CREATE INDEX "sos_store_code_idx" ON "public"."sos"("store_code");

-- AddForeignKey
ALTER TABLE "public"."sos" ADD CONSTRAINT "sos_brand_code_fkey" FOREIGN KEY ("brand_code") REFERENCES "public"."brand"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sos" ADD CONSTRAINT "sos_category_code_fkey" FOREIGN KEY ("category_code") REFERENCES "public"."category"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sos" ADD CONSTRAINT "sos_sub_category_code_fkey" FOREIGN KEY ("sub_category_code") REFERENCES "public"."sub_category"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
