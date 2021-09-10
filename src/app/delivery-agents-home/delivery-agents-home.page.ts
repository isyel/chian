import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OrderModel } from '../models/OrderModel';
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
  order: OrderModel;
  latitude: number;
  longitude: number;
  markers = [{ position: { lat: 6.4926326, lng: 3.3489682 }, type: 'gas' }];
  icons: Record<string, { icon: string }> = {
    agent: {
      icon: 'assets/images/gas.svg',
    },
    gas: {
      icon: 'assets/images/delivery-truck.svg',
    },
  };
  distanceBetween: any;

  constructor(
    private locationService: LocationService,
    private ordersService: OrdersService,
    private userData: UserData,
    private commonMethods: CommonMethods
  ) {}

  async ngOnInit() {
    this.locationService.getUserCoordinates();
    this.authUserData = await this.userData.getAuthorizationData();
    this.loadOrderRequest();
  }

  loadOrderRequest() {
    this.ordersService
      .getHistory(
        this.authUserData.userDetails?.userId || this.authUserData.userId
      )
      .subscribe(
        (result) => {
          this.order = result[0];
          console.log('this.order: ', this.order);
          this.loadMap();
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

  loadMap() {
    const latLng = new google.maps.LatLng(
      this.order?.deliveryAddress?.latitude ||
        this.locationService.userCoordinates?.latitude ||
        6.4926326,
      this.order?.deliveryAddress?.longitude ||
        this.locationService.userCoordinates?.longitude ||
        3.4489682
    );

    const mapOptions = {
      center: latLng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.markers.push({
      position: {
        lat: this.locationService.userCoordinates?.latitude,
        lng: this.locationService.userCoordinates?.longitude,
      },
      type: 'agent',
    });
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

  acceptOrder() {}
  rejectOrder() {}
}
