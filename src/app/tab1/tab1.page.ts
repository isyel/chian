import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OrderModel } from '../models/OrderModel';
import { TransactionModel } from '../models/TransactionModel';
import { AuthDataModel, UserModel } from '../models/UserModel';
import { NavparamService } from '../services/navparam/navparam.service';
import { TransactionsService } from '../services/transactions/transactions.service';
import { UserData } from '../user-data';
import { CommonMethods } from '../util/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  recentOrders: TransactionModel[];
  authData: AuthDataModel;
  userDetails: UserModel;
  pendingOrder: OrderModel;
  searchFilter = null;

  constructor(
    public modalController: ModalController,
    private router: Router,
    public commonMethods: CommonMethods,
    private transactionsService: TransactionsService,
    private userData: UserData,
    private navParamService: NavparamService
  ) {}

  async ngOnInit() {
    this.authData = await this.userData.getAuthorizationData();
  }

  async ionViewDidEnter() {
    this.userDetails = await this.userData.getUserData();
    this.getOfflineOrderHistory();
    this.getPendingOrder();
  }

  async getPendingOrder() {
    this.pendingOrder = await this.userData.getPendingOrder();
  }

  goToItemsPage() {
    this.router.navigate(['/items']);
  }

  goToOrders() {
    this.router.navigate(['/tabs/tab2']);
  }

  filterOrders() {
    this.navParamService.searchString = this.searchFilter;
    this.searchFilter = null;
    this.router.navigate(['/tabs/tab2']);
  }

  goToPaymentPage() {
    this.navParamService.navData = this.pendingOrder;
    this.router.navigate(['/payment']);
  }

  viewDetails(transaction: TransactionModel) {
    this.navParamService.navData = transaction;
    this.router.navigate(['/order-details']);
  }

  async getOfflineOrderHistory() {
    this.recentOrders = await this.userData.getOrderHistory();
    this.recentOrders = this.recentOrders?.slice(0, 3);
    this.getRecentOrders();
  }

  getRecentOrders() {
    // eslint-disable-next-line no-underscore-dangle
    this.transactionsService
      .getHistory(this.authData?.userDetails.userId || this.authData?.userId)
      .subscribe(
        (result) => {
          console.log('result from server: ', result);
          this.recentOrders = result?.data?.data?.slice(0, 3);

          this.userData.setOrderHistory(result.data);
        },
        (error) => {
          console.error(error);
          this.commonMethods.presentToast('Network or Server Error', false);
        }
      );
  }
}
