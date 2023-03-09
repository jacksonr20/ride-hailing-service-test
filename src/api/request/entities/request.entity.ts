import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne, OneToOne, JoinColumn, Point } from 'typeorm';
import { Transform } from 'class-transformer';

// Entities
import { Base, Rider, Trip } from '../../../database/entities';

// Enums
import { RequestStatus, transformFareToCurrency } from './../../commons';

@Entity('requests')
export class Request extends Base {
  @ApiProperty({
    description: 'Pickup location',
  })
  @Column('geometry', {
    name: 'pickup_location',
  })
  @Transform(({ value }) => value.coordinates)
  pickUpLocation: Point;

  @ApiProperty({
    description: 'Pickup location',
  })
  @Column('geometry', {
    name: 'dropoff_location',
  })
  @Transform(({ value }) => value.coordinates)
  dropOffLocation: Point;

  @ApiProperty({
    description: 'Trip Details',
    type: Trip,
  })
  @OneToOne(() => Trip, trip => trip.request)
  @Transform(({ value }) => ({
    startTime: value?.startTime,
    endTime: value?.startTime,
    finalLocation: value?.finalLocation?.coordinates,
  }))
  trip: Trip;

  @ApiProperty({
    description: 'Rider Details',
    type: Rider,
  })
  @ManyToOne(() => Rider, rider => rider.requests, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'rider_id' })
  @Transform(({ value }) => value.fullName)
  rider: Rider;

  @ApiProperty({
    description: 'Request Estimated Fare',
    type: Number,
  })
  @Column({
    type: 'numeric',
    name: 'estimated_fare',
    precision: 10,
    scale: 2,
  })
  @Transform(({ value }) => transformFareToCurrency(value))
  estimatedFare: number;

  @ApiProperty({
    description: 'Request Status',
    enum: RequestStatus,
    example: Object.values(RequestStatus),
  })
  @Column({
    type: 'enum',
    enum: RequestStatus,
    default: RequestStatus.WAITING,
  })
  status: RequestStatus;
}
