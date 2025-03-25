/*
  Warnings:

  - You are about to drop the column `preview_File` on the `books` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chapter" ALTER COLUMN "file" DROP NOT NULL;

-- AlterTable
ALTER TABLE "books" DROP COLUMN "preview_File",
ADD COLUMN     "preview_file" TEXT,
ALTER COLUMN "language" DROP NOT NULL,
ALTER COLUMN "author" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "price" DROP NOT NULL;
