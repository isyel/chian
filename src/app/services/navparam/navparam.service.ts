import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavparamService {
  navDataValue: any;

  constructor() {}

  set navData(navData) {
    console.log('set navData: ', navData);

    this.navDataValue = navData;
  }

  get navData() {
    console.log('get this.navDataValue: ', this.navDataValue);
    if (this.navDataValue === undefined) {
      return null;
    }
    return this.navDataValue;
  }
}
