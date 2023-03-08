import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Driver } from '../../../database/entities';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  async getOneByIdOrFail(id: string): Promise<Driver> {
    const driver = await this.driverRepository.findOneOrFail({
      where: {
        id,
      },
    });

    return driver;
  }
}
