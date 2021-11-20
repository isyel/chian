/* eslint-disable no-underscore-dangle */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { OrderModel } from '../models/OrderModel';
import { TransactionModel } from '../models/TransactionModel';
import { TransactionStateModel } from '../models/TransactionStateModel';
import { AuthDataModel } from '../models/UserModel';
import { LocationService } from '../services/location/location.service';
import { OrdersService } from '../services/orders/orders.service';
import { UserData } from '../user-data';
import { CommonMethods } from '../util/common';

@Component({
  selector: 'app-delivery-agents-home',
  templateUrl: './delivery-agents-home.page.html',
  styleUrls: ['./delivery-agents-home.page.scss'],
})
export class DeliveryAgentsHomePage implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  authUserData: AuthDataModel;
  orderRequest: TransactionModel;
  latitude: number;
  longitude: number;
  markers = [];
  icons: Record<string, { icon: string }> = {
    gas: {
      icon: 'assets/images/gas.svg',
    },
    agent: {
      icon: 'assets/images/delivery-truck.svg',
    },
  };
  distanceBetween: any;
  accepted: boolean;
  delivered: boolean;

  constructor(
    private locationService: LocationService,
    private ordersService: OrdersService,
    private userData: UserData,
    private commonMethods: CommonMethods,
    public alertController: AlertController,
    private router: Router
  ) {}

  async ngOnInit() {
    this.commonMethods.presentLoading('Loading order...');
  }

  async ionViewWillEnter() {
    this.authUserData = await this.userData.getAuthorizationData();
    this.loadOrderRequest();
  }

  loadOrderRequest() {
    this.ordersService
      .getOrderBeingFulfilled(
        this.authUserData.userDetails?.userId || this.authUserData.userId
      )
      .subscribe(
        (result) => {
          if (result.data) {
            this.accepted = true;
            this.orderRequest = result.data;
            console.log('orderRequest being fulfilled: ', this.orderRequest);
            if (this.orderRequest) {
              this.loadMap();
            }
            this.commonMethods.dismissLoader();
          } else {
            this.getPendingOrder();
          }
        },
        (error) => {
          console.error(error);
          this.getPendingOrder();
          this.commonMethods.dismissLoader();
        }
      );
  }

  getPendingOrder() {
    this.ordersService
      .getPending(
        this.authUserData.userDetails?.userId || this.authUserData.userId
      )
      .subscribe(
        (result) => {
          this.orderRequest = result.data.data[0];
          console.log('pending orderRequest: ', this.orderRequest);
          if (this.orderRequest) {
            this.loadMap();
          }
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

  async loadMap() {
    await this.locationService.getUserCoordinates();
    const latLng = new google.maps.LatLng(
      this.orderRequest?.orderDetails.deliveryAddress?.latitude,
      this.orderRequest?.orderDetails.deliveryAddress?.longitude
    );

    const mapOptions = {
      center: latLng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    const customerMarker = {
      position: {
        lat: this.orderRequest?.orderDetails.deliveryAddress?.latitude,
        lng: this.orderRequest?.orderDetails.deliveryAddress?.longitude,
      },
      type: 'gas',
    };
    const deliveryAgentMarker = {
      position: {
        lat: this.locationService.userCoordinates?.latitude,
        lng: this.locationService.userCoordinates?.longitude,
      },
      type: 'agent',
    };
    this.markers = [customerMarker, deliveryAgentMarker];
    console.log('this.markers: ', this.markers);

    this.markers.forEach((location) => {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(
          location.position.lat,
          location.position.lng
        ),
        icon: this.icons[location.type].icon,
        map: this.map,
      });
    });

    const flightPlanCoordinates = this.markers.map((location) => ({
      lat: location.position.lat,
      lng: location.position.lng,
    }));
    const flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: '#050f44',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    flightPath.setMap(this.map);
  }

  showOrderStatus() {
    switch (this.orderRequest.orderDetails.orderStatus) {
      case 'pending':
        return 'In Transit';
      case 'placed':
        return 'Order Placed';
      case 'received':
        return 'Order Received';
      case 'delivered':
        return 'Delivered';
      default:
        break;
    }
  }

  acceptOrder() {
    this.commonMethods.presentLoading('Accepting Request...');
    const data: TransactionStateModel = {
      userId: this.authUserData.userDetails.userId || this.authUserData.userId,
      orderId: this.orderRequest.transactionId,
      status: 'accepted',
    };
    this.ordersService.acceptOrderRequest(data).subscribe(
      (result) => {
        this.commonMethods.presentToast(result.message);
        this.accepted = true;
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

  rejectOrder() {
    this.commonMethods.presentLoading('Updating...');
    const data: TransactionStateModel = {
      userId: this.authUserData.userDetails.userId || this.authUserData.userId,
      orderId: this.orderRequest.transactionId,
      status: 'rejected',
    };
    this.ordersService.acceptOrderRequest(data).subscribe(
      (result) => {
        this.commonMethods.presentToast(result.message);
        this.orderRequest = null;
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
    const updatedOrder = {
      ...this.orderRequest.orderDetails,
      orderStatus: 'delivered',
    };
    this.commonMethods.presentLoading('Updating Delivery Status...');
    this.ordersService
      .update(this.orderRequest?.transactionId, updatedOrder)
      .subscribe(
        (result) => {
          this.orderRequest = result.data;
          this.delivered = true;
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

  goToDeliveries() {
    this.router.navigate(['/tabs/tab2']);
  }
}
