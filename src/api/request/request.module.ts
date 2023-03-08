import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Request } from './entities';
import { Driver, Rider } from './../../database/entities';

import { RequestController } from './controllers';

import { DriverService, RequestService, RiderService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Request, Driver, Rider])],
  controllers: [RequestController],
  providers: [RequestService, DriverService, RiderService],
})
export class RequestModule {}
