import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { Notice } from './notice.entity';
import { NoticesRepository } from './notices.repository';

@Injectable()
export class NoticesService {
  constructor(
    @InjectRepository(NoticesRepository)
    private noticesRepository: NoticesRepository,
  ) {}

  async getNotices(): Promise<Notice[]> {
    return await this.noticesRepository.find();
  }

  async createNotice(createNoticeDto: CreateNoticeDto): Promise<Notice> {
    return this.noticesRepository.createNotice(createNoticeDto);
  }

  async deleteNotice(id: number): Promise<void> {
    this.noticesRepository.delete(id);
  }
}
