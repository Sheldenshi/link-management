import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Redirect,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateLinkDto } from './dto/create-link.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('links/:userId')
  async findAll(@Param('userId') userId: string) {
    return await this.appService.findAll(userId);
  }

  @Post()
  async create(@Body() createLinkDto: CreateLinkDto) {
    return await this.appService.create(createLinkDto);
  }

  @Get(':id')
  @Redirect()
  async updateAndRedirect(@Param('id') id: string) {
    return await this.appService.updateAndRedirect(id);
  }

  @Delete(':id')
  async deactivate(@Param('id') id: string) {
    return await this.appService.deactivate(id);
  }
}
