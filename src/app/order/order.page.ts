/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { OptionsModel } from '../models/OptionsModel';
import { OrderModel } from '../models/OrderModel';
import { AuthDataModel, UserModel } from '../models/UserModel';
import { LocationService } from '../services/location/location.service';
import { NavparamService } from '../services/navparam/navparam.service';
import { OptionsService } from '../services/options/options.service';
import { UserData } from '../user-data';

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
  userCoordinates: any;
  useLocation = false;
  selectedOption: OptionsModel;
  authData: AuthDataModel;
  errorMessage: string;

  constructor(
    public modalController: ModalController,
    private pickerController: PickerController,
    private router: Router,
    private optionsService: OptionsService,
    private navParamService: NavparamService,
    private userData: UserData,
    private locationService: LocationService
  ) {}

  async ngOnInit() {
    this.userProfileData = await this.userData.getUserData();
    if (!this.userProfileData) {
      this.authData = await this.userData.getAuthorizationData();
    }
    this.selectedOption = this.navParamService.navData;
    console.log('this.selectedOption: ', this.selectedOption);

    this.selectedCylinder = {
      text: this.selectedOption?.name,
      value: this.selectedOption?._id,
    };
    this.cylinderOptions = await this.userData.getOptions();
    this.getStates();
  }

  useCurrentLocation() {
    this.useLocation = true;
    this.locationService.getUserCoordinates();
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
        (item) => item.state.id === this.selectedState.value
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
    if (
      this.currentStep === 1 &&
      (!this.selectedState?.text || !this.selectedCity?.text) &&
      !this.locationService.userCoordinates
    ) {
      this.errorMessage =
        'You must either choose a state and area or use current location';
      return;
    }
    if (this.currentStep === 1) {
      this.errorMessage = null;
      const order = {
        userId:
          this.userProfileData?._id ||
          this.authData.userId ||
          this.authData.userDetails.userId,
        orderItems: [
          {
            options: this.selectedOption,
            quantity: this.quantity,
          },
        ],
        state: this.selectedState?.text || '',
        city: this.selectedCity?.text || '',
        deliveryPrice: 1500,
      };

      this.navParamService.navData = order;
      this.router.navigate(['/checkout']);
    } else {
      this.currentStep++;
    }
  }

  incrementQuantity() {
    if (this.quantity < 2) {
      ++this.quantity;
    }
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      --this.quantity;
    }
  }
}
