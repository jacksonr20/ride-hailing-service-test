import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

// Entities
import { Base } from './base.entity';
import { Location } from './location.entity';
import { Rider } from './rider.entity';

// Enums
import { RequestStatus } from './../../api/commons';
import { Trip } from './trip.entity';

@Entity('requests')
export class Request extends Base {
  @ApiProperty({
    description: 'Pickup location',
    type: () => Location,
  })
  @OneToOne(() => Location, location => location.requestPickUpLocation, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'pickup_location_id',
  })
  pickUpLocation: Location;

  @ApiProperty({
    description: 'Dropoff location',
    type: () => Location,
  })
  @OneToOne(() => Location, location => location.requestDropOffLocation, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'dropoff_location_id',
  })
  dropOffLocation: Location;

  @ApiProperty({
    description: 'Trip Details',
    type: () => Trip,
  })
  @OneToOne(() => Trip, trip => trip.request)
  trip: Trip;

  @ApiProperty({
    description: 'Rider Details',
    type: () => Rider,
  })
  @ManyToOne(() => Rider, rider => rider.requests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'rider_id' })
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
  estimatedFare: number;

  @ApiProperty({
    description: 'Request Surge',
    type: Number,
  })
  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  surge: number;

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
