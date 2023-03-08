import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

// Entities
import { Base } from './base.entity';
import { Car } from './car.entity';
import { Driver } from './driver.entity';
import { Location } from './location.entity';
import { Payment } from './payment.entity';
import { Request } from '../../api/request/entities';

// Enums
import { TripStatus } from './../../api/commons';

@Entity('trips')
export class Trip extends Base {
  @OneToOne(() => Request, request => request.trip, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'request_id',
  })
  request: Request;

  @ApiProperty({
    description: 'Trip Started At',
    type: Date,
  })
  @Column({
    type: 'timestamptz',
    name: 'start_time',
  })
  startTime: Date;

  @ApiProperty({
    description: 'Trip Ended At',
    type: Date,
    required: false,
  })
  @Column({
    type: 'timestamptz',
    name: 'end_time',
    nullable: true,
  })
  endTime?: Date;

  @ApiProperty({
    description: 'Trip Final Location',
    type: () => Location,
    required: false,
  })
  @OneToOne(() => Location, location => location.finalLocation, { nullable: true })
  @JoinColumn({
    name: 'final_location_id',
  })
  finalLocation?: Location;

  @ApiProperty({
    description: 'Trip Driver',
    type: () => Driver,
  })
  @ManyToOne(() => Driver, driver => driver.trips)
  @JoinColumn({
    name: 'driver_id',
  })
  driver: Driver;

  @ApiProperty({
    description: 'Car Used to Complete the Trip',
    type: () => Car,
  })
  @ManyToOne(() => Car, car => car.trips)
  @JoinColumn({
    name: 'car_id',
  })
  car: Car;

  @ApiProperty({
    description: 'Rider Rating per Trip',
    required: false,
    type: Number,
  })
  @Column({
    nullable: true,
    type: 'smallint',
    name: 'rider_rating',
  })
  riderRating?: number;

  @ApiProperty({
    description: 'Rider Rating per Trip',
    required: false,
    type: Number,
  })
  @Column({
    nullable: true,
    type: 'smallint',
    name: 'driver_rating',
  })
  driverRating?: number;

  @ApiProperty({
    description: 'Trip Status',
    enum: TripStatus,
    example: Object.keys(TripStatus),
  })
  @Column({
    type: 'enum',
    enum: TripStatus,
    default: TripStatus.IN_PROGRESS,
  })
  status: TripStatus;

  @ApiProperty({
    description: 'Trip Payment',
    type: () => Payment,
  })
  @OneToOne(() => Payment, payment => payment.trip, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'payment_id',
  })
  payment: Payment;
}
