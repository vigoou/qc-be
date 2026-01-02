/*
  Warnings:

  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_role_id_fkey";

-- DropTable
DROP TABLE "public"."Role";

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role_id" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."store" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ess_store_code" TEXT NOT NULL,
    "type_code" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "format_type" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "frequency" INTEGER NOT NULL,
    "audit_time" INTEGER NOT NULL,
    "region" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "ward" TEXT NOT NULL,
    "address_detail" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "supervisor_id" TEXT NOT NULL,
    "sale_rep_id" TEXT NOT NULL,
    "ship_id" TEXT NOT NULL,
    "auditors_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,

    CONSTRAINT "store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameVN" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."target_sos" (
    "store_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "target" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "target_sos_pkey" PRIMARY KEY ("store_id","category_id")
);

-- CreateTable
CREATE TABLE "public"."sub_category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "name_vn" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sub_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sub_category_in_category" (
    "category_id" TEXT NOT NULL,
    "sub_category_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sub_category_in_category_pkey" PRIMARY KEY ("category_id","sub_category_id")
);

-- CreateTable
CREATE TABLE "public"."brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."product" (
    "id" TEXT NOT NULL,
    "product_code" TEXT NOT NULL,
    "old_product_code" TEXT,
    "name" TEXT NOT NULL,
    "name_vn" TEXT NOT NULL,
    "package_size" TEXT NOT NULL,
    "barcode" TEXT NOT NULL,
    "length" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "brand_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "sub_category_id" TEXT NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sos_rule" (
    "id" TEXT NOT NULL,
    "rule_big" TEXT NOT NULL,
    "rule_small" TEXT NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category_id" TEXT NOT NULL,
    "sub_category_id" TEXT NOT NULL,
    "brand_id" TEXT NOT NULL,

    CONSTRAINT "sos_rule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ool_rule" (
    "id" TEXT NOT NULL,
    "off_code" TEXT NOT NULL,
    "off_name" TEXT NOT NULL,
    "off_name_vn" TEXT NOT NULL,
    "rule_big" BOOLEAN NOT NULL,
    "rule_small" BOOLEAN NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ool_rule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_name_key" ON "public"."users"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "public"."users"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "public"."role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "customer_code_key" ON "public"."customer"("code");

-- CreateIndex
CREATE UNIQUE INDEX "store_ess_store_code_key" ON "public"."store"("ess_store_code");

-- CreateIndex
CREATE UNIQUE INDEX "category_code_key" ON "public"."category"("code");

-- CreateIndex
CREATE UNIQUE INDEX "sub_category_code_key" ON "public"."sub_category"("code");

-- CreateIndex
CREATE UNIQUE INDEX "brand_code_key" ON "public"."brand"("code");

-- CreateIndex
CREATE UNIQUE INDEX "product_product_code_key" ON "public"."product"("product_code");

-- CreateIndex
CREATE UNIQUE INDEX "ool_rule_off_code_key" ON "public"."ool_rule"("off_code");

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."store" ADD CONSTRAINT "store_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."store" ADD CONSTRAINT "store_sale_rep_id_fkey" FOREIGN KEY ("sale_rep_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."store" ADD CONSTRAINT "store_ship_id_fkey" FOREIGN KEY ("ship_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."store" ADD CONSTRAINT "store_auditors_id_fkey" FOREIGN KEY ("auditors_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."store" ADD CONSTRAINT "store_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."target_sos" ADD CONSTRAINT "target_sos_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "public"."store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."target_sos" ADD CONSTRAINT "target_sos_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sub_category_in_category" ADD CONSTRAINT "sub_category_in_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sub_category_in_category" ADD CONSTRAINT "sub_category_in_category_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "public"."sub_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "product_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "public"."brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "product_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "public"."sub_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sos_rule" ADD CONSTRAINT "sos_rule_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sos_rule" ADD CONSTRAINT "sos_rule_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "public"."sub_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sos_rule" ADD CONSTRAINT "sos_rule_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "public"."brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
