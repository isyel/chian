import { Injectable } from '@angular/core';
import { UserModel } from './models/UserModel';
import { StorageService } from './services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserData {
  hasSeenTutorial = 'HAS_SEEN_TUTORIAL';
  authToken = 'AUTH_TOKEN';
  isLoggedIn = 'IS_LOGGED_IN';

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
}
