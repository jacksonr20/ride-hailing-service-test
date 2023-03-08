import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Rider } from '../../../database/entities';

@Injectable()
export class RiderService {
  constructor(
    @InjectRepository(Rider)
    private readonly riderRepository: Repository<Rider>,
  ) {}

  async getOneByIdOrFail(id: string): Promise<Rider> {
    const rider = await this.riderRepository.findOne({
      where: {
        id,
      },
    });

    if (!rider) {
      throw new NotFoundException('The entity you are looking for does not exists!');
    }

    return rider;
  }
}
