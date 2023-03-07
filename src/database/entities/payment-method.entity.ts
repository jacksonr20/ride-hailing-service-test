import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { Base } from './base.entity';
import { CardType, PaymentMethod as Method } from '../../api/commons';
import { Rider } from './rider.entity';

@Entity('payment_methods')
export class PaymentMethod extends Base {
  @Column({
    type: 'enum',
    enum: Method,
  })
  method: Method;

  @Column({
    type: 'varchar',
    name: 'card_holder_name',
    nullable: true,
  })
  cardHolderName?: string;

  @Column({
    enum: CardType,
    type: 'enum',
    name: 'card_type',
    nullable: true,
  })
  cardType?: CardType;

  @Column({
    type: 'date',
    name: 'card_expiration_date',
    nullable: true,
  })
  cardExpirationDate?: Date;

  @ManyToOne(() => Rider, rider => rider.paymentMethods, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'rider_id' })
  rider: Rider;
}
