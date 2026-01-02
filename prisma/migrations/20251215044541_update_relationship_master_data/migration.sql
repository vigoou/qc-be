-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "product_category_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "product_sub_category_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."store" DROP CONSTRAINT "store_auditors_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."store" DROP CONSTRAINT "store_sale_rep_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."store" DROP CONSTRAINT "store_ship_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."store" DROP CONSTRAINT "store_supervisor_id_fkey";

-- AlterTable
ALTER TABLE "public"."product" ALTER COLUMN "category_id" DROP NOT NULL,
ALTER COLUMN "sub_category_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."store" ALTER COLUMN "supervisor_id" DROP NOT NULL,
ALTER COLUMN "sale_rep_id" DROP NOT NULL,
ALTER COLUMN "ship_id" DROP NOT NULL,
ALTER COLUMN "auditors_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."store" ADD CONSTRAINT "store_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."store" ADD CONSTRAINT "store_sale_rep_id_fkey" FOREIGN KEY ("sale_rep_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."store" ADD CONSTRAINT "store_ship_id_fkey" FOREIGN KEY ("ship_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."store" ADD CONSTRAINT "store_auditors_id_fkey" FOREIGN KEY ("auditors_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "product_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "public"."sub_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
