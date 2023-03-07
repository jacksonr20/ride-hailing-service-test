import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

// Entities
import { Base } from './base.entity';
import { Trip } from './trip.entity';
import { PaymentMethod } from './payment-method.entity';

// Enums
import { PaymentStatus } from './../../api/commons';

@Entity('payments')
export class Payment extends Base {
  @OneToOne(() => Trip, trip => trip.payment, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'trip_id',
  })
  trip: Trip;

  @ManyToOne(() => PaymentMethod, paymentMethod => paymentMethod.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'payment_method_id' })
  paymentMethod: PaymentMethod;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  fare: number;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  tip?: number;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
  })
  status: PaymentStatus;
}
