/*
  Warnings:

  - You are about to drop the column `createdAt` on the `audios` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `audios` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `books` table. All the data in the column will be lost.
  - You are about to drop the `AudioChapter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Chapter` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updated_at` to the `audios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AudioChapter" DROP CONSTRAINT "AudioChapter_audio_id_fkey";

-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_audioId_fkey";

-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_book_id_fkey";

-- AlterTable
ALTER TABLE "audios" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "books" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "AudioChapter";

-- DropTable
DROP TABLE "Chapter";

-- CreateTable
CREATE TABLE "chapters" (
    "id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "file" TEXT,
    "type" "CHAPTER_TYPE" NOT NULL DEFAULT 'PRIVATE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "audioId" INTEGER,

    CONSTRAINT "chapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audio_chapters" (
    "id" SERIAL NOT NULL,
    "audio_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "file" TEXT,
    "type" "CHAPTER_TYPE" NOT NULL DEFAULT 'PRIVATE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "audio_chapters_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_audioId_fkey" FOREIGN KEY ("audioId") REFERENCES "audios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audio_chapters" ADD CONSTRAINT "audio_chapters_audio_id_fkey" FOREIGN KEY ("audio_id") REFERENCES "audios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
