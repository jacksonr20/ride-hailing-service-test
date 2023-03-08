import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Request } from '../entities';
import { FinishRideDto, RequestRideDto } from '../dto';
import { calculateFare } from 'src/api/commons';

import { RiderService } from './rider.service';
import { TripService } from './trip.service';
import { PaymentService } from './payment.service';

import { RequestStatus } from './../../commons/enums';
import { Trip } from './../../../database/entities';
import { MapBox } from './../../libs';

@Injectable()
export class RequestService {
  private logger = new Logger(RequestService.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly riderService: RiderService,
    private readonly tripService: TripService,
    private readonly paymentService: PaymentService,
  ) {}

  /**
   * Create a new ride using the given payload and a new trip that'll be related to the request
   *
   * @param {RequestRideDto} payload
   * @return {*}  {Promise<Request>}
   * @memberof RequestService
   */
  async startRide(payload: RequestRideDto): Promise<Request> {
    try {
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
      const { distance, duration } = await MapBox.getDirection(
        `${pickupLocation.latitude},${pickupLocation.longitude}`,
        `${dropoffLocation.latitude},${dropoffLocation.longitude}`,
      );
      request.rider = await this.riderService.getOneByIdOrFail(riderId);
      request.estimatedFare = calculateFare(distance, duration);

      let incomingRequest: Request = new Request();

      await this.dataSource.transaction(async manager => {
        // Create the incoming request with the given payload
        incomingRequest = await manager.save<Request>(request);

        // Creating the related trip with it's driver
        const relatedTrip = await this.tripService.generateBaseTrip(incomingRequest);
        await manager.save<Trip>(relatedTrip);

        // As the request was accepted automatically we must change it's status
        await manager.update<Request>(Request, { id: incomingRequest.id }, { status: RequestStatus.ACCEPTED });
      });

      return incomingRequest;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(error);

      throw new InternalServerErrorException('Something went wrong creating your request, please try again.');
    }
  }

  async finishRide(payload: FinishRideDto): Promise<void> {
    try {
      const { tripId, finalLocation, riderRating } = payload;
      const currentTrip = await this.tripService.getOneByIdOrFail(tripId);

      const {
        pickUpLocation: { coordinates },
      } = currentTrip.request;

      const { distance, duration } = await MapBox.getDirection(`${coordinates[0]},${coordinates[1]}`, `${finalLocation.latitude},${finalLocation.longitude}`);
      const tripPayment = this.paymentService.generatePayment(calculateFare(distance, duration));
      // const request = new Request();

      // request.pickUpLocation = {
      //   type: 'Point',
      //   coordinates: [pickupLocation.latitude, pickupLocation.longitude],
      // };
      // request.dropOffLocation = {
      //   type: 'Point',
      //   coordinates: [dropoffLocation.latitude, dropoffLocation.longitude],
      // };
      // const { distance, duration } = await MapBox.getDirection(
      //   `${pickupLocation.latitude},${pickupLocation.longitude}`,
      //   `${dropoffLocation.latitude},${dropoffLocation.longitude}`,
      // );
      // request.rider = await this.riderService.getOneByIdOrFail(riderId);
      // request.estimatedFare = calculateFare(distance, duration);

      // let incomingRequest: Request = new Request();

      // await this.dataSource.transaction(async manager => {
      //   // Create the incoming request with the given payload
      //   incomingRequest = await manager.save<Request>(request);

      //   // Creating the related trip with it's driver
      //   const relatedTrip = await this.tripService.generateBaseTrip(incomingRequest);
      //   await manager.save<Trip>(relatedTrip);

      //   // As the request was accepted automatically we must change it's status
      //   await manager.update<Request>(Request, { id: incomingRequest.id }, { status: RequestStatus.ACCEPTED });
      // });

      // return incomingRequest;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(error);

      throw new InternalServerErrorException('Something went wrong creating your request, please try again.');
    }
  }
}
