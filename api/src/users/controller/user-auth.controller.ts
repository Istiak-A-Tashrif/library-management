import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { res } from 'src/common/response.helper';
import EmailService from 'src/email/email.service';
import SmsService from 'src/email/sms.service';

import { da } from '@faker-js/faker';
import {
  UserLoginDto,
  UserRegisterDto,
  VerifyOtpDto,
} from '../dto/organizer-auth.dto';
import { UserAuthService } from '../services/user-auth.service';

@Controller('auth/user')
export class UserAuthController {
  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly emailService: EmailService,
    private readonly smsService: SmsService,
  ) {}

  @Post('register')
  async createUser(@Body() data: UserRegisterDto) {
    const emailExists = await this.userAuthService.checkIfEmailExists(
      data.email,
    );
    if (emailExists) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    const request = await this.userAuthService.createUser(data);

    const otp_req = await this.userAuthService.createOtp({
      email: request.email,
    });

    const getSettings: any =
      await this.userAuthService.getSettingForSendEmail();
    const brandName = getSettings?.company_name ?? 'Tickyto';

    const text = `Welcome to ${brandName}. Your verification OTP code is: ${otp_req.otp}`;
    const sendEmail = await this.emailService.sendEmail(
      request.email,
      `Welcome to ${brandName}`,
      text,
    );

    //  await this.smsService.sendSMS(request.phone, text);

    return res.success({ ...request, otp_send: true });
  }

  @Post('login')
  async loginUser(@Body() data: UserLoginDto) {
    const user = await this.userAuthService.loginUser(data);
    return res.success(user);
  }

  @Post('otp/verify')
  async verifyOtp(@Body() otp: VerifyOtpDto) {
    const response = await this.userAuthService.verifyUser(otp);
    return res.success(response);
  }
}
