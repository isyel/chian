import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { OrderModel } from '../models/OrderModel';
import { OptionsService } from '../services/options/options.service';
import { CommonMethods } from '../util/common';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  cylinders: string[] = ['3kg', '5kg', '7kg', '10kg', '12kg'];
  statesData: any[];
  selectedState: any;
  selectedCity: any;
  selectedCylinder: any;
  jsonStates = './../../assets/data/states.json';
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
    private commonMethods: CommonMethods
  ) {}

  ngOnInit() {
    this.getStates();
    this.selectedCylinder = { cylinder: { text: '15kg' } };
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

  getOptions() {
    this.optionsService.getAll().subscribe(
      (result) => {
        console.log('result: ', result);
        this.cylinders = result;
      },
      (error) => {
        console.error(error);
        this.commonMethods.presentToast('Network or Server Error', false);
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
            this.selectedCylinder = value;
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
            this.selectedState = value;
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
            this.selectedCity = value;
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
    this.cylinders.forEach((x) => {
      options.push({ text: x, value: x });
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
    if (this.quantity > 0) {
      this.currentStep--;
    }
  }

  goToNextStep() {
    if (this.currentStep === 1) {
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
