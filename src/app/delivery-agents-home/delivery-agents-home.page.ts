/* eslint-disable no-underscore-dangle */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { OrderModel } from '../models/OrderModel';
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
  orderRequest: OrderModel;
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
    await this.locationService.getUserCoordinates();
    this.authUserData = await this.userData.getAuthorizationData();
    this.loadOrderRequest();
  }

  loadOrderRequest() {
    this.commonMethods.presentLoading('Loading order...');
    this.ordersService
      .getPending(
        this.authUserData.userDetails?.userId || this.authUserData.userId
      )
      .subscribe(
        (result) => {
          this.orderRequest = result.data[0];
          console.log('this.orderRequest: ', this.orderRequest);
          this.loadMap();
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

  loadMap() {
    const latLng = new google.maps.LatLng(
      this.orderRequest?.deliveryAddress?.latitude,
      this.orderRequest?.deliveryAddress?.longitude
    );

    const mapOptions = {
      center: latLng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    const customerMarker = {
      position: {
        lat: this.orderRequest?.deliveryAddress?.latitude,
        lng: this.orderRequest?.deliveryAddress?.longitude,
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
    this.markers = [...this.markers, customerMarker, deliveryAgentMarker];
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
    switch (this.orderRequest.orderStatus) {
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
      orderId: this.orderRequest._id,
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
      orderId: this.orderRequest._id,
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
    this.orderRequest = {
      ...this.orderRequest,
      orderStatus: 'delivered',
    };
    this.commonMethods.presentLoading('Updating Delivery Status...');
    this.ordersService
      .update(this.orderRequest?._id, this.orderRequest)
      .subscribe(
        (result) => {
          this.orderRequest = result.data;
          this.delivered = true;
        },
        (error) => {
          console.error(error);
          this.commonMethods.presentToast(
            error.message || 'Network or Server Error',
            false
          );
        }
      );
  }

  goToDeliveries() {
    this.router.navigate(['/tabs/tab2']);
  }
}
