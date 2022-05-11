import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { Notice } from './notice.entity';
import { NoticesService } from './notices.service';

@Controller('notices')
export class NoticesController {
  private loggor = new Logger('NoticesController', { timestamp: true });

  constructor(private noticesService: NoticesService) {}

  @Get()
  getNotices(): Promise<Notice[]> {
    this.loggor.verbose(`retrieving all notices`);
    return this.noticesService.getNotices();
  }

  @Post()
  @UseGuards(AuthGuard())
  createNotice(@Body() createNoticeDto: CreateNoticeDto): Promise<Notice> {
    this.loggor.verbose(
      ` create a category, Notice ${JSON.stringify(createNoticeDto)}`,
    );
    return this.noticesService.createNotice(createNoticeDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteNotice(@Param('id') id: number): Promise<void> {
    this.loggor.verbose(`detele category ${id}`);
    return this.noticesService.deleteNotice(id);
  }
}
