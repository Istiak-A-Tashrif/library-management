// create-notification-template.dto.ts
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateNotificationTemplateDto {
  @IsOptional()
  @IsBoolean()
  is_sms_enabled?: boolean;

  @IsOptional()
  @IsBoolean()
  is_email_enabled?: boolean;

  @IsOptional()
  @IsBoolean()
  is_push_enabled?: boolean;

  @IsOptional()
  @IsString()
  email_subject?: string;

  @IsOptional()
  @IsString()
  email_content?: string;

  @IsOptional()
  @IsString()
  sms_content?: string;

  @IsOptional()
  @IsString()
  push_title?: string;

  @IsOptional()
  @IsString()
  push_content?: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  description?: string;
}
