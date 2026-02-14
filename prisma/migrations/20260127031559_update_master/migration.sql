/*
  Warnings:

  - The primary key for the `ool_rule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ool_rule` table. All the data in the column will be lost.
  - The primary key for the `promotion_detail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `promotion_detail` table. All the data in the column will be lost.
  - The primary key for the `sos_rule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `sos_rule` table. All the data in the column will be lost.
  - You are about to drop the `target_sos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."target_sos" DROP CONSTRAINT "target_sos_category_code_fkey";

-- DropForeignKey
ALTER TABLE "public"."target_sos" DROP CONSTRAINT "target_sos_store_code_fkey";

-- AlterTable
ALTER TABLE "public"."ool_rule" DROP CONSTRAINT "ool_rule_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "public"."promotion_detail" DROP CONSTRAINT "promotion_detail_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "promotion_detail_pkey" PRIMARY KEY ("promotion_id");

-- AlterTable
ALTER TABLE "public"."sos_rule" DROP CONSTRAINT "sos_rule_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "sos_rule_pkey" PRIMARY KEY ("category_code", "sub_category_code", "brand_code");

-- DropTable
DROP TABLE "public"."target_sos";
