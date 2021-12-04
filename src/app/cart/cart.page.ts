/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderModel } from '../models/OrderModel';
import { AuthDataModel, UserModel } from '../models/UserModel';
import { OrdersService } from '../services/orders/orders.service';
import { UserData } from '../user-data';
import { CommonMethods } from '../util/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  userProfileData: UserModel;
  authData: AuthDataModel;
  pendingOrder: OrderModel;

  constructor(
    private router: Router,
    private userData: UserData,
    private commonMethods: CommonMethods,
    private ordersService: OrdersService
  ) {}

  async ngOnInit() {
    this.userProfileData = await this.userData.getUserData();
    if (!this.userProfileData) {
      this.authData = await this.userData.getAuthorizationData();
    }
  }

  async getOfflinePendingOrder() {
    this.pendingOrder = await this.userData.getPendingOrder();
    this.getPendingOrder();
  }

  getPendingOrder() {
    // eslint-disable-next-line no-underscore-dangle
    this.ordersService
      .getOne(
        this.userProfileData?._id ||
          this.authData.userId ||
          this.authData.userDetails.userId
      )
      .subscribe(
        (result) => {
          console.log('result: ', result);
        },
        (error) => {
          console.error(error);
          this.commonMethods.presentToast('Network or Server Error', false);
        }
      );
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }

  removeFromCart() {}
}
