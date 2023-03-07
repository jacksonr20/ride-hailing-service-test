import { Entity, Column, OneToMany } from 'typeorm';

import { Base } from './base.entity';
import { PaymentMethod } from './payment-method.entity';
import { Request } from './request.entity';

@Entity('riders')
export class Rider extends Base {
  @Column({
    type: 'varchar',
    length: 150,
    name: 'first_name',
  })
  firstName: string;

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

  @OneToMany(() => PaymentMethod, paymentMethod => paymentMethod.rider, { nullable: true, eager: true })
  paymentMethods: PaymentMethod[];

  @OneToMany(() => Request, request => request.rider, { nullable: true, eager: true })
  requests: Request[];
}
