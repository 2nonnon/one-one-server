import { Address } from './address.entity';
import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { User } from './../auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';

@EntityRepository(Address)
export class AddresssRepository extends Repository<Address> {
  private logger = new Logger('AddressesRepository', { timestamp: true });

  async createAddress(
    createAddressDto: CreateAddressDto,
    user: User,
  ): Promise<Address> {
    const { destination, receiver, mobile, remark, isDefault } =
      createAddressDto;

    const addresses = await this.find({ user });

    const lastChoosed = addresses.find((item) => item.isChoosed);

    if (lastChoosed) {
      lastChoosed.isChoosed = false;
      await this.save(lastChoosed);
    }

    const isChoosed = true;

    const address = this.create({
      destination,
      receiver,
      mobile,
      remark,
      isDefault,
      isChoosed,
      user,
    });

    try {
      await this.save(address);
      return address;
    } catch (error) {
      this.logger.error(
        `Failed to create address for user "${user.username}".`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async updateAddress(
    id: string,
    createAddressDto: CreateAddressDto,
    user: User,
  ): Promise<Address> {
    const address = await this.findOneOrFail({ id, user });

    if (!address) {
      throw new NotFoundException(`Address with ID "${id}" not found`);
    } else {
      Object.keys(createAddressDto).forEach((prop) => {
        address[prop] = createAddressDto[prop];
      });
    }

    try {
      await this.save(address);
      return address;
    } catch (error) {
      this.logger.error(
        `Failed to update address by ${id} with ${JSON.stringify(
          createAddressDto,
        )} for user "${user.username}".`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async updateAddressChoose(id: string, user: User): Promise<Address> {
    const addresses = await this.find({ user });

    const lastChoosed = addresses.find((item) => item.isChoosed);

    if (lastChoosed) {
      lastChoosed.isChoosed = false;
      await this.save(lastChoosed);
    }

    const address = await this.findOneOrFail({ id, user });

    if (!address) {
      throw new NotFoundException(`Address with ID "${id}" not found`);
    }

    address.isChoosed = true;

    try {
      await this.save(address);
      return address;
    } catch (error) {
      this.logger.error(
        `Failed to update address for user "${user.username}".`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
