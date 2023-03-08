import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiCreatedResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';

import { RequestRideDto } from '../dto';
import { Request } from '../../../database/entities/request.entity';

@ApiTags('request')
@Controller('request')
export class RequestController {
  @Post('ride')
  @ApiOperation({ summary: 'Request a ride to generate a trip' })
  @ApiCreatedResponse({ description: 'Ride has been created successfully.', type: Request })
  @ApiBadRequestResponse()
  async ride(@Body() payload: RequestRideDto): Promise<Request> {
    const lol = 'lol' as any;

    return lol;
  }
}
