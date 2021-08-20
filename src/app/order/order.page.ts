/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { OptionsModel } from '../models/OptionsModel';
import { OrderModel } from '../models/OrderModel';
import { UserModel } from '../models/UserModel';
import { NavparamService } from '../services/navparam/navparam.service';
import { OptionsService } from '../services/options/options.service';
import { UserData } from '../user-data';
import { CommonMethods } from '../util/common';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  userProfileData: UserModel;
  cylinderOptions: OptionsModel[];
  statesData: any[];
  selectedState: any;
  selectedCity: any;
  selectedCylinder: any;
  steps = {
    0: {
      image: 'assets/images/tutorial_illustration.svg',
      description: 'Select refill quantity and how to refill',
    },
    1: {
      image: 'assets/images/tutorial_illustration.svg',
      description: 'Choose delivery location',
    },
  };
  currentStep = 0;
  quantity = 1;
  order: OrderModel;

  constructor(
    public modalController: ModalController,
    private pickerController: PickerController,
    private router: Router,
    private optionsService: OptionsService,
    private commonMethods: CommonMethods,
    private navParamService: NavparamService,
    private userData: UserData
  ) {}

  async ngOnInit() {
    this.userProfileData = await this.userData.getUserData();
    const selectedOption = this.navParamService.navData;
    this.selectedCylinder = {
      text: selectedOption.name,
      value: selectedOption._id,
    };
    this.cylinderOptions = await this.userData.getOptions();
    this.getStates();
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

  async showPicker() {
    const options: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: (value: any) => {
            this.selectedCylinder = value.cylinder;
          },
        },
      ],
      columns: [
        {
          name: 'cylinder',
          options: this.getCylinderOptions(),
        },
      ],
      cssClass: 'pickerModal',
    };

    const picker = await this.pickerController.create(options);
    picker.present();
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
            this.selectedState = value.state;
            this.selectedCity = null;
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
            this.selectedCity = value.city;
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

  getCylinderOptions() {
    const options = [];
    this.cylinderOptions.forEach((cylinder) => {
      options.push({
        text: cylinder.name,
        value: cylinder._id,
        object: cylinder,
      });
    });
    return options;
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
    if (this.selectedState !== undefined) {
      const selectedItem = this.statesData.find(
        (item) => item.state.id === this.selectedState.state.value
      );
      selectedItem.state.locals.forEach((local) => {
        options.push({ text: local.name, value: local.id });
      });
    }
    return options;
  }

  goToPrevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  goToNextStep() {
    if (this.currentStep === 1) {
      const order = {
        userId: this.userProfileData._id,
        orderItems: [
          {
            options: this.cylinderOptions.find(
              (option) => option._id === this.selectedCylinder.value
            ),
            quantity: this.quantity,
          },
        ],
        state: this.selectedState.name,
        city: this.selectedCity.name,
        street: '',
        deliveryPrice: 1500,
      };
      this.navParamService.navData = order;
      this.router.navigate(['/checkout']);
    } else {
      this.currentStep++;
    }
  }

  incrementQuantity() {
    ++this.quantity;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      --this.quantity;
    }
  }
}
