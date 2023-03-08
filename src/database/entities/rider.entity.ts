import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, OneToMany } from 'typeorm';
import { Expose } from 'class-transformer';

import { Base } from './base.entity';
import { PaymentMethod } from './payment-method.entity';
import { Request } from '../../api/request/entities';

@Entity('riders')
export class Rider extends Base {
  @ApiProperty({
    description: 'First Name',
    type: String,
  })
  @Column({
    type: 'varchar',
    length: 150,
    name: 'first_name',
  })
  firstName: string;

  @ApiProperty({
    description: 'Last Name',
    type: String,
    required: false,
  })
  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
    name: 'last_name',
  })
  lastName?: string;

  @ApiProperty({
    description: 'Email',
    type: String,
  })
  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @ApiProperty({
    description: 'Phone Number',
    type: String,
    required: false,
  })
  @Column({
    length: 250,
    name: 'phone_number',
    nullable: true,
    type: 'varchar',
  })
  phoneNumber?: string;

  @ApiProperty({
    description: 'Rating',
    type: Number,
    required: false,
  })
  @Column({
    nullable: true,
    type: 'smallint',
  })
  rating?: number;

  @OneToMany(() => PaymentMethod, paymentMethod => paymentMethod.rider, { nullable: true, eager: true })
  paymentMethods: PaymentMethod[];

  @OneToMany(() => Request, request => request.rider, { nullable: true, eager: true })
  requests: Request[];

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
