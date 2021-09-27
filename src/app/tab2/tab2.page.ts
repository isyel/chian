/* eslint-disable no-underscore-dangle */
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class Tab2Page implements OnInit, OnDestroy {
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

  switchTab(tab: number) {
    this.activeTab = tab;
  }

  ionViewDidEnter() {
    if (this.navParamService.searchString === null) {
      this.searchFilter = null;
    }
    this.getOfflineOrderHistory();
  }

  async getOfflineOrderHistory() {
    this.ordersHistory = this.rawOrdersHistory =
      await this.userData.getOrderHistory();
    if (this.navParamService.searchString?.length > 0) {
      this.searchFilter = this.navParamService.searchString;
      this.navParamService.searchString = null;
      this.filterOrders();
    }

    const userId =
      this.userProfileData?._id ||
      this.authData?.userDetails?.userId ||
      this.authData?.userId;
    if (
      this.authData?.userDetails?.roles[0] === 'User' ||
      this.userProfileData.roles[0] === 'User'
    ) {
      this.getOrderHistory(userId);
    } else {
      this.getDeliveryHistory(userId);
    }
  }

  getOrderHistory(userId) {
    // eslint-disable-next-line no-underscore-dangle
    this.ordersService.getHistory(userId).subscribe(
      (result) => {
        this.ordersHistory = this.rawOrdersHistory = result.order;

        this.userData.setOrderHistory(this.ordersHistory);
        if (this.searchFilter?.length > 0) {
          this.filterOrders();
        }
      },
      (error) => {
        console.error(error);
        this.commonMethods.presentToast('Network or Server Error', false);
      }
    );
  }

  getDeliveryHistory(userId) {
    // eslint-disable-next-line no-underscore-dangle
    this.ordersService.getAcceptedOrders(userId).subscribe(
      (result) => {
        this.ordersHistory = this.rawOrdersHistory = result.data;

        this.userData.setOrderHistory(this.ordersHistory);
        if (this.searchFilter?.length > 0) {
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
    console.log('call filter orders');

    this.ordersHistory = this.rawOrdersHistory.filter((order) =>
      order.orderItems[0].options.name.includes(this.searchFilter)
    );
  }

  viewDetails(order: OrderModel) {
    this.navParamService.navData = order;
    this.router.navigate(['/order-details']);
  }

  groupOrders() {}

  ngOnDestroy() {
    console.log('Call ngDesctroy');

    this.searchFilter = null;
  }
}
