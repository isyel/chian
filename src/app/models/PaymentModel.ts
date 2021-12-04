export type PaymentModel = {
  userId: string;
  orderId: string;
  shippingId?: string;
  reference?: string;
  amount: number;
  paymentMethod?: string;
  paymentChannel?: string;
  paymentStatus?: string;
  fromAdmin?: false;
};
