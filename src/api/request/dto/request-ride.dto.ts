import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNotEmptyObject, IsNumber, IsUUID, Max, Min, ValidateNested, IsOptional, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class LocationDto {
  @ApiProperty({
    description: 'Latitude',
    type: 'number',
    example: '23.6573',
    required: true,
  })
  @IsNumber(
    {},
    {
      message: 'Latitude should be a number',
    },
  )
  @IsNotEmpty({
    message: 'Latitude is required',
  })
  @Min(-90, {
    message: 'Latitude should be greater than or equal to -90',
  })
  @Max(90, {
    message: 'Latitude should be less than or equal to 90',
  })
  readonly latitude: number;

  @ApiProperty({
    description: 'Longitude',
    type: 'number',
    example: '77.6573',
    required: true,
  })
  @IsNumber(
    {},
    {
      message: 'Longitude should be a number',
    },
  )
  @IsNotEmpty({
    message: 'Longitude is required',
  })
  @Min(-180, {
    message: 'Longitude should be greater than or equal to -180',
  })
  @Max(180, {
    message: 'Longitude should be less than or equal to 180',
  })
  readonly longitude: number;

  @ApiProperty({
    description: 'Location Zip Code',
    example: '401821',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @Length(2, 6, {
    message: 'Zip Code should be less than or equal to 6',
  })
  readonly zipCode: string;
}

export class RequestRideDto {
  @ApiProperty({
    description: 'Rider Pickup Location',
    required: true,
  })
  @ValidateNested()
  @Type(() => LocationDto)
  @IsDefined()
  @IsNotEmptyObject()
  readonly pickupLocation: LocationDto;

  @ApiProperty({
    description: 'Rider Dropoff Location',
    required: true,
  })
  @ValidateNested()
  @Type(() => LocationDto)
  @IsDefined()
  @IsNotEmptyObject()
  readonly dropoffLocation: LocationDto;

  @ApiProperty({
    description: 'Rider ID',
    example: 'A378F7E1-94AD-432E-9DB1-41BADDBDAE8F',
    type: 'string',
    required: true,
  })
  @IsUUID('4', { message: 'Rider ID must be a valid UUID' })
  readonly riderId: string;
}
