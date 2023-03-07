import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { Base } from './base.entity';
import { Driver } from './driver.entity';

@Entity('cars')
export class Car extends Base {
  @Column({
    type: 'varchar',
    length: 100,
    name: 'license_plate',
  })
  licensePlate: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  model: string;

  @Column({
    type: 'integer',
    nullable: true,
  })
  year?: number;

  @Column({
    type: 'smallint',
    nullable: true,
  })
  capacity?: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  color?: string;

  @ManyToOne(() => Driver, driver => driver.cars, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;
}
