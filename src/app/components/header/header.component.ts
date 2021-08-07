import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() icon = 'chevron-back';
  @Input() hasBackButton = true;
  @Input() pageTitle: string;
  @Input() hasPageTitle = true;
  @Input() hasNotifications: boolean;
  @Input() lightTheme: boolean;

  constructor(private navController: NavController) {}

  ngOnInit() {}

  handleGoBack() {
    this.navController.pop();
  }

  goToNotifications() {
    this.navController.navigateForward('/notifications');
  }

  goToProfile() {
    this.navController.navigateRoot('/tabs/tab3');
  }
}
