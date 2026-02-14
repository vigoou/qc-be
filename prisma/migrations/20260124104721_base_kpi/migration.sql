-- CreateTable
CREATE TABLE "public"."c2a_checklist" (
    "year_month" INTEGER NOT NULL,
    "store_code" TEXT NOT NULL,
    "c2a_id" TEXT NOT NULL,

    CONSTRAINT "c2a_checklist_pkey" PRIMARY KEY ("year_month","store_code","c2a_id")
);

-- CreateTable
CREATE TABLE "public"."promotion_detail" (
    "id" TEXT NOT NULL,
    "promotion_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "promotion_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."config" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."npd_checklist" (
    "year_month" INTEGER NOT NULL,
    "store_code" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "npd_checklist_pkey" PRIMARY KEY ("year_month","store_code","product_id")
);

-- CreateTable
CREATE TABLE "public"."npd" (
    "id" TEXT NOT NULL,
    "year_month" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "current_stock" INTEGER NOT NULL,
    "price_list" BOOLEAN NOT NULL,
    "location" TEXT NOT NULL,
    "note" TEXT,
    "comment" TEXT NOT NULL,
    "project_team_revised" TEXT,
    "project_team_response" TEXT,
    "final_reject" BOOLEAN NOT NULL DEFAULT false,
    "sale_rep_feedback" TEXT,
    "audit_status" TEXT NOT NULL,
    "qc_note" TEXT,
    "qc_is_reject" BOOLEAN NOT NULL DEFAULT false,
    "qc_reason_reject" TEXT,
    "allow_edit" BOOLEAN NOT NULL DEFAULT false,
    "price_after_edit" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "store_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "audit_by_id" TEXT,
    "qc_by_id" TEXT,

    CONSTRAINT "npd_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."off_location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "off_location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."osa_checklist" (
    "year_month" INTEGER NOT NULL,
    "store_code" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "osa_checklist_pkey" PRIMARY KEY ("year_month","store_code","product_id")
);

-- CreateTable
CREATE TABLE "public"."osa" (
    "id" TEXT NOT NULL,
    "year_month" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "current_stock" INTEGER NOT NULL,
    "price_list" BOOLEAN NOT NULL,
    "location" TEXT NOT NULL,
    "note" TEXT,
    "comment" TEXT NOT NULL,
    "project_team_revised" TEXT,
    "project_team_response" TEXT,
    "final_reject" BOOLEAN NOT NULL DEFAULT false,
    "sale_rep_feedback" TEXT,
    "audit_status" TEXT NOT NULL,
    "qc_note" TEXT,
    "qc_is_reject" BOOLEAN NOT NULL DEFAULT false,
    "qc_reason_reject" TEXT,
    "allow_edit" BOOLEAN NOT NULL DEFAULT false,
    "price_after_edit" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "store_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "audit_by_id" TEXT,
    "qc_by_id" TEXT,

    CONSTRAINT "osa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."promotion_checklist" (
    "year_month" INTEGER NOT NULL,
    "store_code" TEXT NOT NULL,
    "promotion_id" TEXT NOT NULL,

    CONSTRAINT "promotion_checklist_pkey" PRIMARY KEY ("year_month","store_code","promotion_id")
);

-- CreateTable
CREATE TABLE "public"."promotion" (
    "id" TEXT NOT NULL,
    "year_month" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "current_stock" INTEGER NOT NULL,
    "price_list" BOOLEAN NOT NULL,
    "location" TEXT NOT NULL,
    "note" TEXT,
    "comment" TEXT NOT NULL,
    "project_team_revised" TEXT,
    "project_team_response" TEXT,
    "final_reject" BOOLEAN NOT NULL DEFAULT false,
    "sale_rep_feedback" TEXT,
    "audit_status" TEXT NOT NULL,
    "qc_note" TEXT,
    "qc_is_reject" BOOLEAN NOT NULL DEFAULT false,
    "qc_reason_reject" TEXT,
    "allow_edit" BOOLEAN NOT NULL DEFAULT false,
    "price_after_edit" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "store_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "audit_by_id" TEXT,
    "qc_by_id" TEXT,

    CONSTRAINT "promotion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."rental_checklist" (
    "year_month" INTEGER NOT NULL,
    "store_code" TEXT NOT NULL,
    "rental_id" TEXT NOT NULL,

    CONSTRAINT "rental_checklist_pkey" PRIMARY KEY ("year_month","store_code","rental_id")
);

-- CreateTable
CREATE TABLE "public"."rental" (
    "id" TEXT NOT NULL,
    "year_month" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "current_stock" INTEGER NOT NULL,
    "price_list" BOOLEAN NOT NULL,
    "location" TEXT NOT NULL,
    "note" TEXT,
    "comment" TEXT NOT NULL,
    "project_team_revised" TEXT,
    "project_team_response" TEXT,
    "final_reject" BOOLEAN NOT NULL DEFAULT false,
    "sale_rep_feedback" TEXT,
    "audit_status" TEXT NOT NULL,
    "qc_note" TEXT,
    "qc_is_reject" BOOLEAN NOT NULL DEFAULT false,
    "qc_reason_reject" TEXT,
    "allow_edit" BOOLEAN NOT NULL DEFAULT false,
    "price_after_edit" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "store_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "audit_by_id" TEXT,
    "qc_by_id" TEXT,

    CONSTRAINT "rental_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sos_checklist" (
    "year_month" INTEGER NOT NULL,
    "store_code" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "sos_checklist_pkey" PRIMARY KEY ("year_month","store_code","category")
);

-- CreateTable
CREATE TABLE "public"."sos" (
    "id" TEXT NOT NULL,
    "year_month" INTEGER NOT NULL,
    "type_ol" TEXT,
    "total_length" DOUBLE PRECISION NOT NULL,
    "sos_length" DOUBLE PRECISION NOT NULL,
    "ms_unilever_length" DOUBLE PRECISION NOT NULL,
    "ol_unilever_length" DOUBLE PRECISION NOT NULL,
    "sos_unilever_length" DOUBLE PRECISION NOT NULL,
    "private_lable_length" DOUBLE PRECISION NOT NULL,
    "imported_lable_length" DOUBLE PRECISION NOT NULL,
    "note" TEXT,
    "comment" TEXT NOT NULL,
    "project_team_revised" TEXT,
    "project_team_response" TEXT,
    "final_reject" BOOLEAN NOT NULL DEFAULT false,
    "sale_rep_feedback" TEXT,
    "audit_status" TEXT NOT NULL,
    "qc_note" TEXT,
    "qc_is_reject" BOOLEAN NOT NULL DEFAULT false,
    "qc_reason_reject" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "store_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "audit_by_id" TEXT,
    "qc_by_id" TEXT,

    CONSTRAINT "sos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_year_month_store_code_c2a_id" ON "public"."c2a_checklist"("year_month", "store_code", "c2a_id");

-- CreateIndex
CREATE UNIQUE INDEX "config_key_key" ON "public"."config"("key");

-- CreateIndex
CREATE INDEX "idx_year_month_store_code_product_id" ON "public"."npd_checklist"("year_month", "store_code", "product_id");

-- CreateIndex
CREATE INDEX "idx_year_month_npd" ON "public"."npd"("year_month");

-- CreateIndex
CREATE UNIQUE INDEX "off_location_code_key" ON "public"."off_location"("code");

-- CreateIndex
CREATE INDEX "idx_year_month_store_code_product_id_osa" ON "public"."osa_checklist"("year_month", "store_code", "product_id");

-- CreateIndex
CREATE INDEX "idx_year_month_osa" ON "public"."osa"("year_month");

-- CreateIndex
CREATE INDEX "idx_year_month_store_code_promotion_id" ON "public"."promotion_checklist"("year_month", "store_code", "promotion_id");

-- CreateIndex
CREATE INDEX "idx_year_month_promotion" ON "public"."promotion"("year_month");

-- CreateIndex
CREATE INDEX "idx_year_month_store_code_rental_id" ON "public"."rental_checklist"("year_month", "store_code", "rental_id");

-- CreateIndex
CREATE INDEX "idx_year_month_rental" ON "public"."rental"("year_month");

-- CreateIndex
CREATE INDEX "idx_year_month_store_code_category_sos" ON "public"."sos_checklist"("year_month", "store_code", "category");

-- CreateIndex
CREATE INDEX "idx_year_month_sos" ON "public"."sos"("year_month");

-- AddForeignKey
ALTER TABLE "public"."npd" ADD CONSTRAINT "npd_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "public"."store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."npd" ADD CONSTRAINT "npd_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."npd" ADD CONSTRAINT "npd_audit_by_id_fkey" FOREIGN KEY ("audit_by_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."npd" ADD CONSTRAINT "npd_qc_by_id_fkey" FOREIGN KEY ("qc_by_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."osa" ADD CONSTRAINT "osa_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "public"."store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."osa" ADD CONSTRAINT "osa_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."osa" ADD CONSTRAINT "osa_audit_by_id_fkey" FOREIGN KEY ("audit_by_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."osa" ADD CONSTRAINT "osa_qc_by_id_fkey" FOREIGN KEY ("qc_by_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."promotion" ADD CONSTRAINT "promotion_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "public"."store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."promotion" ADD CONSTRAINT "promotion_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."promotion" ADD CONSTRAINT "promotion_audit_by_id_fkey" FOREIGN KEY ("audit_by_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."promotion" ADD CONSTRAINT "promotion_qc_by_id_fkey" FOREIGN KEY ("qc_by_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."rental" ADD CONSTRAINT "rental_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "public"."store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."rental" ADD CONSTRAINT "rental_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."rental" ADD CONSTRAINT "rental_audit_by_id_fkey" FOREIGN KEY ("audit_by_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."rental" ADD CONSTRAINT "rental_qc_by_id_fkey" FOREIGN KEY ("qc_by_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sos" ADD CONSTRAINT "sos_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "public"."store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sos" ADD CONSTRAINT "sos_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sos" ADD CONSTRAINT "sos_audit_by_id_fkey" FOREIGN KEY ("audit_by_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sos" ADD CONSTRAINT "sos_qc_by_id_fkey" FOREIGN KEY ("qc_by_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
