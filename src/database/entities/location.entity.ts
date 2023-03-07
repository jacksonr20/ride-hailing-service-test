import { Entity, Column, OneToOne } from 'typeorm';

import { Base } from './base.entity';
import { Request } from './request.entity';
import { Trip } from './trip.entity';

@Entity()
export class Location extends Base {
  @Column({
    type: 'varchar',
  })
  latitude: string;

  @Column({
    type: 'varchar',
  })
  longitude: string;

  @Column({
    length: 150,
    name: 'zip_code',
    nullable: true,
    type: 'varchar',
  })
  zipCode?: string;

  @OneToOne(() => Request, request => request.pickUpLocation)
  requestPickUpLocation: Request;

  @OneToOne(() => Request, request => request.dropOffLocation)
  requestDropOffLocation: Request;

  @OneToOne(() => Trip, trip => trip.finalLocation)
  finalLocation: Trip;
}
