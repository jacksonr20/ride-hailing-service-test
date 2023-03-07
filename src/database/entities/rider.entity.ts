import { Entity, Column } from 'typeorm';

import { Base } from './base.entity';

@Entity('riders')
export class Rider extends Base {
  @Column({
    type: 'varchar',
    length: 150,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
    name: 'last_name',
  })
  lastName?: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    length: 250,
    name: 'phone_number',
    nullable: true,
    type: 'varchar',
  })
  phoneNumber?: string;

  @Column({
    nullable: true,
    type: 'smallint',
  })
  rating?: number;
}
