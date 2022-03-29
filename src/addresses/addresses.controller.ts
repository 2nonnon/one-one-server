import { Address } from './address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressesService } from './addresses.service';
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
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('addresses')
@UseGuards(AuthGuard())
export class AddressesController {
  private loggor = new Logger('AddresssController', { timestamp: true });

  constructor(private addressesService: AddressesService) {}

  @Get()
  getAddresses(@GetUser() user: User): Promise<Address[]> {
    this.loggor.verbose(`User "${user.username}" retrieving all Addresses`);
    return this.addressesService.getAddresses(user);
  }

  @Post()
  createAddress(
    @Body() createAddressDto: CreateAddressDto,
    @GetUser() user: User,
  ): Promise<Address> {
    this.loggor.verbose(
      `User "${user.username}" creating a new Address. Address ${JSON.stringify(
        createAddressDto,
      )}`,
    );
    return this.addressesService.createAddress(createAddressDto, user);
  }

  @Delete('/:id')
  deleteAddress(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    this.loggor.verbose(`User "${user.username}" update address. id: ${id}`);
    return this.addressesService.deleteAddress(id, user);
  }

  @Patch('/:id')
  updateAddress(
    @Param('id') id: string,
    @Body() createAddressDto: CreateAddressDto,
    @GetUser() user: User,
  ): Promise<Address> {
    this.loggor.verbose(
      `User "${
        user.username
      }" update address. id: ${id} update: ${JSON.stringify(createAddressDto)}`,
    );
    return this.addressesService.updateAddress(id, createAddressDto, user);
  }
}
