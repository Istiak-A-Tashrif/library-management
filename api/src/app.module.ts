import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppProcessor } from './app.processor';
import { AppService } from './app.service';
import { AttachmentsModule } from './attachments/attachments.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { PROCESSOR } from './common/constants';
import configuration from './config';
import { CrudModule } from './crud/crud.module';
import { EmailModule } from './email/email.module';
import { PaginationModule } from './pagination/pagination.module';
import { PasswordModule } from './password/password.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASS,
      },
    }),
    BullModule.registerQueueAsync({
      name: PROCESSOR.NAMES.SENIOR_PLACES,
    }),
    PrismaModule,
    // CheckoutModule,
    CrudModule,
    AuthModule,
    AttachmentsModule,
    UsersModule,
    AdminModule,
    UsersModule,
    EmailModule,
    PasswordModule,
    CloudinaryModule,
    // StripeModule,
    PaginationModule,
    // SSlPaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppProcessor],
})
export class AppModule {}
