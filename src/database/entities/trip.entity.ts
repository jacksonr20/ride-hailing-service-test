import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

// Entities
import { Base } from './base.entity';
import { Car } from './car.entity';
import { Driver } from './driver.entity';
import { Location } from './location.entity';
import { Payment } from './payment.entity';
import { Request } from './request.entity';

// Enums
import { TripStatus } from './../../api/commons';

@Entity('trips')
export class Trip extends Base {
  @OneToOne(() => Request, request => request.trip, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'request_id',
  })
  request: Request;

  @Column({
    type: 'timestamptz',
    name: 'start_time',
  })
  startTime: Date;

  @Column({
    type: 'timestamptz',
    name: 'end_time',
    nullable: true,
  })
  endTime?: Date;

  @OneToOne(() => Location, location => location.finalLocation, { nullable: true })
  @JoinColumn({
    name: 'final_location',
  })
  finalLocation?: Location;

  @ManyToOne(() => Driver, driver => driver.trips)
  @JoinColumn({
    name: 'driver_id',
  })
  driver: Driver;

  @ManyToOne(() => Car, car => car.trips)
  @JoinColumn({
    name: 'car_id',
  })
  carId: Car;

  @Column({
    nullable: true,
    type: 'smallint',
    name: 'rider_rating',
  })
  riderRating?: number;

  @Column({
    nullable: true,
    type: 'smallint',
    name: 'driver_rating',
  })
  driverRating?: number;

  @Column({
    type: 'enum',
    enum: TripStatus,
    default: TripStatus.IN_PROGRESS,
  })
  status: TripStatus;

  @OneToOne(() => Payment, payment => payment.trip)
  payment: Payment;
}
