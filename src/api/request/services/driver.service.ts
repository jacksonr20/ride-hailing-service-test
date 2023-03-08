import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Driver } from '../../../database/entities';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  async getFirstDriver(): Promise<Driver> {
    const drivers = await this.driverRepository.find();

    if (!drivers.length) {
      throw new NotFoundException('There are no drivers available, please try creating new ones!');
    }

    return drivers[0];
  }

  async getOneByIdOrFail(id: string): Promise<Driver> {
    const driver = await this.driverRepository.findOne({
      where: {
        id,
      },
    });

    if (!driver) {
      throw new NotFoundException('The driver you are looking for does not exists!');
    }

    return driver;
  }
}
