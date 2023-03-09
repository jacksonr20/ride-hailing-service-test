import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Payment } from '../../../database/entities';
import { PaymentMethod, PaymentStatus } from './../../commons/enums';
import { generateUuid } from './../../commons/helpers';
import { GeneratePaymentReference } from './../interfaces';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async generatePayment(payload: GeneratePaymentReference): Promise<Payment> {
    const payment = new Payment();
    const { fare, id = generateUuid(), tip = 0, persist = false, transactionId = id } = payload;

    payment.id = id;
    payment.fare = fare;
    payment.tip = tip;
    payment.status = PaymentStatus.PENDING;
    payment.paymentMethodType = PaymentMethod.CREDIT_CARD;
    payment.transactionId = transactionId;

    if (persist) {
      await this.paymentRepository.save(payment);
    }

    return payment;
  }
}
