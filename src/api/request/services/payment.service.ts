import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Payment } from '../../../database/entities';
import { PaymentStatus } from './../../commons/enums';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async generatePayment(fare: number, tip = 0, persist = false): Promise<Payment> {
    const payment = new Payment();

    payment.fare = fare;
    payment.tip = tip;
    payment.status = PaymentStatus.PENDING;

    if (persist) {
      await this.paymentRepository.save(payment);
    }

    return payment;
  }
}
