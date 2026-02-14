/*
  Warnings:

  - Added the required column `stock` to the `npd_checklist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `osa_checklist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."npd_checklist" ADD COLUMN     "stock" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."osa_checklist" ADD COLUMN     "stock" INTEGER NOT NULL;
