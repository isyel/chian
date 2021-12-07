/* eslint-disable no-underscore-dangle */
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderModel } from '../models/OrderModel';
import { TransactionModel } from '../models/TransactionModel';
import { AuthDataModel, UserModel } from '../models/UserModel';
import { NavparamService } from '../services/navparam/navparam.service';
import { TransactionsService } from '../services/transactions/transactions.service';
import { UserData } from '../user-data';
import { CommonMethods } from '../util/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit, OnDestroy {
  activeTab = 0;
  todayOrders: TransactionModel[];
  ordersHistory: TransactionModel[];
  rawOrdersHistory: TransactionModel[];
  authData: AuthDataModel;
  searchFilter = null;

  constructor(
    private router: Router,
    public commonMethods: CommonMethods,
    private transactionsService: TransactionsService,
    private userData: UserData,
    private navParamService: NavparamService
  ) {}

  async ngOnInit() {
    this.authData = await this.userData.getAuthorizationData();
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
    const offlineData = await this.userData.getOrderHistory();
    if (this.ordersHistory?.length !== offlineData?.length) {
      this.ordersHistory = this.rawOrdersHistory = offlineData;
    }
    if (this.navParamService.searchString?.length > 0) {
      this.searchFilter = this.navParamService.searchString;
      this.navParamService.searchString = null;
      this.filterOrders();
    }

    const userId = this.authData?.userDetails?.userId || this.authData?.userId;

    if (this.authData?.userDetails?.roles[0] === 'User') {
      this.getOrderHistory(userId);
    } else {
      this.getDeliveryHistory(userId);
    }
  }

  getOrderHistory(userId) {
    // eslint-disable-next-line no-underscore-dangle
    this.transactionsService.getHistory(userId).subscribe(
      (result) => {
        if (this.ordersHistory?.length !== result.data?.data?.length) {
          this.ordersHistory = this.rawOrdersHistory = result.data.data;
        }

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
    this.transactionsService.getAcceptedOrders(userId).subscribe(
      (result) => {
        if (result.status && result.data.data.length) {
          this.ordersHistory = this.rawOrdersHistory = result.data.data;
        }

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
    this.ordersHistory = this.rawOrdersHistory.filter((order) =>
      order.orderDetails.orderItems[0].options.name.includes(this.searchFilter)
    );
  }

  viewDetails(order: TransactionModel) {
    this.navParamService.navData = order;
    this.router.navigate(['/order-details']);
  }

  groupOrders() {}

  goToItemsPage() {
    this.router.navigate(['/items']);
  }

  ngOnDestroy() {
    this.searchFilter = null;
  }
}
