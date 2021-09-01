import { Component, OnInit } from '@angular/core';
import { OrderStatusEnum } from '../models/enums/OrderStatusEnum';
import { OrderModel } from '../models/OrderModel';
import { NavparamService } from '../services/navparam/navparam.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
  orderDetails: OrderModel;

  constructor(private navParamService: NavparamService) {}

  ngOnInit() {
    this.orderDetails = this.navParamService.navData || {};
  }

  getActiveIcon(defaultValue: number) {
    return OrderStatusEnum[this.orderDetails.orderStatus] > defaultValue
      ? 'icon-active'
      : OrderStatusEnum[this.orderDetails.orderStatus] === defaultValue
      ? 'icon-outline'
      : 'icon-disabled';
  }
}
