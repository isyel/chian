import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../models/UserModel';
import { UsersService } from '../services/users/users.service';
import { UserData } from '../user-data';
import { CommonMethods } from '../util/common';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  userProfileData: UserModel;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private userData: UserData,
    private commonMethods: CommonMethods
  ) {}

  goToCards() {
    this.router.navigate(['/cards']);
  }

  handleLogout() {
    this.router.navigate(['/authentication']);
  }

  goToUpdateProfile() {
    this.router.navigate(['/profile']);
  }

  async ngOnInit() {
    this.userProfileData = await this.userData.getUserData();
    this.getUserProfile();
  }

  getUserProfile() {
    this.usersService.getProfile(this.userProfileData?.id).subscribe(
      (result) => {
        console.log('result: ', result);
      },
      (error) => {
        console.error(error);
        this.commonMethods.presentToast('Network or Server Error', false);
      }
    );
  }
}
