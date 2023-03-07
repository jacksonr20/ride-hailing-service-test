import { Entity, Column } from 'typeorm';

import { Base } from '../../common';

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
}
