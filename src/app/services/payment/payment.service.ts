import { Injectable } from '@angular/core';
import { PaymentModel } from 'src/app/models/PaymentModel';
import { BaseServiceService } from '../base-service.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  actionUrl = 'api/payment/';

  constructor(public service: BaseServiceService) {}

  /**
   * Create Payment
   *
   * @param payload
   * @returns any
   * @memberof PaymentService
   */
  public create(payload: PaymentModel) {
    this.service.setActionUrl(this.actionUrl);
    return this.service.post<any>(payload);
  }
}
