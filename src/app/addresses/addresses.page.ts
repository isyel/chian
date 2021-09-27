/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { AddressModel } from '../models/AddressModel';
import { UserModel } from '../models/UserModel';
import { AddressService } from '../services/address/address.service';
import { LocationService } from '../services/location/location.service';
import { OptionsService } from '../services/options/options.service';
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
  addNewAddress = false;
  addressForm: FormGroup;
  city: any;
  state: any;
  statesData: any[];

  constructor(
    private userData: UserData,
    private addressService: AddressService,
    private pickerController: PickerController,
    private optionsService: OptionsService,
    private commonMethods: CommonMethods,
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    public alertController: AlertController
  ) {
    this.addressForm = this.formBuilder.group({
      street: ['', [Validators.required]],
    });
  }

  async ngOnInit() {
    this.userDetails = await this.userData.getUserData();
    this.getAddresses();
    this.getStates();
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

  getStates() {
    this.optionsService.getStates().subscribe(
      (result) => {
        this.statesData = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  async showStatePicker() {
    const options: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: (value: any) => {
            this.state = value.state;
            this.city = null;
          },
        },
      ],
      columns: [
        {
          name: 'state',
          options: this.getStateOptions(),
        },
      ],
      cssClass: 'pickerModal',
    };

    const picker = await this.pickerController.create(options);
    picker.present();
  }

  async showCityPicker() {
    const options: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: (value: any) => {
            this.city = value.city;
          },
        },
      ],
      columns: [
        {
          name: 'city',
          options: this.getCityOptions(),
        },
      ],
      cssClass: 'pickerModal',
    };

    const picker = await this.pickerController.create(options);
    picker.present();
  }

  getStateOptions() {
    const options = [];
    this.statesData.forEach((item) => {
      options.push({ text: item.state.name, value: item.state.id });
    });
    return options;
  }

  getCityOptions() {
    const options = [];
    if (this.state !== undefined) {
      const selectedItem = this.statesData.find(
        (item) => item.state.id === this.state.value
      );
      selectedItem.state.locals.forEach((local) => {
        options.push({ text: local.name, value: local.id });
      });
    }
    return options;
  }

  async deleteAddress(addressId) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete this addresss?',
      message: 'This is not a reversible action!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Delete',
          handler: () => {
            this.completeAddressDelete(addressId);
          },
        },
      ],
    });

    await alert.present();
  }

  completeAddressDelete(addressId) {
    this.commonMethods.presentLoading();
    this.addressService.delete(addressId).subscribe(
      (result) => {
        console.log('Address deleted');
        this.addresses = this.addresses.filter(
          (address) => address._id !== addressId
        );
        this.commonMethods.dismissLoader();
      },
      (error) => {
        this.commonMethods.dismissLoader();
        console.error(error);
      }
    );
  }

  switch() {
    this.addNewAddress = !this.addNewAddress;
  }

  handleAddAddress() {
    this.commonMethods.presentLoading();
    this.locationService.forwardGeocode();
    const addressData = {
      userId: this.userDetails._id,
      city: this.city.text,
      state: this.state.text,
      street: this.addressForm.value.street,
      latitude: this.locationService.userCoordinates?.latitude,
      longitude: this.locationService.userCoordinates?.longitude,
    };
    this.addressService.create(addressData).subscribe(
      (result) => {
        this.commonMethods.dismissLoader();
        console.log('Result');
        this.switch();
        this.addresses = [...this.addresses, result.data];
      },
      (error) => {
        this.commonMethods.dismissLoader();
        console.error(error);
        this.commonMethods.presentAlert(
          this.commonMethods.hasErrorProperties(error),
          'Address could not be added'
        );
      }
    );
  }
}
