import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationTemplateDto } from '../dtos/notificationTemplate.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationTemplateService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdateTemplate(
    slug: string,
    data: CreateNotificationTemplateDto,
  ): Promise<any> {
    const existingTemplate = await this.prisma.notificationTemplate.findUnique({
      where: { slug },
    });

    const templateData = {
      is_sms_enabled: data.is_sms_enabled ?? false,
      is_email_enabled: data.is_email_enabled ?? false,
      is_push_enabled: data.is_push_enabled ?? false,
      email_subject: data.email_subject || null,
      email_content: data.email_content || null,
      sms_content: data.sms_content || null,
      push_title: data.push_title || null,
      push_content: data.push_content || null,
      slug: slug || data.slug,
      description: data.description || null,
    };

    if (existingTemplate) {
      return this.prisma.notificationTemplate.update({
        where: { slug },
        data: templateData,
      });
    }

    return this.prisma.notificationTemplate.create({ data: templateData });
  }

  async getTemplateBySlug(slug: string): Promise<any> {
    const template = await this.prisma.notificationTemplate.findUnique({
      where: { slug },
    });

    if (!template) {
      return 'Template not in DB' ;
    }

    return template;
  }
}
