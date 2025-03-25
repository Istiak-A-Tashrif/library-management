import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  phone?: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UserLoginDto {
  @IsNotEmpty()
  @IsString()
  email_or_phone: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class VerifyOtpDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  role: string;

  @IsNotEmpty()
  @IsNumber()
  otp: number;
}
