import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OptionsModel } from 'src/app/models/OptionsModel';
import { OrderModel } from 'src/app/models/OrderModel';
import { BaseServiceService } from '../base-service.service';

@Injectable({
  providedIn: 'root',
})
export class OptionsService {
  actionUrl = 'api/orders/options/';

  constructor(
    public service: BaseServiceService,
    private httpClient: HttpClient
  ) {}

  /**
   * Get Options
   *
   * @returns OptionsModel[]
   * @memberof OptionsService
   */
  public getAll() {
    this.service.setActionUrl(this.actionUrl);
    return this.service.getAll<any>();
  }

  /**
   * Create States
   *
   * @returns OptionsModel[]
   * @memberof OptionsService
   */
  public getStates() {
    return this.httpClient.get<any>('assets/data/states.json');
  }
}
