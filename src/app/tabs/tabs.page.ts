import { Component, OnInit } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { UserModel } from '../models/UserModel';
import { UserData } from '../user-data';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  userDetails: UserModel;
  userType: string;
  private activeTab?: HTMLElement;

  constructor(private userData: UserData) {}

  async ngOnInit() {
    this.userDetails = await this.userData.getUserData();
    console.log('this.userDetails: ', this.userDetails);
  }

  tabChange(tabsRef: IonTabs) {
    this.activeTab = tabsRef.outlet.activatedView.element;
  }

  ionViewWillLeave() {
    this.propagateToActiveTab('ionViewWillLeave');
  }

  ionViewDidLeave() {
    this.propagateToActiveTab('ionViewDidLeave');
  }

  ionViewWillEnter() {
    this.propagateToActiveTab('ionViewWillEnter');
  }

  ionViewDidEnter() {
    this.propagateToActiveTab('ionViewDidEnter');
  }

  private propagateToActiveTab(eventName: string) {
    if (this.activeTab) {
      this.activeTab.dispatchEvent(new CustomEvent(eventName));
    }
  }
}
