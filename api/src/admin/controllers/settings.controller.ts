import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { res } from 'src/common/response.helper';
import { SeederService } from '../services/seeder.service';
import { SettingsService } from '../services/settings.service';

@Controller('admin/settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  async addSettings(@Body() settings: any) {
    const response = await this.settingsService.addSettings(settings);
    return res.success(response);
  }

    // @Post('sort-menu-items')
    // async sortMenuItems(@Body() payload: any) {
    //   // return payload;
    //   const response = await this.settingsService.sortMenuItems(payload);
    //   return res.success(response);
    // }
}
