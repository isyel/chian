import { Injectable } from '@angular/core';
import { AddressModel } from 'src/app/models/AddressModel';
import { ResultModel } from 'src/app/models/ResultModel';
import { BaseServiceService } from '../base-service.service';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  actionUrl = 'api/address/';

  constructor(public service: BaseServiceService) {}

  /**
   * Create Order
   *
   * @param payload
   * @returns AddressModel
   * @memberof AddressService
   */
  public create(payload: AddressModel) {
    this.service.setActionUrl(this.actionUrl);
    return this.service.post<AddressModel>(payload);
  }

  /**
   * Update Order
   *
   * @param addressId
   * @param payload
   * @returns AddressModel
   * @memberof AddressService
   */
  public update(addressId: string, payload: AddressModel) {
    this.service.setActionUrl(this.actionUrl);
    return this.service.update<any>(addressId, payload);
  }

  /**
   * Get Single Order
   *
   * @param addressId
   * @returns AddressModel
   * @memberof AddressService
   */
  public getOne(addressId: string) {
    this.service.setActionUrl(this.actionUrl);
    return this.service.getById<AddressModel>(addressId);
  }

  /**
   * Get Single Order
   *
   * @param userId
   * @returns ResultModel
   * @memberof AddressService
   */
  public getByUser(userId: string) {
    this.service.setActionUrl(this.actionUrl, 'user/');
    return this.service.getById<ResultModel>(userId);
  }

  /**
   * Delete addreess
   *
   * @param addressId
   * @returns any
   * @memberof AddressService
   */
  public delete(addressId: string) {
    this.service.setActionUrl(this.actionUrl);
    return this.service.delete<any>(addressId);
  }
}
