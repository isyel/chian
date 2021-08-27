import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/models/UserModel';
import { BaseServiceService } from '../base-service.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  actionUrl = 'users/';

  constructor(public service: BaseServiceService) {}

  /**
   * Get User Profile
   *
   * @param userId
   * @returns UserModel
   * @memberof UsersService
   */
  public getProfile(userId: string) {
    this.service.setActionUrl(this.actionUrl);
    return this.service.getById<UserModel>(userId);
  }

  /**
   * Update User Profile
   *
   * @param payload
   * @returns UserModel
   * @memberof UsersService
   */
  public updateProfile(userId: string, payload: UserModel) {
    this.service.setActionUrl(this.actionUrl);
    return this.service.update<UserModel>(userId, payload);
  }
}
