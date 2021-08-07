import { Injectable } from '@angular/core';
import { NotificationModel } from './models/NotificationModel';
import { OrderModel } from './models/OrderModel';
import { UserModel } from './models/UserModel';
import { StorageService } from './services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserData {
  hasSeenTutorial = 'HAS_SEEN_TUTORIAL';
  authToken = 'AUTH_TOKEN';
  isLoggedIn = 'IS_LOGGED_IN';
  orderHistory = 'ORDER_HISTORY';
  pendingOrder = 'PENDING_ORDER';
  pushNotificationStatus = 'PUSH_NOTIFICATION_STATUS';
  emailNotificationStatus = 'EMAIL_NOTIFICATION_STATUS';
  notifications = 'NOTIFICATIONS';

  constructor(private storageService: StorageService) {}

  async checkHasSeenTutorial(): Promise<boolean> {
    return await this.storageService.get(this.hasSeenTutorial);
  }

  async setHasSeenTutorial(): Promise<string> {
    return await this.storageService.set(this.hasSeenTutorial, true);
  }

  async getAuthorizationToken(): Promise<string> {
    return await this.storageService.get(this.authToken);
  }

  async setAuthorizationToken(token: string): Promise<string> {
    return await this.storageService.set(this.authToken, token);
  }

  async getUserData(): Promise<UserModel> {
    return await this.storageService.get(this.authToken);
  }

  async setUserData(userData: UserModel) {
    return await this.storageService.set(this.isLoggedIn, userData);
  }

  async getIsLoggedIn() {
    return await this.storageService.get(this.isLoggedIn);
  }

  async setisLoggedIn(loginStatus: UserModel) {
    return await this.storageService.set(this.authToken, loginStatus);
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

  async setPendingOrder(pendingOrder: OrderModel) {
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
