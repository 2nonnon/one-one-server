import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { Notice } from './notice.entity';

@EntityRepository(Notice)
export class NoticesRepository extends Repository<Notice> {
  private logger = new Logger('NoticesRepository', { timestamp: true });

  async createNotice(createNoticeDto: CreateNoticeDto): Promise<Notice> {
    const notice = this.create(createNoticeDto);

    try {
      return await this.save(notice);
    } catch (error) {
      this.logger.error(
        `Failed to create category with ${JSON.stringify(createNoticeDto)}.`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
