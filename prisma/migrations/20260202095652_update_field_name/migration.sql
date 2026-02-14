/*
  Warnings:

  - You are about to drop the column `imported_lable_length` on the `sos` table. All the data in the column will be lost.
  - You are about to drop the column `private_lable_length` on the `sos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."sos" DROP COLUMN "imported_lable_length",
DROP COLUMN "private_lable_length",
ADD COLUMN     "imported_label_length" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "private_label_length" DOUBLE PRECISION DEFAULT 0,
ALTER COLUMN "total_length" DROP NOT NULL,
ALTER COLUMN "total_length" SET DEFAULT 0,
ALTER COLUMN "sos_length" DROP NOT NULL,
ALTER COLUMN "sos_length" SET DEFAULT 0,
ALTER COLUMN "ms_unilever_length" DROP NOT NULL,
ALTER COLUMN "ms_unilever_length" SET DEFAULT 0,
ALTER COLUMN "ol_unilever_length" DROP NOT NULL,
ALTER COLUMN "ol_unilever_length" SET DEFAULT 0,
ALTER COLUMN "sos_unilever_length" DROP NOT NULL,
ALTER COLUMN "sos_unilever_length" SET DEFAULT 0;
