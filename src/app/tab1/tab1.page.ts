import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OrderModel } from '../models/OrderModel';
import { AuthDataModel, UserModel } from '../models/UserModel';
import { NavparamService } from '../services/navparam/navparam.service';
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
  authData: AuthDataModel;
  pendingOrder: OrderModel;

  constructor(
    public modalController: ModalController,
    private router: Router,
    public commonMethods: CommonMethods,
    private ordersService: OrdersService,
    private userData: UserData,
    private navParamService: NavparamService
  ) {}

  async ngOnInit() {
    this.authData = await this.userData.getAuthorizationData();
  }

  ionViewDidEnter() {
    this.getOfflineOrderHistory();
    this.getPendingOrder();
  }

  async getPendingOrder() {
    this.pendingOrder = await this.userData.getPendingOrder();
  }

  goToItemsPage() {
    this.router.navigate(['/items']);
  }

  goToCartPage() {
    this.navParamService.navData = this.pendingOrder;
    this.router.navigate(['/checkout']);
  }

  viewDetails(order: OrderModel) {
    this.navParamService.navData = order;
    this.router.navigate(['/order-details']);
  }

  async getOfflineOrderHistory() {
    this.recentOrders = await this.userData.getOrderHistory();
    this.getRecentOrders();
  }

  getRecentOrders() {
    // eslint-disable-next-line no-underscore-dangle
    this.ordersService
      .getHistory(this.authData?.userDetails.userId || this.authData?.userId)
      .subscribe(
        (result) => {
          console.log('result: ', result);
          this.recentOrders = result.order;
          this.userData.setOrderHistory(this.recentOrders);
        },
        (error) => {
          console.error(error);
          this.commonMethods.presentToast('Network or Server Error', false);
        }
      );
  }
}
