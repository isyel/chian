import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../user-data';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  pushNotificationStatus: boolean;
  emailNotificationStatus: boolean;

  constructor(private router: Router, private userData: UserData) {}

  async ngOnInit() {
    const notificationStatus = await this.userData.getPushNotificationStatus();
    this.pushNotificationStatus = notificationStatus || true;
    const emailStatus = await this.userData.getPushNotificationStatus();
    this.emailNotificationStatus = emailStatus || true;
  }

  goToCards() {
    this.router.navigate(['/cards']);
  }

  goToAbout() {
    this.router.navigate(['/about']);
  }

  updateEmailNotificationStatus() {}

  updatePushNotificationStatus() {}
}
