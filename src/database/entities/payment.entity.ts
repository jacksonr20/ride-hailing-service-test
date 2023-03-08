import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, OneToOne } from 'typeorm';

// Entities
import { Base } from './base.entity';
import { Trip } from './trip.entity';

// Enums
import { PaymentStatus } from './../../api/commons';

@Entity('payments')
export class Payment extends Base {
  @OneToOne(() => Trip, trip => trip.payment)
  trip: Trip;

  @ApiProperty({
    description: 'Trip Fare',
  })
  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  fare: number;

  @ApiProperty({
    description: 'Trip Tip',
    required: false,
  })
  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  tip?: number;

  @ApiProperty({
    description: 'Trip Status',
    enum: PaymentStatus,
    example: Object.values(PaymentStatus),
  })
  @Column({
    type: 'enum',
    enum: PaymentStatus,
  })
  status: PaymentStatus;
}
