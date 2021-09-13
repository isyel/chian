import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavparamService {
  referralId: string;
  private navDataValue: any;
  private searchStringValue: string;

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

  set searchString(searchString) {
    this.searchStringValue = searchString;
  }

  get searchString() {
    if (this.searchStringValue === undefined) {
      return null;
    }
    return this.searchStringValue;
  }
}
