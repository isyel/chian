import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
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
    private router: Router
  ) {
    this.platform.ready().then(() => {
      this.userData.checkHasSeenTutorial().then((hasSeenTutorial) => {
        if (hasSeenTutorial) {
          this.router.navigate(['/tabs']);
        } else {
          this.router.navigate(['/tutorial']);
        }
      });
    });
  }
}
