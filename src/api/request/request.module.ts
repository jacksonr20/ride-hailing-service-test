import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Request } from './entities';
import { Driver, Rider, Trip } from './../../database/entities';

import { RequestController } from './controllers';

import { DriverService, RequestService, RiderService, TripService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Request, Driver, Rider, Trip])],
  controllers: [RequestController],
  providers: [RequestService, DriverService, RiderService, TripService],
})
export class RequestModule {}
