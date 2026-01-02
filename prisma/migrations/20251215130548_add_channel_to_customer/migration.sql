/*
  Warnings:

  - Added the required column `channel` to the `customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."customer" ADD COLUMN     "channel" TEXT NOT NULL;
