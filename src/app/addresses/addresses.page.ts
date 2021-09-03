/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { AddressModel } from '../models/AddressModel';
import { UserModel } from '../models/UserModel';
import { AddressService } from '../services/address/address.service';
import { UserData } from '../user-data';
import { CommonMethods } from '../util/common';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.page.html',
  styleUrls: ['./addresses.page.scss'],
})
export class AddressesPage implements OnInit {
  addresses: AddressModel[];
  userDetails: UserModel;

  constructor(
    private userData: UserData,
    private addressService: AddressService,
    private commonMethods: CommonMethods
  ) {}

  async ngOnInit() {
    this.userDetails = await this.userData.getUserData();
  }

  getAddresses() {
    this.addressService.getByUser(this.userDetails._id).subscribe(
      (result) => {
        this.addresses = result.data;
        console.log('this.addresses: ', this.addresses);
        this.commonMethods.dismissLoader();
      },
      (error) => {
        this.commonMethods.dismissLoader();
        console.error(error);
      }
    );
  }

  deleteAddress(addressId) {
    this.commonMethods.presentLoading();
    this.addressService.delete(addressId).subscribe(
      (result) => {
        console.log('Address deleted');
        this.commonMethods.dismissLoader();
      },
      (error) => {
        this.commonMethods.dismissLoader();
        console.error(error);
      }
    );
  }
}
