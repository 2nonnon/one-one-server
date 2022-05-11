import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Attribute } from './attribute.entity';
import { Attributes } from './attributes.inteface';
import { AttributesService } from './attributes.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';

@Controller('attributes')
export class AttributesController {
  private loggor = new Logger('AttributesController', { timestamp: true });

  constructor(private attributesService: AttributesService) {}

  @Get()
  getAttributes(): Promise<Attributes[]> {
    this.loggor.verbose(`retrieving all attributes`);
    return this.attributesService.getAttributes();
  }

  @Post()
  @UseGuards(AuthGuard())
  createAttribute(
    @Body() createAttributeDto: CreateAttributeDto,
  ): Promise<Attribute> {
    this.loggor.verbose(
      ` create a attribute, Attribute ${JSON.stringify(createAttributeDto)}`,
    );
    return this.attributesService.createAttribute(createAttributeDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteAttribute(@Param('id') id: number): Promise<void> {
    this.loggor.verbose(`detele attribute ${id}`);
    return this.attributesService.deleteAttribute(id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  updateAttribute(
    @Param('id') id: number,
    @Body() createAttributeDto: CreateAttributeDto,
  ): Promise<Attribute> {
    this.loggor.verbose(
      `update attribute ${id}, Attribute ${JSON.stringify(createAttributeDto)}`,
    );
    return this.attributesService.updateAttribute(id, createAttributeDto);
  }
}
