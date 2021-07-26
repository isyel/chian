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
  animals: string[] = ['3kg', '5kg', '7kg', '10kg', '12kg'];
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
          name: 'Animals',
          options: this.getColumnOptions(),
        },
      ],
      cssClass: 'pickerModal',
    };

    const picker = await this.pickerController.create(options);
    picker.present();
  }

  getColumnOptions() {
    const options = [];
    this.animals.forEach((x) => {
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
