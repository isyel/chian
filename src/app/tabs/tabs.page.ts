import { Component, OnInit } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { AuthDataModel, UserModel } from '../models/UserModel';
import { UserData } from '../user-data';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  authUserData: AuthDataModel;
  userType: string;
  private activeTab?: HTMLElement;

  constructor(private userData: UserData) {}

  async ngOnInit() {
    this.authUserData = await this.userData.getAuthorizationData();
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
