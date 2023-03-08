import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiCreatedResponse, ApiTags, ApiBadRequestResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';

import { Request } from '../entities';
import { FinishRideDto, RequestRideDto } from '../dto';
import { RequestService } from './../services';
import { RequestStatus } from './../../commons/enums';
import { Trip } from './../../../database/entities/trip.entity';

@ApiTags('request')
@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post('ride')
  @ApiOperation({
    summary: 'Request a ride to generate a trip',
  })
  @ApiCreatedResponse({
    description: 'Ride has been created successfully.',
    schema: {
      example: {
        pickUpLocation: [-75.604705, 6.158212],
        dropOffLocation: [-75.590211, 6.2567865],
        rider: 'John Doe',
        estimatedFare: '$ 23.540,00',
        updateAt: '2023-03-08T19:35:32.441Z',
        deletedAt: null,
        id: 'fdef43a2-aea4-4d05-b584-31a46e86ee63',
        createdAt: '2023-03-08T19:35:32.441Z',
        status: RequestStatus,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Something went wrong with your input!',
    schema: {
      example: {
        statusCode: 400,
        message: ['The specific validation message'],
        error: 'Bad Request',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'The resource you are looking for does not exists!',
    schema: {
      example: {
        statusCode: 404,
        message: 'The entity you are looking for does not exists!',
        error: 'Not Found',
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong with your request, please try again!',
    schema: {
      example: {
        statusCode: 500,
        message: 'Something went wrong with your request, please try again!',
        error: 'Server error',
      },
    },
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async ride(@Body() payload: RequestRideDto): Promise<Request> {
    const newRide = await this.requestService.startRide(payload);

    return newRide;
  }

  @Post('finish-ride')
  @ApiOperation({
    summary: 'Driver request to finish a ride',
  })
  @ApiCreatedResponse({
    description: 'Ride has been finished and you have a new charge.',
    schema: {
      example: {
        pickUpLocation: [-75.604705, 6.158212],
        dropOffLocation: [-75.590211, 6.2567865],
        rider: 'John Doe',
        estimatedFare: '$ 23.540,00',
        updateAt: '2023-03-08T19:35:32.441Z',
        deletedAt: null,
        id: 'fdef43a2-aea4-4d05-b584-31a46e86ee63',
        createdAt: '2023-03-08T19:35:32.441Z',
        status: RequestStatus,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Something went wrong with your input!',
    schema: {
      example: {
        statusCode: 400,
        message: ['The specific validation message'],
        error: 'Bad Request',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'The resource you are looking for does not exists!',
    schema: {
      example: {
        statusCode: 404,
        message: 'The entity you are looking for does not exists!',
        error: 'Not Found',
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong with your request, please try again!',
    schema: {
      example: {
        statusCode: 500,
        message: 'Something went wrong with your request, please try again!',
        error: 'Server error',
      },
    },
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async finishRide(@Body() payload: FinishRideDto): Promise<Trip> {
    const finishRide = await this.requestService.finishRide(payload);

    return finishRide;
  }
}
