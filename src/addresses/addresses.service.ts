import { AddresssRepository } from './addresses.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(AddresssRepository)
    private addressesRepository: AddresssRepository,
  ) {}

  async getAddresses(user: User): Promise<Address[]> {
    const addresses = await this.addressesRepository.find({ user });
    return addresses;
  }

  async getAddressById(id: string, user: User): Promise<Address> {
    const address = await this.addressesRepository.findOneOrFail({ user, id });
    return address;
  }

  async getDefaultAddress(user: User): Promise<Address> {
    const addresses = await this.addressesRepository.find({ user });
    const address = addresses?.find((item) => item.isDefault);

    if (!address) {
      throw new NotFoundException(
        `Address of user "${user.username}" not found`,
      );
    }

    return address;
  }

  async createAddress(
    createAddressDto: CreateAddressDto,
    user: User,
  ): Promise<Address> {
    return this.addressesRepository.createAddress(createAddressDto, user);
  }

  async deleteAddress(id: string, user: User): Promise<void> {
    const result = await this.addressesRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Address with ID "${id}" not found`);
    }
  }

  async updateAddress(
    id: string,
    createAddressDto: CreateAddressDto,
    user: User,
  ): Promise<Address> {
    return this.addressesRepository.updateAddress(id, createAddressDto, user);
  }

  // async updateAddressChoose(id: string, user: User): Promise<Address> {
  //   return this.addressesRepository.updateAddressChoose(id, user);
  // }
}
