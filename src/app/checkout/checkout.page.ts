import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderModel } from '../models/OrderModel';
import { NavparamService } from '../services/navparam/navparam.service';
import { NavController } from '@ionic/angular';
import { LocationService } from '../services/location/location.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  order: OrderModel;
  addressEditMode = false;
  deliveryPrice = 2000;
  totalPrice: number;
  subTotal: number;

  constructor(
    private router: Router,
    private navParamService: NavparamService,
    public locationService: LocationService,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.order = this.navParamService.navData;
    console.log('this.order: ', this.order);

    if (this.locationService.userCoordinates) {
      this.locationService.reverseGeocode();
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

  goToCheckout() {
    this.router.navigate(['/payment']);
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
}
