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
  public getOne(userId: number) {
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
  public getHistory(userId: number, payload: UserModel) {
    this.service.setActionUrl(this.actionUrl);
    return this.service.update<UserModel>(userId, payload);
  }
}