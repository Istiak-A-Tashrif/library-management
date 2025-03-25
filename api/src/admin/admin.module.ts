/* eslint-disable */
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { SeederController } from './controllers/seeder.controller';
import { SeederService } from './services/seeder.service';
// import { CareHomeService } from './services/care-home.service';
// import { CareHomeContoller } from './controllers/care-home.controller';
import { SettingsController } from './controllers/settings.controller';
import { SettingsService } from './services/settings.service';
import { NotificationTemplateService } from './services/notificationTemplate.service';
import { NotificationTemplateController } from './controllers/notificationTemplate.controller';


@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [
    SeederController,
    // CareHomeContoller,
    SettingsController,
    NotificationTemplateController,
  ],
  providers: [
    SeederService,
    // CareHomeService,
    SettingsService,
    NotificationTemplateService,
  ],
  exports: [],
})
export class AdminModule {}
