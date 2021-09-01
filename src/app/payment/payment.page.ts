import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderModel } from '../models/OrderModel';
import { NavparamService } from '../services/navparam/navparam.service';
import { OrdersService } from '../services/orders/orders.service';
import { UserData } from '../user-data';
import { CommonMethods } from '../util/common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  order: OrderModel;

  constructor(
    private router: Router,
    private userData: UserData,
    private ordersService: OrdersService,
    public commonMethods: CommonMethods,
    private navParamService: NavparamService
  ) {}

  ngOnInit() {
    this.order = this.navParamService.navData;
    console.log('this.order at payment: ', this.order);
  }

  completePayment() {
    this.userData.setPendingOrder(null);
    this.router.navigate(['/success']);
  }

  placeOrder(paymentMethod: string) {
    this.order = {
      ...this.order,
      paymentMethod,
    };
    this.commonMethods.presentLoading();
    this.ordersService.create(this.order).subscribe(
      (result) => {
        this.commonMethods.dismissLoader();
        this.commonMethods.presentToast('Order Placed, Continue to payment');
        this.completePayment();
      },
      (error) => {
        console.error(error);
        this.commonMethods.presentToast(
          error.message || 'Network or Server Error',
          false
        );
        this.commonMethods.dismissLoader();
      }
    );
  }
}
