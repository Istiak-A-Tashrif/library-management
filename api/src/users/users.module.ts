import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtSignService } from 'src/auth/jwt.sign.service';
import { PROCESSOR } from 'src/common/constants';

import { EmailModule } from '../email/email.module';
import { SocialAuthController } from './controller/social-auth.controller';
import { UserAuthController } from './controller/user-auth.controller';
import { SocialAuthService } from './services/social-auth.service';
import { UserAuthService } from './services/user-auth.service';
import { FacebookOrganizerStrategy, FacebookUserStrategy } from './strategy/facebook.strategy';
import {
  GoogleClientStrategy,
  GoogleFreelancerStrategy,
} from './strategy/google.strategy';

@Module({
  providers: [
    UserAuthService,
    JwtSignService,
    SocialAuthService,
    GoogleClientStrategy,
    GoogleFreelancerStrategy,
    FacebookUserStrategy,
    FacebookOrganizerStrategy,
  ],
  exports: [],
  imports: [
    EmailModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt_secret'),
        // privateKey: configService.get<string>('keys.privateKey'),
        // publicKey: configService.get<string>('keys.publicKey'),
        signOptions: { /* expiresIn: '86400s', */ algorithm: 'HS256' },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    BullModule.registerQueueAsync({ name: PROCESSOR.NAMES.SENIOR_PLACES }),
  ],
  controllers: [
    SocialAuthController,
    UserAuthController,
    SocialAuthController,
  ],
})
export class UsersModule {}
