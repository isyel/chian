import { Injectable } from '@angular/core';
import { NotificationModel } from 'src/app/models/NotificationModel';
import { ResultModel } from 'src/app/models/ResultModel';
import { BaseServiceService } from '../base-service.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  actionUrl = 'api/notifications/';

  constructor(public service: BaseServiceService) {}

  /**
   * Get User Notifications
   *
   * @param userId
   * @returns UserModel
   * @memberof NotificationsService
   */
  public getAll(userId: string) {
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
  public markSeen(notificationId: string) {
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
  public delete(notificationId: string) {
    this.service.setActionUrl(this.actionUrl);
    return this.service.delete<NotificationModel>(notificationId);
  }
}
