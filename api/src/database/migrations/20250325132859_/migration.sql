-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "audioId" INTEGER;

-- CreateTable
CREATE TABLE "audios" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "language" TEXT,
    "author" TEXT,
    "description" TEXT,
    "preview_file" TEXT,
    "price" DECIMAL(65,30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "audios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AudioChapter" (
    "id" SERIAL NOT NULL,
    "audio_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "file" TEXT,
    "type" "CHAPTER_TYPE" NOT NULL DEFAULT 'PRIVATE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AudioChapter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_audioId_fkey" FOREIGN KEY ("audioId") REFERENCES "audios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AudioChapter" ADD CONSTRAINT "AudioChapter_audio_id_fkey" FOREIGN KEY ("audio_id") REFERENCES "audios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
