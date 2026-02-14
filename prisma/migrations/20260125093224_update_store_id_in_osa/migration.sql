/*
  Warnings:

  - The primary key for the `npd_checklist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `store_code` on the `npd_checklist` table. All the data in the column will be lost.
  - Added the required column `store_id` to the `npd_checklist` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."idx_year_month_store_code_product_id";

-- AlterTable
ALTER TABLE "public"."npd_checklist" DROP CONSTRAINT "npd_checklist_pkey",
DROP COLUMN "store_code",
ADD COLUMN     "store_id" TEXT NOT NULL,
ADD CONSTRAINT "npd_checklist_pkey" PRIMARY KEY ("year_month", "store_id", "product_id");
