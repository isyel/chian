import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class CommonMethods {
  loading: any;

  constructor(
    public toastController: ToastController,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) {}

  /**
   * Present Toast
   *
   * @param message
   * @param type
   * @returns any
   * @memberof Promise<void>
   */
  async presentToast(message: string, success = true) {
    const toast = await this.toastController.create({
      message,
      color: success ? 'primary' : 'secondary',
      cssClass: 'toastCss',
      duration: 2000,
    });
    toast.present();
  }

  /**
   * Present Alert
   *
   * @param message
   * @param header
   * @param subHeader
   * @param buttonText
   * @returns any
   * @memberof Promise<void>
   */
  async presentAlert(
    message: string,
    header = '',
    subHeader = '',
    buttonText = 'OK'
  ) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header,
      subHeader,
      message,
      buttons: [buttonText],
    });

    await alert.present();
  }

  /**
   * Handles error response, check if it's a network error
   *
   * @param error
   * @returns any
   * @memberof CommonMethods
   */
  hasErrorProperties(error: any) {
    if (
      error.error !== null &&
      error.error.hasOwnProperty('message') &&
      error.error.hasOwnProperty('status')
    ) {
      console.log(
        'In hasErrorProperties(message and status from error.error): ',
        error.error.message
      );

      return error.error.message;
    } else if (
      error !== null &&
      error.hasOwnProperty('message') &&
      error.hasOwnProperty('status')
    ) {
      console.log(
        'In hasErrorProperties(message and status from error): ',
        error.message
      );
      return 'Network error, check connection';
    } else if (
      error.error !== null &&
      !error.error.hasOwnProperty('status') &&
      error.error.hasOwnProperty('message')
    ) {
      console.log(
        'In hasErrorProperties(message and no status from error.error): ',
        error.error.message
      );
      return error.error.message;
    } else {
      return 'Network Or Server Error';
    }
  }

  /**
   * Present Loader
   *
   * @param message
   * @param backdropDismiss
   * @returns any
   * @memberof CommonMethods
   */
  async presentLoading(message = 'Please wait...', backdropDismiss = false) {
    this.loading = await this.loadingController.create({
      spinner: 'bubbles',
      cssClass: 'loadingCss',
      message,
      backdropDismiss,
    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();
    console.log('Loading dismissed!', { role, data });
  }

  /**
   * Dismiss loader
   *
   * @returns any
   * @memberof Promise<void>
   */
  async dismissLoader() {
    console.log('loading: ', this.loading);

    if (this.loading) {
      await this.loading.dismiss();
    }
  }
}
