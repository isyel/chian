import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderModelPayload, ShippingPayloadModel } from '../models/OrderModel';
import { NavparamService } from '../services/navparam/navparam.service';
import { NavController } from '@ionic/angular';
import { LocationService } from '../services/location/location.service';
import { UserData } from '../user-data';
import { OrdersService } from '../services/orders/orders.service';
import { CommonMethods } from '../util/common';
import { AddressService } from '../services/address/address.service';
import { AddressModel } from '../models/AddressModel';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  order: OrderModelPayload;
  shippingDetails: ShippingPayloadModel;
  addressEditMode = false;
  deliveryPrice = 2000;
  totalPrice: number;
  subTotal: number;
  useSavedAddress: boolean;
  addresses: AddressModel[];

  constructor(
    private router: Router,
    private navParamService: NavparamService,
    public locationService: LocationService,
    private userData: UserData,
    private navController: NavController,
    private ordersService: OrdersService,
    public commonMethods: CommonMethods,
    private addressService: AddressService
  ) {}

  ngOnInit() {
    this.order = this.navParamService.navData;

    if (this.locationService.userCoordinates) {
      this.locationService.reverseGeocode();
    } else {
      this.locationService.fullAddress = this.order.street;

      if (this.order.latitude === 0 || this.order.longitude === 0) {
        this.locationService.forwardGeocode();
      }
    }
    this.calculateTotalPrice();
    this.getAddresses();
  }

  async getAddresses() {
    const authData = await this.userData.getAuthorizationData();
    this.addressService.getByUser(authData.userDetails.userId).subscribe(
      (result) => {
        this.addresses = result.data.data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  useAddress(address: AddressModel) {
    this.locationService.fullAddress = this.order.street = address.street;
    this.locationService.forwardGeocode();
    this.useSavedAddress = false;
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
    this.locationService.forwardGeocode();
    this.handleEditAddress();
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

  placeOrder() {
    this.commonMethods.presentLoading();
    this.ordersService.create(this.order).subscribe(
      (result) => {
        console.log('Result of creating order: ', result.data);
        // eslint-disable-next-line no-underscore-dangle
        this.addShippingDetails(result.data._id);
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

  async addShippingDetails(orderId) {
    const authData = await this.userData.getAuthorizationData();
    this.shippingDetails = {
      orderId,
      userId: authData.userDetails?.userId || authData.userId,
      address: {
        street: this.locationService.fullAddress || this.order.street || '',
        state:
          this.locationService.userLocationFromLatLng?.administrativeArea ||
          this.order.state ||
          '',
        city:
          this.locationService.userLocationFromLatLng?.subAdministrativeArea ||
          this.order.city ||
          '',
        latitude:
          this.locationService.userCoordinates?.latitude ||
          this.order.latitude ||
          0,
        longitude:
          this.locationService.userCoordinates?.longitude ||
          this.order.longitude ||
          0,
        postalCode:
          this.locationService.userLocationFromLatLng?.postalCode ||
          this.order.postalCode ||
          '',
      },
      deliveryPrice: this.deliveryPrice,
      quantity: this.order.orderItems.length,
    };
    this.ordersService.createShipping(this.shippingDetails).subscribe(
      (result) => {
        this.commonMethods.dismissLoader();
        this.commonMethods.presentToast('Order Placed, Continue to payment');
        const shippingInfo: ShippingPayloadModel = {
          ...result.data,
          amount: this.totalPrice,
        };
        this.navParamService.navData = shippingInfo;
        this.userData.setPendingOrder(shippingInfo);
        this.router.navigate(['/payment']);
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
