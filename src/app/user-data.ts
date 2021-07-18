import { Injectable } from '@angular/core';
import { StorageService } from './services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserData {
  hasSeenTutorial = 'HAS_SEEN_TUTORIAL';
  authToken = 'AUTH_TOKEN';

  constructor(private storageService: StorageService) {}

  async checkHasSeenTutorial(): Promise<boolean> {
    return await this.storageService.get(this.hasSeenTutorial);
  }

  async setHasSeenTutorial(): Promise<string> {
    return await this.storageService.set(this.hasSeenTutorial, true);
  }

  getAuthorizationToken(): Promise<string> {
    return this.storageService.get(this.authToken);
  }

  async setAuthorizationToken(token: string): Promise<string> {
    return await this.storageService.set(this.authToken, token);
  }
}
