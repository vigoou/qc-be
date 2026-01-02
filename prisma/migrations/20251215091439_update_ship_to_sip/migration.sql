/*
  Warnings:

  - You are about to drop the column `ship_id` on the `store` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."store" DROP CONSTRAINT "store_ship_id_fkey";

-- AlterTable
ALTER TABLE "public"."store" DROP COLUMN "ship_id",
ADD COLUMN     "sip_id" TEXT;

-- AddForeignKey
ALTER TABLE "public"."store" ADD CONSTRAINT "store_sip_id_fkey" FOREIGN KEY ("sip_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
