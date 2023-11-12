import { Account } from "@prisma/client";

type PaymentsServiceApiResponse = {
  wasSuccess: boolean,
  api_statusCode: boolean,
  response: any;
  stripe_response: any;
}

export interface ApiList {
  paymentsService: {
    createPurchase<T extends any = any, R extends PaymentsServiceApiResponse, CC extends number, CVC extends number>(
      creditCard: CC, 
      code: CVC, 
      productId: string, storeId: string
    ): Promise<R>;
    refundPurchase<T extends any = any, R extends PaymentsServiceApiResponse, UID extends string, PaymentToken extends string>(
      userId: UID,
      paymentToken: PaymentToken
    ): Promise<R>;
  }
}

export class Api<List extends ApiList> {
  paymentsService: List['paymentsService'];
}