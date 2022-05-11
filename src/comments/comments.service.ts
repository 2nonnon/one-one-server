import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentsRepository } from './comments.repository';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsRepository)
    private commentsRepository: CommentsRepository,
  ) {}

  async getComments(): Promise<Comment[]> {
    return await this.commentsRepository.find();
  }

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentsRepository.createComment(createCommentDto);
  }

  async deleteComment(id: number): Promise<void> {
    this.commentsRepository.delete(id);
  }
}
