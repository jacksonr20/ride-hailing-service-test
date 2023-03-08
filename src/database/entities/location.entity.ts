import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, OneToOne } from 'typeorm';

import { Base } from './base.entity';
import { Trip } from './trip.entity';
import { Request } from '../../api/request/entities';

@Entity()
export class Location extends Base {
  @ApiProperty({
    description: 'Location Latitude',
  })
  @Column({
    type: 'varchar',
  })
  latitude: string;

  @ApiProperty({
    description: 'Location Longitude',
  })
  @Column({
    type: 'varchar',
  })
  longitude: string;

  @ApiProperty({
    description: 'Location Zip Code',
  })
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
