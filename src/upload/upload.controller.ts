import {
  Controller,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { v4 as uuid } from 'uuid';
import { Express } from 'express';

@Controller('upload')
export class UploadController {
  private loggor = new Logger('RenderController', { timestamp: true });

  @Post('file')
  // 注意：必须在form的属性中配置enctype="multipart/form-data"
  @UseInterceptors(FileInterceptor('pic')) // 配置上传图片的field
  doAdd(@UploadedFile() file: Express.Multer.File) {
    this.loggor.verbose(`upload file ${file}`);
    const fileName = `${uuid()}.${file.originalname.split('.').pop()}`;
    const filePath = join(__dirname.slice(0, -12), 'public/upload', fileName);
    const writeStream = createWriteStream(filePath);
    writeStream.write(file.buffer);
    return `/upload/${fileName}`;
  }
}
