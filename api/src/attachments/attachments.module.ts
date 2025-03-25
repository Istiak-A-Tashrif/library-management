import { Module } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { AttachmentsController } from './attachments.controller';
import { PrismaModule } from "../prisma/prisma.module";
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    PrismaModule,
    CloudinaryModule
  ],
  controllers: [AttachmentsController],
  providers: [AttachmentsService]
})
export class AttachmentsModule {}
