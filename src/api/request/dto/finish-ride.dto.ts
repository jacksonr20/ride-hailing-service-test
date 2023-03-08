import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmptyObject, IsNumber, IsOptional, IsUUID, Max, Min, ValidateNested } from 'class-validator';
import { LocationDto } from './request-ride.dto';
import { Type } from 'class-transformer';

export class FinishRideDto {
  @ApiProperty({
    description: 'Trip ID',
    example: 'A378F7E1-94AD-432E-9DB1-41BADDBDAE8F',
    type: 'string',
    required: true,
  })
  @IsUUID('4', { message: 'Trip ID must be a valid UUID' })
  readonly tripId: string;

  @ApiProperty({
    description: 'Rider Pickup Location',
    required: true,
  })
  @ValidateNested()
  @Type(() => LocationDto)
  @IsDefined()
  @IsNotEmptyObject()
  readonly finalLocation: LocationDto;

  @ApiProperty({
    description: 'Rider Rating',
    type: 'number',
    example: '5',
    required: false,
  })
  @IsNumber(
    {},
    {
      message: 'Rider Rating should be a number',
    },
  )
  @IsOptional()
  @Min(0, {
    message: 'Rider Rating should be greater than or equal to 0',
  })
  @Max(10, {
    message: 'Rider Rating should be less than or equal to 10',
  })
  readonly riderRating?: number;
}
