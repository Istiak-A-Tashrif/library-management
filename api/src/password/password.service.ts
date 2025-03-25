/* eslint-disable */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { JwtSignService } from 'src/auth/jwt.sign.service';
import { v4 as uuidv4 } from 'uuid';
import EmailService from '../email/email.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  RequestOtpDto,
  ResetPasswordDto,
  ResetPasswordVerifyOtpDto,
} from './reset.password.dto';
import { Role } from 'src/auth/dto/role.enum';

@Injectable()
export class PasswordService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtSignService: JwtSignService,
    private readonly emailService: EmailService,
  ) {}

  async requestOtp(data: RequestOtpDto) {
    let request_user = null;
    
    if (data.role === Role.User) {
      request_user = await this.prismaService.user.findUnique({
        where: { email: data.email_or_phone },
      });
    }

    if (!request_user) {
      throw new HttpException(`${data.role} not found`, HttpStatus.NOT_FOUND);
    }

    const otp = crypto.randomInt(100000, 999999);
    const request_data = {
      email: data.email_or_phone,
      role: data.role,
      token: uuidv4(),
      otp: String(otp),
    };

    const check = await this.prismaService.resetPassword.findFirst({
      where: { email: data.email_or_phone },
    });

    if (check) {
      await this.prismaService.resetPassword.update({
        where: { email: data.email_or_phone },
        data: { otp: String(otp) },
      });
    } else {
      await this.prismaService.resetPassword.create({ data: request_data });
    }

    const setting = await this.prismaService.setting.findFirst({
      where: {
        key: 'company_name',
      },
    });

    await this.emailService.sendEmail(
      data.email_or_phone,
      `${setting.value} - Reset Password`,
      `Your password reset code is: ${otp}`,
    );

    return true;
  }

  async resetPassword(data: ResetPasswordDto) {
    const check = await this.prismaService.resetPassword.findFirst({
      where: { token: data.token },
    });

    if (!check) {
      throw new HttpException('Invalid Request', HttpStatus.BAD_REQUEST);
    }

    if (!check.is_verified) {
      throw new HttpException('OTP not verified', HttpStatus.BAD_REQUEST);
    }

    const hash = await bcrypt.hash(data.password.toString(), 10);
    let user;

    // Remove the password from the response
    delete user.password;

    // Remove the resetPassword entry after successful password update
    await this.prismaService.resetPassword.delete({ where: { id: check.id } });

    // Construct and return the payload like in the loginUser function
    const access_token = await this.jwtSignService.signJwt({
      email: user?.email,
      phone: user?.phone,
      id: user?.id,
      profile_image: user?.profile_image,
      role: data.role,
    });

    return {
      ...user,
      access_token,
      role: data.role,
    };
  }

  async verifyOtp(data: ResetPasswordVerifyOtpDto) {
    const check = await this.prismaService.resetPassword.findFirst({
      where: {
        email: data.email_or_phone,
        otp: data.otp,
      },
    });

    if (check === null) {
      throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST);
    }
    await this.prismaService.resetPassword.update({
      where: { id: check.id },
      data: {
        is_verified: true,
      },
    });

    return {
      verified: true,
      token: check.token,
    };
  }

  // async resetPassword(data: ResetPasswordDto) {
  //     const check = await this.prismaService.resetPassword.findFirst({
  //         where: {
  //             token: data.token,
  //         }
  //     });

  //     if (check === null) {
  //         throw new HttpException('Invalid Request', HttpStatus.BAD_REQUEST)
  //     }
  //     if (!check.is_verified) {
  //         throw new HttpException('OTP not verified', HttpStatus.BAD_REQUEST)
  //     }

  //     //update password
  //     const role = check.role;
  //     const hash = await bcrypt.hash(data.password.toString(), 10);
  //     let user;
  //     // if (check.role === ROLE_PARTNER) {
  //     //     await this.prismaService.partner.update({
  //     //         where: {
  //     //             email: check.email
  //     //         },
  //     //         data: {
  //     //             password: hash
  //     //         }
  //     //     });
  //     //     user = await this.prismaService.partner.findFirst({
  //     //         where: {
  //     //             email: check.email
  //     //         }
  //     //     });
  //     // } else {

  //     //     await this.prismaService.user.update({
  //     //         where: {
  //     //             email: check.email
  //     //         },
  //     //         data: {
  //     //             password: hash
  //     //         }
  //     //     });
  //     //     user = await this.prismaService.user.findFirst({
  //     //         where: {
  //     //             email: check.email
  //     //         }
  //     //     });
  //     // }

  //     // const jwt_role = role === ROLE_PARTNER ? Role.Partner : Role.User;
  //     // const access_token = this.jwtSignService.signJwt({ email: user.email, phone: user.phone, id: user.id }, jwt_role);
  //     delete user['password'];

  //     await this.prismaService.resetPassword.delete({
  //         where: { id: check.id }
  //     });

  //     return {
  //         ...user,
  //         // access_token,
  //         role: role
  //     };
  // }
}
