import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AttributesController } from './attributes.controller';
import { AttributesRepository } from './attributes.repository';
import { AttributesService } from './attributes.service';

@Module({
  imports: [TypeOrmModule.forFeature([AttributesRepository]), AuthModule],
  controllers: [AttributesController],
  providers: [AttributesService],
})
export class AttributesModule {}
