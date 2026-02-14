/*
  Warnings:

  - The primary key for the `osa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `audit_status` on the `osa` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `osa` table. All the data in the column will be lost.
  - The primary key for the `osa_checklist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `store_code` on the `osa_checklist` table. All the data in the column will be lost.
  - Added the required column `store_id` to the `osa_checklist` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."idx_year_month_osa";

-- DropIndex
DROP INDEX "public"."idx_year_month_store_code_product_id_osa";

-- AlterTable
ALTER TABLE "public"."osa" DROP CONSTRAINT "osa_pkey",
DROP COLUMN "audit_status",
DROP COLUMN "id",
ADD CONSTRAINT "osa_pkey" PRIMARY KEY ("year_month", "store_id", "product_id");

-- AlterTable
ALTER TABLE "public"."osa_checklist" DROP CONSTRAINT "osa_checklist_pkey",
DROP COLUMN "store_code",
ADD COLUMN     "store_id" TEXT NOT NULL,
ADD CONSTRAINT "osa_checklist_pkey" PRIMARY KEY ("year_month", "store_id", "product_id");

-- CreateIndex
CREATE INDEX "osa_year_month_store_id_idx" ON "public"."osa"("year_month", "store_id");

-- CreateIndex
CREATE INDEX "osa_store_id_idx" ON "public"."osa"("store_id");
