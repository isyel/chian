import { Injectable } from '@angular/core';
import {
  LoginModel,
  RegisterModel,
  ReissueTokenModel,
} from 'src/app/models/AuthModel';
import { BaseServiceService } from '../base-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  actionUrl = 'user/';

  constructor(public service: BaseServiceService) {}

  /**
   * Register User
   *
   * @param payload
   * @returns UserModel
   * @memberof AuthenticationService
   */
  public register(payload: RegisterModel) {
    this.service.setActionUrl(this.actionUrl, 'Register');
    return this.service.authPost<any>(payload);
  }

  /**
   * Login User
   *
   * @param payload
   * @returns UserModel
   * @memberof AuthenticationService
   */
  public login(payload: LoginModel) {
    this.service.setActionUrl(this.actionUrl, 'Login');
    return this.service.authPost<any>(payload);
  }

  /**
   * Refresh Token
   *
   * @param refreshToken
   * @returns UserModel
   * @memberof AuthenticationService
   */
  public refreshToken(refreshToken: ReissueTokenModel) {
    this.service.setActionUrl(this.actionUrl, 'RefreshToken');
    return this.service.authPost<any>(refreshToken);
  }

  /**
   * Social Authentication
   *
   * @returns UserModel
   * @memberof AuthenticationService
   */
  public socialAuthentication() {
    this.service.setActionUrl(this.actionUrl, 'SocialLogin');
    return this.service.getAll<any>();
  }

  /**
   * Logout User
   *
   * @param offer
   * @returns any
   * @memberof AuthenticationService
   */
  public logout(token: string) {
    this.service.setActionUrl(this.actionUrl, 'Logout');
    return this.service.authPost<any>(token);
  }
}
