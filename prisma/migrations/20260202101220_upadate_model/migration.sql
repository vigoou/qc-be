/*
  Warnings:

  - You are about to drop the column `audit_status` on the `sos` table. All the data in the column will be lost.
  - You are about to drop the column `product_code` on the `sos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."sos" DROP CONSTRAINT "sos_product_code_fkey";

-- AlterTable
ALTER TABLE "public"."sos" DROP COLUMN "audit_status",
DROP COLUMN "product_code";
