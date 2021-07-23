import { Component } from '@angular/core';
import { ModalController, PickerController } from '@ionic/angular';
import { LocationModalComponent } from '../components/location-modal/location-modal.component';
import { PickerOptions } from '@ionic/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  animals: string[] = ['Tiger', 'Lion', 'Elephant', 'Fox', 'Wolf'];
  constructor(
    public modalController: ModalController,
    private pickerController: PickerController
  ) {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: LocationModalComponent,
      cssClass: 'modal',
      componentProps: {
        type: 'state',
      },
      swipeToClose: true,
    });
    return await modal.present();
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
      cssClass: 'locationPicker',
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
}
