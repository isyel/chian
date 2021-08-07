import { Injectable } from '@angular/core';
import { NotificationModel } from 'src/app/models/NotificationModel';
import { ResultModel } from 'src/app/models/ResultModel';
import { BaseServiceService } from '../base-service.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  actionUrl = 'notifications/';

  constructor(public service: BaseServiceService) {}

  /**
   * Get User Notifications
   *
   * @param userId
   * @returns UserModel
   * @memberof NotificationsService
   */
  public getAll(userId: number) {
    this.service.setActionUrl(this.actionUrl);
    return this.service.getById<ResultModel>(userId);
  }

  /**
   * Mark As Seen
   *
   * @param notificationId
   * @returns NotificationModel
   * @memberof NotificationsService
   */
  public markSeen(notificationId: number) {
    this.service.setActionUrl(this.actionUrl);
    return this.service.getById<NotificationModel>(notificationId);
  }

  /**
   * Delete Notification
   *
   * @param notificationId
   * @returns NotificationModel
   * @memberof NotificationsService
   */
  public delete(notificationId: number) {
    this.service.setActionUrl(this.actionUrl);
    return this.service.delete<NotificationModel>(notificationId);
  }
}
