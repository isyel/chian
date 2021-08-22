import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { StorageService } from './services/storage.service';
import { UserData } from './user-data';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private userData: UserData,
    private router: Router,
    private storageService: StorageService
  ) {
    this.storageService.storageReady.subscribe((result) => {
      if (result) {
        this.platform.ready().then(async () => {
          const hasSeenTutorial = await this.userData.checkHasSeenTutorial();
          if (hasSeenTutorial) {
            this.checkAuthentication();
          } else {
            this.router.navigate(['/tutorial']);
          }
        });
      }
    });
  }

  async checkAuthentication() {
    const isLoggedIn = await this.userData.getIsLoggedIn();
    if (isLoggedIn) {
      this.router.navigate(['/tabs']);
    } else {
      this.router.navigate(['/login-options']);
    }
  }
}
