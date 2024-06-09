/*
  Warnings:

  - You are about to drop the column `example` on the `Problem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "example",
ADD COLUMN     "testcases" JSONB NOT NULL DEFAULT '{}';
