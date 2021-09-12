/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderModel } from '../models/OrderModel';
import { AuthDataModel, UserModel } from '../models/UserModel';
import { NavparamService } from '../services/navparam/navparam.service';
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
  rawOrdersHistory: OrderModel[];
  authData: AuthDataModel;
  searchFilter = null;

  constructor(
    private router: Router,
    public commonMethods: CommonMethods,
    private ordersService: OrdersService,
    private userData: UserData,
    private navParamService: NavparamService
  ) {}

  async ngOnInit() {
    this.userProfileData = await this.userData.getUserData();
    if (!this.userProfileData) {
      this.authData = await this.userData.getAuthorizationData();
    }
  }

  switchTab(tab) {
    this.activeTab = tab;
  }

  ionViewDidEnter() {
    this.getOfflineOrderHistory();
  }

  async getOfflineOrderHistory() {
    this.ordersHistory = this.rawOrdersHistory =
      await this.userData.getOrderHistory();
    if (typeof this.navParamService.navData === 'string') {
      this.searchFilter = this.navParamService.navData;
      console.log('this.searchFilter: ', this.searchFilter);
      this.filterOrders();
    }
    this.getOrderHistory();
  }

  getOrderHistory() {
    // eslint-disable-next-line no-underscore-dangle
    this.ordersService
      .getHistory(
        this.userProfileData?._id ||
          this.authData?.userId ||
          this.authData?.userDetails?.userId
      )
      .subscribe(
        (result) => {
          console.log('result: ', result);
          this.ordersHistory = this.rawOrdersHistory = result.order;
          this.userData.setOrderHistory(this.ordersHistory);
          if (typeof this.navParamService.navData === 'string') {
            this.searchFilter = this.navParamService.navData;
            console.log('this.searchFilter: ', this.searchFilter);
            this.filterOrders();
          }
        },
        (error) => {
          console.error(error);
          this.commonMethods.presentToast('Network or Server Error', false);
        }
      );
  }

  filterOrders() {
    this.ordersHistory = this.rawOrdersHistory.filter((order) =>
      order.orderItems[0].options.name.includes(this.searchFilter)
    );
  }

  viewDetails(order: OrderModel) {
    this.navParamService.navData = order;
    this.router.navigate(['/order-details']);
  }

  groupOrders() {}
}
