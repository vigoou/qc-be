-- DropIndex
DROP INDEX "public"."users_phone_number_key";

-- AlterTable
ALTER TABLE "public"."users" ALTER COLUMN "phone_number" DROP NOT NULL;
