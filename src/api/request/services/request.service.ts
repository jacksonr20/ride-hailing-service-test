import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Request } from '../entities';
import { FinishRideDto, RequestRideDto } from '../dto';
import { calculateFare } from '../../commons';

import { RiderService } from './rider.service';
import { TripService } from './trip.service';
import { PaymentService } from './payment.service';

import { RequestStatus, TripStatus } from './../../commons/enums';
import { Payment, Trip } from './../../../database/entities';
import { MapBox, PaymentGateway } from './../../libs';
import { generateUuid } from './../../commons/helpers';

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
        `${pickupLocation.longitude},${pickupLocation.latitude}`,
        `${dropoffLocation.longitude},${dropoffLocation.latitude}`,
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

  async finishRide(payload: FinishRideDto): Promise<Trip> {
    try {
      const { tripId, finalLocation, riderRating, tip } = payload;
      const currentTrip = await this.tripService.getOneByIdOrFail(tripId);
      const paymentGateway = new PaymentGateway();
      const {
        rider: { email },
        pickUpLocation: { coordinates },
      } = currentTrip.request;

      const { distance, duration } = await MapBox.getDirection(`${coordinates[1]},${coordinates[0]}`, `${finalLocation.longitude},${finalLocation.latitude}`);
      const tripFinalFare = calculateFare(distance, duration);
      let ridePropertiesToUpdate: Partial<Trip> = {};

      await this.dataSource.transaction(async manager => {
        const referenceId = generateUuid();

        // Create the transaction in the gateway
        const tokenizedCard = await paymentGateway.tokenizeCard();
        const transactionId = await paymentGateway.createNewTransaction({
          amountInCents: tripFinalFare,
          customerEmail: email,
          reference: referenceId,
          paymentMethod: {
            installments: 1,
            token: tokenizedCard,
            type: 'CARD',
          },
        });

        // Save the payment created for this trip
        const paymentReference = await manager.save<Payment>(
          await this.paymentService.generatePayment({
            id: referenceId,
            fare: tripFinalFare,
            transactionId,
          }),
        );

        // Update the existing trip entity
        ridePropertiesToUpdate = {
          status: TripStatus.COMPLETED,
          finalLocation: {
            type: 'Point',
            coordinates: [finalLocation.latitude, finalLocation.longitude],
          },
          payment: paymentReference,
          endTime: new Date(),
          riderRating,
        };
        await manager.update<Trip>(Trip, { id: currentTrip.id }, ridePropertiesToUpdate);
      });

      return {
        ...currentTrip,
        ...ridePropertiesToUpdate,
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) {
        throw error;
      }

      this.logger.error(error);

      throw new InternalServerErrorException('Something went wrong creating your request, please try again.');
    }
  }
}
