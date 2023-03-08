import { MapBox } from './../../libs/map-box.lib';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Request } from '../entities';
import { RequestRideDto } from '../dto';
import { calculateFare } from 'src/api/commons';

import { RiderService } from './rider.service';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private readonly requestRepository: Repository<Request>,
    private readonly riderService: RiderService,
  ) {}

  async storeRequest(payload: RequestRideDto): Promise<Request> {
    const { riderId, pickupLocation, dropoffLocation } = payload;
    const request = new Request();

    request.pickUpLocation = {
      type: 'Point',
      coordinates: [pickupLocation.latitude, pickupLocation.longitude],
    };
    request.dropOffLocation = {
      type: 'Point',
      coordinates: [dropoffLocation.latitude, dropoffLocation.longitude],
    };
    const { distance, duration } = await MapBox.getDirection(`${pickupLocation.latitude},${pickupLocation.longitude}`, `${dropoffLocation.latitude},${dropoffLocation.longitude}`);
    request.rider = await this.riderService.getOneByIdOrFail(riderId);
    request.estimatedFare = calculateFare(distance, duration);

    return await this.requestRepository.save<Request>(request);
  }
}
