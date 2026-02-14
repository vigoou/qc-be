/*
  Warnings:

  - You are about to drop the column `new_product_id` on the `npd_checklist` table. All the data in the column will be lost.
  - You are about to drop the column `old_product_id` on the `npd_checklist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."npd_checklist" DROP COLUMN "new_product_id",
DROP COLUMN "old_product_id";
