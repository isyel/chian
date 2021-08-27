import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderModel } from '../models/OrderModel';
import { UserModel } from '../models/UserModel';
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
  pendingOrder: OrderModel;

  constructor(
    private router: Router,
    private userData: UserData,
    private commonMethods: CommonMethods,
    private ordersService: OrdersService
  ) {}

  async ngOnInit() {
    this.userProfileData = await this.userData.getUserData();
  }

  async getOfflinePendingOrder() {
    this.pendingOrder = await this.userData.getPendingOrder();
    this.getPendingOrder();
  }

  getPendingOrder() {
    // eslint-disable-next-line no-underscore-dangle
    this.ordersService.getPending(this.userProfileData?._id).subscribe(
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
