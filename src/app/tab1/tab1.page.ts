import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OrderModel } from '../models/OrderModel';
import { UserModel } from '../models/UserModel';
import { OrdersService } from '../services/orders/orders.service';
import { UserData } from '../user-data';
import { CommonMethods } from '../util/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  recentOrders: OrderModel[];
  userProfileData: UserModel;

  constructor(
    public modalController: ModalController,
    private router: Router,
    public commonMethods: CommonMethods,
    private ordersService: OrdersService,
    private userData: UserData
  ) {}

  async ngOnInit() {
    this.userProfileData = await this.userData.getUserData();
  }

  goToItemsPage() {
    this.router.navigate(['/items']);
  }

  goToCartPage() {
    this.router.navigate(['/cart']);
  }

  viewDetails() {
    this.router.navigate(['/order-details']);
  }

  async getOfflineOrderHistory() {
    this.recentOrders = await this.userData.getOrderHistory();
    this.getRecentOrders();
  }

  getRecentOrders() {
    this.ordersService.getHistory(this.userProfileData?.id).subscribe(
      (result) => {
        console.log('result: ', result);
      },
      (error) => {
        console.error(error);
        this.commonMethods.presentToast('Network or Server Error', false);
      }
    );
  }
}
