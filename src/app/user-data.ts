import { Injectable } from '@angular/core';
import { NotificationModel } from './models/NotificationModel';
import { OptionsModel } from './models/OptionsModel';
import { OrderModel, OrderModelPayload } from './models/OrderModel';
import { AuthDataModel, UserModel } from './models/UserModel';
import { StorageService } from './services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserData {
  hasSeenTutorial = 'HAS_SEEN_TUTORIAL';
  authData = 'AUTH_DATA';
  isLoggedIn = 'IS_LOGGED_IN';
  orderHistory = 'ORDER_HISTORY';
  pendingOrder = 'PENDING_ORDER';
  pushNotificationStatus = 'PUSH_NOTIFICATION_STATUS';
  emailNotificationStatus = 'EMAIL_NOTIFICATION_STATUS';
  notifications = 'NOTIFICATIONS';
  userData = 'USER_DATA';
  options = 'OPTIONS';

  constructor(private storageService: StorageService) {}

  async checkHasSeenTutorial(): Promise<boolean> {
    return await this.storageService.get(this.hasSeenTutorial);
  }

  async setHasSeenTutorial(): Promise<string> {
    return await this.storageService.set(this.hasSeenTutorial, true);
  }

  async getAuthorizationData(): Promise<AuthDataModel> {
    return await this.storageService.get(this.authData);
  }

  async setAuthorizationData(data: AuthDataModel): Promise<any> {
    this.setisLoggedIn(true);
    return await this.storageService.set(this.authData, data);
  }

  async getUserData(): Promise<UserModel> {
    return await this.storageService.get(this.userData);
  }

  async setUserData(userData: UserModel) {
    this.setisLoggedIn(true);
    return await this.storageService.set(this.userData, userData);
  }

  async getIsLoggedIn(): Promise<boolean> {
    return await this.storageService.get(this.isLoggedIn);
  }

  async setisLoggedIn(loginStatus: boolean) {
    if (!loginStatus) {
      this.storageService.clearStorage();
      this.setHasSeenTutorial();
    }
    return await this.storageService.set(this.isLoggedIn, loginStatus);
  }

  async getOptions(): Promise<OptionsModel[]> {
    return await this.storageService.get(this.options);
  }

  async setOptions(options: OptionsModel[]) {
    return await this.storageService.set(this.options, options);
  }

  async getOrderHistory(): Promise<OrderModel[]> {
    return await this.storageService.get(this.orderHistory);
  }

  async setOrderHistory(orderHistory: OrderModel[]) {
    return await this.storageService.set(this.orderHistory, orderHistory);
  }

  async getPendingOrder(): Promise<OrderModel> {
    return await this.storageService.get(this.pendingOrder);
  }

  async setPendingOrder(pendingOrder: OrderModelPayload) {
    return await this.storageService.set(this.pendingOrder, pendingOrder);
  }

  async getPushNotificationStatus(): Promise<boolean> {
    return await this.storageService.get(this.pushNotificationStatus);
  }

  async setPushNotificationStatus(pushNotificationStatus: boolean) {
    return await this.storageService.set(
      this.pushNotificationStatus,
      pushNotificationStatus
    );
  }

  async getEmailNotificationStatus(): Promise<boolean> {
    return await this.storageService.get(this.emailNotificationStatus);
  }

  async setEmailNotificationStatus(emailNotificationStatus: boolean) {
    return await this.storageService.set(
      this.emailNotificationStatus,
      emailNotificationStatus
    );
  }

  async getNotifications(): Promise<NotificationModel[]> {
    return await this.storageService.get(this.notifications);
  }

  async setNotifications(notifications: NotificationModel[]) {
    return await this.storageService.set(this.notifications, notifications);
  }
}
