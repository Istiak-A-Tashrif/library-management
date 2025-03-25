/*
  Warnings:

  - You are about to drop the column `audioId` on the `chapters` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "chapters" DROP CONSTRAINT "chapters_audioId_fkey";

-- AlterTable
ALTER TABLE "chapters" DROP COLUMN "audioId";
