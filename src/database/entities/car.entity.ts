import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { Base } from './base.entity';
import { Driver } from './driver.entity';
import { Trip } from './trip.entity';

@Entity('cars')
export class Car extends Base {
  @ApiProperty({
    description: 'License Plate',
    type: String,
  })
  @Column({
    type: 'varchar',
    length: 100,
    name: 'license_plate',
  })
  licensePlate: string;

  @ApiProperty({
    description: 'Model',
    type: String,
  })
  @Column({
    type: 'varchar',
    length: 100,
  })
  model: string;

  @ApiProperty({
    description: 'Year',
    type: Number,
    required: false,
  })
  @Column({
    type: 'integer',
    nullable: true,
  })
  year?: number;

  @ApiProperty({
    description: 'Capacity',
    type: Number,
    required: false,
  })
  @Column({
    type: 'smallint',
    nullable: true,
  })
  capacity?: number;

  @ApiProperty({
    description: 'Color',
    type: String,
    required: false,
  })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  color?: string;

  @ManyToOne(() => Driver, driver => driver.cars, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;

  @OneToMany(() => Trip, trip => trip.car, { onDelete: 'CASCADE', eager: true })
  trips: Trip[];
}
