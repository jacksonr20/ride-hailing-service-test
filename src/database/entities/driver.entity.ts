import { Entity, Column, OneToMany } from 'typeorm';

import { Rider } from './rider.entity';
import { Car } from './car.entity';

@Entity('drivers')
export class Driver extends Rider {
  @Column({
    name: 'joined_date',
    nullable: true,
  })
  joinedDate?: Date;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  dni?: string;

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_banned',
  })
  isBanned?: boolean;

  @OneToMany(() => Car, car => car.driver, { nullable: true, eager: true })
  cars: Car[];
}
