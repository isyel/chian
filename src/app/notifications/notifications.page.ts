/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { NotificationModel } from '../models/NotificationModel';
import { AuthDataModel, UserModel } from '../models/UserModel';
import { NotificationsService } from '../services/notifications/notifications.service';
import { UserData } from '../user-data';
import { CommonMethods } from '../util/common';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  userProfileData: UserModel;
  authData: AuthDataModel;
  notifications: NotificationModel[];

  constructor(
    private userData: UserData,
    private commonMethods: CommonMethods,
    private notificationsService: NotificationsService
  ) {}

  async ngOnInit() {
    this.userProfileData = await this.userData.getUserData();
    if (!this.userProfileData) {
      this.authData = await this.userData.getAuthorizationData();
    }
  }

  async getOfflineNotifications() {
    this.notifications = await this.userData.getNotifications();
    this.getNotifications();
  }

  getNotifications() {
    // eslint-disable-next-line no-underscore-dangle
    this.notificationsService
      .getAll(
        this.userProfileData?._id ||
          this.authData.userId ||
          this.authData.userDetails.userId
      )
      .subscribe(
        (result) => {
          console.log('result: ', result);
        },
        (error) => {
          console.error(error);
          this.commonMethods.presentToast('Network or Server Error', false);
        }
      );
  }
}
