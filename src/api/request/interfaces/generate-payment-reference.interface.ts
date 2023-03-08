export interface GeneratePaymentReference {
  fare: number;
  id?: string;
  persist?: boolean;
  tip?: number;
  transactionId?: string;
}
