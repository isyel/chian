/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaystackOptions } from 'angular4-paystack';
import { OrderModel } from '../models/OrderModel';
import { PaymentModel } from '../models/PaymentModel';
import { AuthDataModel, UserModel } from '../models/UserModel';
import { NavparamService } from '../services/navparam/navparam.service';
import { OrdersService } from '../services/orders/orders.service';
import { PaymentService } from '../services/payment/payment.service';
import { UserData } from '../user-data';
import { CommonMethods } from '../util/common';

type PaystackRefModel = {
  status: string;
  message: string;
  reference: any;
  transaction: any;
};

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
  payment: PaymentModel;
  authData: AuthDataModel;

  constructor(
    private router: Router,
    private userData: UserData,
    private ordersService: OrdersService,
    public commonMethods: CommonMethods,
    private navParamService: NavparamService,
    private paymentService: PaymentService
  ) {}

  async ngOnInit() {
    this.userDetails = await this.userData.getUserData();
    if (!this.userDetails) {
      this.authData = await this.userData.getAuthorizationData();
    }
  }

  ionViewDidEnter() {
    this.order = this.navParamService.navData;
    this.options = {
      amount: this.order?.totalPrice * 100,
      email:
        this.userDetails?.email ||
        this.authData?.userDetails?.email ||
        this.authData?.email,
      ref: `${this.order?._id}-${Math.ceil(Math.random() * 1000)}`,
    };
  }

  paymentInit() {
    this.updateOrder('payWithCard');
  }

  paymentCancel() {
    this.commonMethods.presentToast(
      'Payment Cancelled, continue payment to complete order'
    );
  }

  paymentDone(result: PaystackRefModel | any) {
    console.log('Payment result: ', result);
    this.payment = {
      userId:
        this.userDetails?._id ||
        this.authData?.userDetails?.userId ||
        this.authData?.userId,
      orderId: this.order?._id,
      reference: result.reference,
      transactionId: result.transaction,
      amount: this.order?.totalPrice,
      paymentChannel: 'Paystack',
      paymentMethod: 'card',
      fromAdmin: false,
    };
    if (result.status === 'success' && result.message === 'Approved') {
      this.payment = { ...this.payment, paymentStatus: result.status };
      this.userData.setPendingOrder(null);
    } else {
      this.payment = { ...this.payment, paymentStatus: 'pending' };
    }
    this.makePayment();
  }

  makePayment() {
    this.commonMethods.presentLoading();
    this.paymentService.create(this.payment).subscribe(
      (result) => {
        if (result.status) {
          this.completePayment();
        }
        this.commonMethods.dismissLoader();
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

  completePayment() {
    this.userData.setPendingOrder(null);
    this.router.navigate(['/success']);
  }

  updateOrder(paymentType: string) {
    this.order = {
      ...this.order,
      paymentType,
    };

    this.ordersService.update(this.order?._id, this.order).subscribe(
      (result) => {
        this.order = result.data;
        if (paymentType === 'payOnDelivery') {
          this.userData.setPendingOrder(null);
          this.completePayment();
        }
      },
      (error) => {
        console.error(error);
        this.commonMethods.presentToast(
          error.message || 'Network or Server Error',
          false
        );
      }
    );
  }
}
