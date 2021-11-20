import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OptionsModel } from 'src/app/models/OptionsModel';
import { OrderModel } from 'src/app/models/OrderModel';
import { ResultModel } from 'src/app/models/ResultModel';
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
    return this.service.getAll<ResultModel>();
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
