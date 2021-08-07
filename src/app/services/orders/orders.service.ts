import { Injectable } from '@angular/core';
import { OrderModel } from 'src/app/models/OrderModel';
import { ResultModel } from 'src/app/models/ResultModel';
import { BaseServiceService } from '../base-service.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  actionUrl = 'orders/';

  constructor(public service: BaseServiceService) {}

  /**
   * Create Order
   *
   * @param payload
   * @returns OrderModel
   * @memberof OrdersService
   */
  public create(payload: OrderModel) {
    this.service.setActionUrl(this.actionUrl);
    return this.service.post<any>(payload);
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
  public getOne(orderId: number) {
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
  public getHistory(userId: number) {
    this.service.setActionUrl(this.actionUrl);
    return this.service.getById<ResultModel>(userId);
  }

  /**
   * Get Pending Order
   *
   * @param userId
   * @returns OrderModel
   * @memberof OrdersService
   */
  public getPending(userId: number) {
    this.service.setActionUrl(this.actionUrl, 'pending/');
    return this.service.getById<OrderModel>(userId);
  }

  /**
   * Get User Order History
   *
   * @param orderId
   * @returns any
   * @memberof OrdersService
   */
  public delete(orderId: number) {
    this.service.setActionUrl(this.actionUrl);
    return this.service.delete<any>(orderId);
  }
}
