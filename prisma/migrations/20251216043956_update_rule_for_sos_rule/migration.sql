-- AlterTable
ALTER TABLE "public"."sos_rule" ALTER COLUMN "rule_big" DROP NOT NULL,
ALTER COLUMN "rule_small" DROP NOT NULL;
