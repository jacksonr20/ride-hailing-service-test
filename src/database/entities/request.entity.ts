import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

// Entities
import { Base } from './base.entity';
import { Location } from './location.entity';
import { Rider } from './rider.entity';

// Enums
import { RequestStatus } from './../../api/commons';

@Entity('requests')
export class Request extends Base {
  @OneToOne(() => Location, location => location.requestPickUpLocation, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'pickup_location',
  })
  pickUpLocation: Location;

  @OneToOne(() => Location, location => location.requestDropOffLocation, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'dropoff_location',
  })
  dropOffLocation: Location;

  @ManyToOne(() => Rider, rider => rider.requests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'rider_id' })
  rider: Rider;

  @Column({
    type: 'numeric',
    name: 'estimated_fare',
    precision: 10,
    scale: 2,
  })
  estimatedFare: number;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  surge: number;

  @Column({
    type: 'enum',
    enum: RequestStatus,
    default: RequestStatus.WAITING,
  })
  status: RequestStatus;
}
