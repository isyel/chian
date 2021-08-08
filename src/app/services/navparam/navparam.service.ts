import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavparamService {
  navDataValue: any;

  constructor() {}

  set navData(navData) {
    this.navDataValue = navData;
  }

  get navData() {
    if (this.navDataValue === undefined) {
      return null;
    }
    return this.navDataValue;
  }
}
