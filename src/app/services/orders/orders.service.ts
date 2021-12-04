import { Injectable } from '@angular/core';
import {
  OrderModel,
  OrderModelPayload,
  ShippingPayloadModel,
} from 'src/app/models/OrderModel';
import { ResultModel } from 'src/app/models/ResultModel';
import { BaseServiceService } from '../base-service.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  actionUrl = 'api/orders/';
  shippingUrl = 'api/shipping/';

  constructor(public service: BaseServiceService) {}

  /**
   * Create Order
   *
   * @param payload
   * @returns OrderModel
   * @memberof OrdersService
   */
  public create(payload: OrderModelPayload) {
    this.service.setActionUrl(this.actionUrl);
    return this.service.post<any>(payload);
  }

  /**
   * Update Order
   *
   * @param orderId
   * @param payload
   * @returns OrderModel
   * @memberof OrdersService
   */
  public update(orderId: string, payload: OrderModelPayload) {
    this.service.setActionUrl(this.actionUrl);
    return this.service.update<any>(orderId, payload);
  }

  /**
   * Get All Orders
   *
   * @returns ResultModel
   * @memberof OrdersService
   */
  public getAll() {
    this.service.setActionUrl(this.actionUrl);
    return this.service.getAllPaginate<ResultModel>();
  }

  /**
   * Get Single Order
   *
   * @param orderId
   * @returns OrderModel
   * @memberof OrdersService
   */
  public getOne(orderId: string) {
    this.service.setActionUrl(this.actionUrl);
    return this.service.getById<OrderModel>(orderId);
  }

  /**
   * Get User Order History
   *
   * @param userId
   * @returns ResultModel
   * @memberof OrdersService
   */
  public getHistory(userId: string) {
    this.service.setActionUrl(this.actionUrl, 'user/');
    return this.service.getById<ResultModel>(userId);
  }

  /**
   * Create Shipping Details
   *
   * @param payload
   * @returns OrderModel
   * @memberof OrdersService
   */
  public createShipping(payload: ShippingPayloadModel) {
    this.service.setActionUrl(this.shippingUrl);
    return this.service.post<any>(payload);
  }

  /**
   * Delete Order
   *
   * @param orderId
   * @returns any
   * @memberof OrdersService
   */
  public delete(orderId: string) {
    this.service.setActionUrl(this.actionUrl);
    return this.service.delete<any>(orderId);
  }
}
