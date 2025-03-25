import { Controller, Get, Param, Post, Body, Patch, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/jwt/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Role } from 'src/auth/dto/role.enum';
import { HasRoles } from 'src/auth/jwt/has-roles.decorator';
import { NotificationTemplateService } from '../services/notificationTemplate.service';
import { CreateNotificationTemplateDto } from '../dtos/notificationTemplate.dto';

@HasRoles(Role.Admin)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('notification-templates')
export class NotificationTemplateController {
  constructor(
    private readonly notificationTemplateService: NotificationTemplateService,
  ) {}

  @Post(':slug')
  async createOrUpdate(
    @Param('slug') slug: string,
    @Body() body: CreateNotificationTemplateDto,
  ) {
    try {
      const template = await this.notificationTemplateService.createOrUpdateTemplate(
        slug,
        body,
      );
      return { success: true, template };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':slug')
  async getTemplateBySlug(@Param('slug') slug: string) {
    const template = await this.notificationTemplateService.getTemplateBySlug(slug);
    if (!template) {
      throw new HttpException('Template not found', HttpStatus.NOT_FOUND);
    }
    return { success: true, template };
  }
}
