import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderModel } from '../models/OrderModel';
import { UserModel } from '../models/UserModel';
import { OrdersService } from '../services/orders/orders.service';
import { UserData } from '../user-data';
import { CommonMethods } from '../util/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  activeTab = 0;
  userProfileData: UserModel;
  todayOrders: OrderModel[];
  ordersHistory: OrderModel[];

  constructor(
    private router: Router,
    public commonMethods: CommonMethods,
    private ordersService: OrdersService,
    private userData: UserData
  ) {}

  async ngOnInit() {
    this.userProfileData = await this.userData.getUserData();
    this.getOfflineOrderHistory();
  }

  switchTab(tab) {
    this.activeTab = tab;
  }

  async getOfflineOrderHistory() {
    this.ordersHistory = await this.userData.getOrderHistory();
    this.getOrderHistory();
  }

  getOrderHistory() {
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

  viewDetails() {
    this.router.navigate(['/order-details']);
  }

  groupOrders() {}
}
