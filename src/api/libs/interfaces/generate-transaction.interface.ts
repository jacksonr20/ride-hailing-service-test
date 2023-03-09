interface PaymentMethod {
  type: 'CARD' | 'NEQUI';
  installments: number;
  token: string;
}

export interface GenerateTransaction {
  amountInCents: number;
  customerEmail: string;
  paymentMethod: PaymentMethod;
  redirectUrl?: string;
  reference: string;
}
