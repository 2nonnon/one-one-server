import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@EntityRepository(Comment)
export class CommentsRepository extends Repository<Comment> {
  private logger = new Logger('CommentsRepository', { timestamp: true });

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = this.create(createCommentDto);

    try {
      return await this.save(comment);
    } catch (error) {
      this.logger.error(
        `Failed to create comment with ${JSON.stringify(createCommentDto)}.`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
