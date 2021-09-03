/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaystackOptions } from 'angular4-paystack';
import { OrderModel } from '../models/OrderModel';
import { UserModel } from '../models/UserModel';
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
  userDetails: UserModel;
  publicKey = 'pk_test_99174bdc94618967e07f45a39877eb33e54c6545';
  options: PaystackOptions;

  constructor(
    private router: Router,
    private userData: UserData,
    private ordersService: OrdersService,
    public commonMethods: CommonMethods,
    private navParamService: NavparamService
  ) {}

  async ngOnInit() {
    this.userDetails = await this.userData.getUserData();
  }

  ionViewDidEnter() {
    this.order = this.navParamService.navData;
    console.log('this.order at payment: ', this.order);
    this.options = {
      amount: this.order.totalPrice * 100,
      email: this.userDetails.email,
      ref: `${Math.ceil(Math.random() * 10e10)}`,
    };
  }

  paymentInit() {
    console.log('payment initialized');
    this.updateOrder('payWithCard');
  }

  paymentCancel() {
    this.commonMethods.presentToast(
      'Payment Cancelled, continue payment to complete order'
    );
  }

  paymentDone(result) {
    console.log('Payment result: ', result);
    if (result.status === 'success' && result.message === 'Approved') {
      // updateOrder('payWithCard')
    }
  }

  completePayment() {
    this.userData.setPendingOrder(null);
    this.router.navigate(['/success']);
  }

  updateOrder(paymentMethod: string) {
    this.order = {
      ...this.order,
      paymentMethod,
    };
    this.commonMethods.presentLoading();
    this.ordersService.update(this.order._id, this.order).subscribe(
      (result) => {
        this.commonMethods.dismissLoader();
        this.order = result.data;
        if (paymentMethod === 'payOnDelivery') {
          this.completePayment();
        }
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
