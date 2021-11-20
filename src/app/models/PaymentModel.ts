export type PaymentModel = {
  userId: string;
  orderId: string;
  reference: string;
  amount: number;
  transactionId?: string;
  paymentMethod?: string;
  paymentChannel: string;
  paymentStatus?: string;
  fromAdmin?: false;
};
