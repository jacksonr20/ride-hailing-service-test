import axios, { AxiosInstance } from 'axios';

import { GenerateTransaction } from './interfaces';
import { InternalServerErrorException, Logger } from '@nestjs/common';

enum GatewayEndpoints {
  CARDS = 'tokens/cards',
  MERCHANTS = 'merchants',
  TRANSACTIONS = 'transactions',
}

export class PaymentGateway {
  private logger = new Logger(PaymentGateway.name);
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: process.env.GATEWAY_BASE_URL,
      headers: {
        Authorization: `Bearer ${process.env.GATEWAY_PUBLIC_KEY}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async generateAcceptanceToken(): Promise<string> {
    try {
      const response = await this.axios.get(`${GatewayEndpoints.MERCHANTS}/${process.env.GATEWAY_PUBLIC_KEY}`);

      return response?.data?.data?.presigned_acceptance?.acceptance_token ?? 'no_token';
    } catch (error) {
      this.logger.error(`Something went wrong generation the acceptance token. Details: ${error?.response?.data?.message ?? error}`);

      throw new InternalServerErrorException('Something went wrong generating the acceptance token for the merchant');
    }
  }

  async tokenizeCard(): Promise<string> {
    try {
      const response = await this.axios.post(GatewayEndpoints.CARDS, {
        number: process.env.TOKENIZE_CARD_NUMBER,
        cvc: process.env.TOKENIZE_CARD_CVC,
        exp_month: process.env.TOKENIZE_CARD_EXP_MONTH,
        exp_year: process.env.TOKENIZE_CARD_EXP_YEAR,
        card_holder: process.env.TOKENIZE_CARD_HOLDER,
      });

      return response?.data?.data?.id ?? 'cannot_create_token';
    } catch (error) {
      this.logger.error(`Something went wrong tokenizing the card. Details: ${error?.response?.data?.message ?? error}`);

      throw new InternalServerErrorException('Something went wrong tokenizing the card');
    }
  }

  async createNewTransaction(payload: GenerateTransaction): Promise<string> {
    try {
      const acceptanceToken = await this.generateAcceptanceToken();
      const response = await this.axios.post(GatewayEndpoints.TRANSACTIONS, {
        acceptance_token: acceptanceToken,
        amount_in_cents: payload.amountInCents * 100,
        currency: 'COP',
        customer_email: payload.customerEmail,
        reference: payload.reference,
        payment_method: payload.paymentMethod,
      });

      return response?.data?.data?.id ?? 'invalid_transaction_id';
    } catch (error) {
      this.logger.error(`Something went wrong tokenizing the card. Details: ${error?.response?.data?.message ?? error}`);

      throw new InternalServerErrorException('Something went wrong creating your payment, please try again!');
    }
  }
}
