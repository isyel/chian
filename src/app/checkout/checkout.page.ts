import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderModelPayload } from '../models/OrderModel';
import { NavparamService } from '../services/navparam/navparam.service';
import { NavController } from '@ionic/angular';
import { LocationService } from '../services/location/location.service';
import { UserData } from '../user-data';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  order: OrderModelPayload;
  addressEditMode = false;
  deliveryPrice = 2000;
  totalPrice: number;
  subTotal: number;

  constructor(
    private router: Router,
    private navParamService: NavparamService,
    public locationService: LocationService,
    private userData: UserData,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.order = this.navParamService.navData;
    console.log('this.order at checkout: ', this.order);

    if (this.locationService.userCoordinates) {
      this.locationService.reverseGeocode();
    } else {
      this.locationService.fullAddress = this.order.street;

      if (this.order.latitude === 0 || this.order.longitude === 0) {
        this.locationService.forwardGeocode();
      }
    }
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.subTotal =
      this.order?.orderItems[0]?.options?.price *
      this.order?.orderItems[0]?.quantity;
    this.totalPrice = this.deliveryPrice + this.subTotal;
  }

  handleEditAddress() {
    this.addressEditMode = !this.addressEditMode;
  }

  updateAddress() {
    this.handleEditAddress();
    this.locationService.forwardGeocode();
  }

  removeFromCart() {
    if (this.order?.orderItems[0]?.quantity > 1) {
      --this.order.orderItems[0].quantity;
    } else {
      this.navController.navigateRoot('/tabs/tab1');
    }
    this.calculateTotalPrice();
  }

  canPlaceOrder() {
    return (
      this.locationService.fullAddress &&
      this.locationService.fullAddress !== '' &&
      this.totalPrice &&
      this.order?.orderItems.length > 0
    );
  }

  goToCheckout() {
    console.log(
      'this.locationService.userLocationFromLatLng: ',
      this.locationService.userLocationFromLatLng
    );

    this.order = {
      ...this.order,
      street: this.locationService.fullAddress || this.order.street || '',
      latitude:
        this.locationService.userCoordinates?.latitude ||
        this.order.latitude ||
        0,
      longitude:
        this.locationService.userCoordinates?.longitude ||
        this.order.longitude ||
        0,
      state:
        this.locationService.userLocationFromLatLng?.administrativeArea ||
        this.order.state ||
        '',
      city:
        this.locationService.userLocationFromLatLng?.subAdministrativeArea ||
        this.order.city ||
        '',
      postalCode:
        this.locationService.userLocationFromLatLng?.postalCode ||
        this.order.postalCode ||
        '',
      deliveryPrice: this.deliveryPrice,
    };
    console.log('this.order in checkout: ', this.order);

    this.userData.setPendingOrder(this.order);
    this.navParamService.navData = this.order;
    this.router.navigate(['/payment']);
  }
}
