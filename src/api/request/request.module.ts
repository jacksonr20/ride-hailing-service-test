import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Request } from './entities';
import { Driver, Payment, Rider, Trip } from './../../database/entities';

import { RequestController } from './controllers';

import { DriverService, PaymentService, RequestService, RiderService, TripService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Driver, Payment, Request, Rider, Trip])],
  controllers: [RequestController],
  providers: [DriverService, PaymentService, RequestService, RiderService, TripService],
})
export class RequestModule {}
