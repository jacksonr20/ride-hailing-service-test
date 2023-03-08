import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Trip } from '../../../database/entities';
import { DriverService } from './driver.service';
import { Request } from '../entities';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
    private readonly driverService: DriverService,
  ) {}

  async generateBaseTrip(incomingRequest: Request): Promise<Trip> {
    const trip = new Trip();
    const driver = await this.driverService.getFirstDriver();

    trip.driver = driver;
    trip.car = driver.cars?.[0] ?? null;
    trip.request = incomingRequest;
    trip.startTime = new Date();

    return trip;
  }

  async getOneByIdOrFail(id: string): Promise<Trip> {
    const trip = await this.tripRepository.findOne({
      where: {
        id,
      },
    });

    if (!trip) {
      throw new NotFoundException('The trip you are looking for does not exists!');
    }

    return trip;
  }
}
