/*
  Warnings:

  - Added the required column `new_product_id` to the `npd_checklist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `old_product_id` to the `npd_checklist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `new_product_id` to the `osa_checklist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `old_product_id` to the `osa_checklist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."npd_checklist" ADD COLUMN     "new_product_id" TEXT NOT NULL,
ADD COLUMN     "old_product_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."osa_checklist" ADD COLUMN     "new_product_id" TEXT NOT NULL,
ADD COLUMN     "old_product_id" TEXT NOT NULL;
