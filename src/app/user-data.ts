import { Injectable } from '@angular/core';
import { StorageService } from './services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserData {
  hasSeenTutorial = 'HAS_SEEN_TUTORIAL';

  constructor(private storageService: StorageService) {}

  async checkHasSeenTutorial(): Promise<string> {
    return await this.storageService.get(this.hasSeenTutorial);
  }

  async setHasSeenTutorial(): Promise<string> {
    return await this.storageService.set(this.hasSeenTutorial, true);
  }
}
