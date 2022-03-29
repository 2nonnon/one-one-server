import { AddresssRepository } from './addresses.repository';
import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AddresssRepository]), AuthModule],
  providers: [AddressesService],
  controllers: [AddressesController],
})
export class AddressesModule {}
