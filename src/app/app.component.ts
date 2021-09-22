import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
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
    private storageService: StorageService,
    private navController: NavController
  ) {
    this.storageService.storageReady.subscribe((result) => {
      if (result) {
        this.platform.ready().then(async () => {
          const hasSeenTutorial = await this.userData.checkHasSeenTutorial();
          if (hasSeenTutorial) {
            console.log('hasSeenTutorial: ', hasSeenTutorial);
            this.checkAuthentication();
          } else {
            console.log('hasSeenTutorial: ', hasSeenTutorial);
            this.navController.navigateRoot(['/tutorial']);
          }
        });
      }
    });
  }

  async checkAuthentication() {
    const isLoggedIn = await this.userData.getIsLoggedIn();
    if (isLoggedIn) {
      const authData = await this.userData.getAuthorizationData();
      if (authData.userDetails.roles[0] === 'User') {
        this.navController.navigateRoot('/tabs/tab1');
      } else {
        this.navController.navigateRoot('/tabs/delivery-agents-home');
      }
    } else {
      this.navController.navigateRoot(['/login-options']);
    }
  }
}
