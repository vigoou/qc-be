/*
  Warnings:

  - The primary key for the `brand` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `brand` table. All the data in the column will be lost.
  - The primary key for the `category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `category` table. All the data in the column will be lost.
  - The primary key for the `customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `customer` table. All the data in the column will be lost.
  - The primary key for the `npd` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `npd` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `npd` table. All the data in the column will be lost.
  - You are about to drop the column `store_id` on the `npd` table. All the data in the column will be lost.
  - The primary key for the `osa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `product_id` on the `osa` table. All the data in the column will be lost.
  - You are about to drop the column `store_id` on the `osa` table. All the data in the column will be lost.
  - The primary key for the `osa_checklist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `product_id` on the `osa_checklist` table. All the data in the column will be lost.
  - You are about to drop the column `store_id` on the `osa_checklist` table. All the data in the column will be lost.
  - The primary key for the `product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `brand_id` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `sub_category_id` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the column `store_id` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `rental` table. All the data in the column will be lost.
  - You are about to drop the column `store_id` on the `rental` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `sos` table. All the data in the column will be lost.
  - You are about to drop the column `store_id` on the `sos` table. All the data in the column will be lost.
  - You are about to drop the column `brand_id` on the `sos_rule` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `sos_rule` table. All the data in the column will be lost.
  - You are about to drop the column `sub_category_id` on the `sos_rule` table. All the data in the column will be lost.
  - The primary key for the `store` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `customer_id` on the `store` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `store` table. All the data in the column will be lost.
  - The primary key for the `sub_category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `sub_category` table. All the data in the column will be lost.
  - The primary key for the `sub_category_in_category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category_id` on the `sub_category_in_category` table. All the data in the column will be lost.
  - You are about to drop the column `sub_category_id` on the `sub_category_in_category` table. All the data in the column will be lost.
  - The primary key for the `target_sos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category_id` on the `target_sos` table. All the data in the column will be lost.
  - You are about to drop the column `store_id` on the `target_sos` table. All the data in the column will be lost.
  - Added the required column `product_code` to the `npd` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_code` to the `npd` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_code` to the `osa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_code` to the `osa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_code` to the `osa_checklist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_code` to the `osa_checklist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brand_code` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_code` to the `promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_code` to the `promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_code` to the `rental` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_code` to the `rental` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_code` to the `sos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_code` to the `sos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brand_code` to the `sos_rule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_code` to the `sos_rule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_category_code` to the `sos_rule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_code` to the `store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_code` to the `sub_category_in_category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_category_code` to the `sub_category_in_category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_code` to the `target_sos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_code` to the `target_sos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."npd" DROP CONSTRAINT "npd_product_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."npd" DROP CONSTRAINT "npd_store_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."osa" DROP CONSTRAINT "osa_product_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."osa" DROP CONSTRAINT "osa_store_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "product_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "product_category_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "product_sub_category_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."promotion" DROP CONSTRAINT "promotion_product_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."promotion" DROP CONSTRAINT "promotion_store_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."rental" DROP CONSTRAINT "rental_product_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."rental" DROP CONSTRAINT "rental_store_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."sos" DROP CONSTRAINT "sos_product_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."sos" DROP CONSTRAINT "sos_store_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."sos_rule" DROP CONSTRAINT "sos_rule_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."sos_rule" DROP CONSTRAINT "sos_rule_category_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."sos_rule" DROP CONSTRAINT "sos_rule_sub_category_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."store" DROP CONSTRAINT "store_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."sub_category_in_category" DROP CONSTRAINT "sub_category_in_category_category_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."sub_category_in_category" DROP CONSTRAINT "sub_category_in_category_sub_category_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."target_sos" DROP CONSTRAINT "target_sos_category_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."target_sos" DROP CONSTRAINT "target_sos_store_id_fkey";

-- DropIndex
DROP INDEX "public"."idx_year_month_npd";

-- DropIndex
DROP INDEX "public"."osa_store_id_idx";

-- DropIndex
DROP INDEX "public"."osa_year_month_store_id_idx";

-- AlterTable
ALTER TABLE "public"."brand" DROP CONSTRAINT "brand_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "brand_pkey" PRIMARY KEY ("code");

-- AlterTable
ALTER TABLE "public"."category" DROP CONSTRAINT "category_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "category_pkey" PRIMARY KEY ("code");

-- AlterTable
ALTER TABLE "public"."customer" DROP CONSTRAINT "customer_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "customer_pkey" PRIMARY KEY ("code");

-- AlterTable
ALTER TABLE "public"."npd" DROP CONSTRAINT "npd_pkey",
DROP COLUMN "id",
DROP COLUMN "product_id",
DROP COLUMN "store_id",
ADD COLUMN     "product_code" TEXT NOT NULL,
ADD COLUMN     "store_code" TEXT NOT NULL,
ADD CONSTRAINT "npd_pkey" PRIMARY KEY ("year_month", "store_code", "product_code");

-- AlterTable
ALTER TABLE "public"."osa" DROP CONSTRAINT "osa_pkey",
DROP COLUMN "product_id",
DROP COLUMN "store_id",
ADD COLUMN     "product_code" TEXT NOT NULL,
ADD COLUMN     "store_code" TEXT NOT NULL,
ADD CONSTRAINT "osa_pkey" PRIMARY KEY ("year_month", "store_code", "product_code");

-- AlterTable
ALTER TABLE "public"."osa_checklist" DROP CONSTRAINT "osa_checklist_pkey",
DROP COLUMN "product_id",
DROP COLUMN "store_id",
ADD COLUMN     "product_code" TEXT NOT NULL,
ADD COLUMN     "store_code" TEXT NOT NULL,
ADD CONSTRAINT "osa_checklist_pkey" PRIMARY KEY ("year_month", "store_code", "product_code");

-- AlterTable
ALTER TABLE "public"."product" DROP CONSTRAINT "product_pkey",
DROP COLUMN "brand_id",
DROP COLUMN "category_id",
DROP COLUMN "id",
DROP COLUMN "sub_category_id",
ADD COLUMN     "brand_code" TEXT NOT NULL,
ADD COLUMN     "category_code" TEXT,
ADD COLUMN     "new_product_code" TEXT,
ADD COLUMN     "sub_category_code" TEXT,
ADD CONSTRAINT "product_pkey" PRIMARY KEY ("product_code");

-- AlterTable
ALTER TABLE "public"."promotion" DROP COLUMN "product_id",
DROP COLUMN "store_id",
ADD COLUMN     "product_code" TEXT NOT NULL,
ADD COLUMN     "store_code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."rental" DROP COLUMN "product_id",
DROP COLUMN "store_id",
ADD COLUMN     "product_code" TEXT NOT NULL,
ADD COLUMN     "store_code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."sos" DROP COLUMN "product_id",
DROP COLUMN "store_id",
ADD COLUMN     "product_code" TEXT NOT NULL,
ADD COLUMN     "store_code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."sos_rule" DROP COLUMN "brand_id",
DROP COLUMN "category_id",
DROP COLUMN "sub_category_id",
ADD COLUMN     "brand_code" TEXT NOT NULL,
ADD COLUMN     "category_code" TEXT NOT NULL,
ADD COLUMN     "sub_category_code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."store" DROP CONSTRAINT "store_pkey",
DROP COLUMN "customer_id",
DROP COLUMN "id",
ADD COLUMN     "customer_code" TEXT NOT NULL,
ADD CONSTRAINT "store_pkey" PRIMARY KEY ("ess_store_code");

-- AlterTable
ALTER TABLE "public"."sub_category" DROP CONSTRAINT "sub_category_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "sub_category_pkey" PRIMARY KEY ("code");

-- AlterTable
ALTER TABLE "public"."sub_category_in_category" DROP CONSTRAINT "sub_category_in_category_pkey",
DROP COLUMN "category_id",
DROP COLUMN "sub_category_id",
ADD COLUMN     "category_code" TEXT NOT NULL,
ADD COLUMN     "sub_category_code" TEXT NOT NULL,
ADD CONSTRAINT "sub_category_in_category_pkey" PRIMARY KEY ("category_code", "sub_category_code");

-- AlterTable
ALTER TABLE "public"."target_sos" DROP CONSTRAINT "target_sos_pkey",
DROP COLUMN "category_id",
DROP COLUMN "store_id",
ADD COLUMN     "category_code" TEXT NOT NULL,
ADD COLUMN     "store_code" TEXT NOT NULL,
ADD CONSTRAINT "target_sos_pkey" PRIMARY KEY ("store_code", "category_code");

-- CreateIndex
CREATE INDEX "npd_year_month_store_code_idx" ON "public"."npd"("year_month", "store_code");

-- CreateIndex
CREATE INDEX "npd_store_code_idx" ON "public"."npd"("store_code");

-- CreateIndex
CREATE INDEX "osa_year_month_store_code_idx" ON "public"."osa"("year_month", "store_code");

-- CreateIndex
CREATE INDEX "osa_store_code_idx" ON "public"."osa"("store_code");

-- AddForeignKey
ALTER TABLE "public"."store" ADD CONSTRAINT "store_customer_code_fkey" FOREIGN KEY ("customer_code") REFERENCES "public"."customer"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sub_category_in_category" ADD CONSTRAINT "sub_category_in_category_category_code_fkey" FOREIGN KEY ("category_code") REFERENCES "public"."category"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sub_category_in_category" ADD CONSTRAINT "sub_category_in_category_sub_category_code_fkey" FOREIGN KEY ("sub_category_code") REFERENCES "public"."sub_category"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."target_sos" ADD CONSTRAINT "target_sos_store_code_fkey" FOREIGN KEY ("store_code") REFERENCES "public"."store"("ess_store_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."target_sos" ADD CONSTRAINT "target_sos_category_code_fkey" FOREIGN KEY ("category_code") REFERENCES "public"."category"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "product_brand_code_fkey" FOREIGN KEY ("brand_code") REFERENCES "public"."brand"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "product_category_code_fkey" FOREIGN KEY ("category_code") REFERENCES "public"."category"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "product_sub_category_code_fkey" FOREIGN KEY ("sub_category_code") REFERENCES "public"."sub_category"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sos_rule" ADD CONSTRAINT "sos_rule_category_code_fkey" FOREIGN KEY ("category_code") REFERENCES "public"."category"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sos_rule" ADD CONSTRAINT "sos_rule_sub_category_code_fkey" FOREIGN KEY ("sub_category_code") REFERENCES "public"."sub_category"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sos_rule" ADD CONSTRAINT "sos_rule_brand_code_fkey" FOREIGN KEY ("brand_code") REFERENCES "public"."brand"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."npd" ADD CONSTRAINT "npd_store_code_fkey" FOREIGN KEY ("store_code") REFERENCES "public"."store"("ess_store_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."npd" ADD CONSTRAINT "npd_product_code_fkey" FOREIGN KEY ("product_code") REFERENCES "public"."product"("product_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."osa" ADD CONSTRAINT "osa_store_code_fkey" FOREIGN KEY ("store_code") REFERENCES "public"."store"("ess_store_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."osa" ADD CONSTRAINT "osa_product_code_fkey" FOREIGN KEY ("product_code") REFERENCES "public"."product"("product_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."promotion" ADD CONSTRAINT "promotion_store_code_fkey" FOREIGN KEY ("store_code") REFERENCES "public"."store"("ess_store_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."promotion" ADD CONSTRAINT "promotion_product_code_fkey" FOREIGN KEY ("product_code") REFERENCES "public"."product"("product_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."rental" ADD CONSTRAINT "rental_store_code_fkey" FOREIGN KEY ("store_code") REFERENCES "public"."store"("ess_store_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."rental" ADD CONSTRAINT "rental_product_code_fkey" FOREIGN KEY ("product_code") REFERENCES "public"."product"("product_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sos" ADD CONSTRAINT "sos_store_code_fkey" FOREIGN KEY ("store_code") REFERENCES "public"."store"("ess_store_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sos" ADD CONSTRAINT "sos_product_code_fkey" FOREIGN KEY ("product_code") REFERENCES "public"."product"("product_code") ON DELETE RESTRICT ON UPDATE CASCADE;
