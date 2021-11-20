/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { OrderStatusEnum } from '../models/enums/OrderStatusEnum';
import { OrderModel } from '../models/OrderModel';
import { AuthDataModel } from '../models/UserModel';
import { NavparamService } from '../services/navparam/navparam.service';
import { OrdersService } from '../services/orders/orders.service';
import { UserData } from '../user-data';
import { CommonMethods } from '../util/common';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
  orderDetails: OrderModel;
  authData: AuthDataModel;
  isDeliveryAgent: boolean;

  constructor(
    private navParamService: NavparamService,
    private commonMethods: CommonMethods,
    public alertController: AlertController,
    private ordersService: OrdersService,
    private userData: UserData
  ) {}

  async ngOnInit() {
    this.orderDetails = this.navParamService.navData || {};
    this.authData = await this.userData.getAuthorizationData();
    this.isDeliveryAgent =
      this.authData.userDetails.roles[0] !== 'Delivery Agent';
  }

  getActiveIcon(defaultValue: number) {
    return OrderStatusEnum[this.orderDetails.orderStatus] >= defaultValue
      ? 'icon-enabled'
      : OrderStatusEnum[this.orderDetails.orderStatus] === defaultValue
      ? 'icon-active'
      : 'icon-disabled';
  }

  showOrderStatus() {
    switch (this.orderDetails.orderStatus) {
      case 'pending':
      case 'received':
        return 'Order Received';
      case 'placed':
      case 'created':
        return 'Order Placed';
      case 'delivered':
        return 'Delivered';
      default:
        break;
    }
  }

  showPaymentMethod() {
    switch (this.orderDetails.paymentType) {
      case 'payOnDelivery':
        return 'Pay On Delivery';
      case 'payWithCard':
        return 'Card Payment';
      default:
        break;
    }
  }

  async markDelivered() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm order as delivered!',
      message: 'Successfully delivered to customer?!!!',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.updateDeliveryStatus();
          },
        },
      ],
    });

    await alert.present();
  }

  updateDeliveryStatus() {
    this.orderDetails = {
      ...this.orderDetails,
      orderStatus: 'delivered',
    };
    this.commonMethods.presentLoading('Updating Delivery Status...');
    this.ordersService
      .update(this.orderDetails?._id, this.orderDetails)
      .subscribe(
        (result) => {
          this.orderDetails = result.data;
          this.orderDetails.orderStatus = 'delivered';
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
}
