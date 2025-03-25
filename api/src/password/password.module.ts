import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { EmailModule } from "src/email/email.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtSignService } from "src/auth/jwt.sign.service";
import EmailService from "src/email/email.service";
import SmsService from "src/email/sms.service";
import { BullModule } from "@nestjs/bull";
import { PROCESSOR } from "src/common/constants";
import { PasswordController } from "./password.controller";
import { PasswordService } from "./password.service";

@Module({
    imports: [
        PrismaModule,
        // EmailModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('jwt_secret'),
                // privateKey: configService.get<string>('keys.privateKey'),
                // publicKey: configService.get<string>('keys.publicKey'),
                signOptions: { /*expiresIn: '86400s', */algorithm: 'HS256' },
            }),
            inject: [ConfigService],
        }),
        ConfigModule,
        BullModule.registerQueueAsync(
            {
                name: PROCESSOR.NAMES.SENIOR_PLACES,
            }
        ),
    ],
    controllers: [
        PasswordController
    ],
    providers: [
        JwtSignService,
        EmailService,
        SmsService,
        PasswordService

    ],
    exports: [
    ]
})
export class PasswordModule { }