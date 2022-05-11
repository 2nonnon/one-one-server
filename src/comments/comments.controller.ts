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
import { Comment } from './comment.entity';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
@UseGuards(AuthGuard())
export class CommentsController {
  private loggor = new Logger('CommentsController', { timestamp: true });

  constructor(private commentsService: CommentsService) {}

  @Get()
  getComments(): Promise<Comment[]> {
    this.loggor.verbose(`retrieving all comments`);
    return this.commentsService.getComments();
  }

  @Post()
  createComment(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    this.loggor.verbose(
      ` create a category, Comment ${JSON.stringify(createCommentDto)}`,
    );
    return this.commentsService.createComment(createCommentDto);
  }

  @Delete('/:id')
  deleteComment(@Param('id') id: number): Promise<void> {
    this.loggor.verbose(`detele category ${id}`);
    return this.commentsService.deleteComment(id);
  }
}
