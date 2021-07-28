import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  cylinders: string[] = ['3kg', '5kg', '7kg', '10kg', '12kg'];
  states: string[] = ['Cross River', 'Lagos', 'Abia', 'Enugu', 'Anambra'];
  cities: string[] = ['Calabar', 'Lagos', 'Aba', 'Enugu', 'Onitsha'];
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

  constructor(
    public modalController: ModalController,
    private pickerController: PickerController,
    private router: Router
  ) {}

  ngOnInit() {}

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
            console.log(value);
          },
        },
      ],
      columns: [
        {
          name: 'Cylinder Size',
          options: this.getColumnOptions(),
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
            console.log(value);
          },
        },
      ],
      columns: [
        {
          name: 'Available States',
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
            console.log(value);
          },
        },
      ],
      columns: [
        {
          name: 'Available Cities',
          options: this.getCityOptions(),
        },
      ],
      cssClass: 'pickerModal',
    };

    const picker = await this.pickerController.create(options);
    picker.present();
  }

  getColumnOptions() {
    const options = [];
    this.cylinders.forEach((x) => {
      options.push({ text: x, value: x });
    });
    return options;
  }
  getStateOptions() {
    const options = [];
    this.states.forEach((x) => {
      options.push({ text: x, value: x });
    });
    return options;
  }
  getCityOptions() {
    const options = [];
    this.cities.forEach((x) => {
      options.push({ text: x, value: x });
    });
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
