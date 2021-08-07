import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/UserModel';
import { UsersService } from '../services/users/users.service';
import { UserData } from '../user-data';
import { CommonMethods } from '../util/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userProfileData: UserModel;

  constructor(
    private usersService: UsersService,
    private userData: UserData,
    private commonMethods: CommonMethods
  ) {}

  async ngOnInit() {
    this.userProfileData = await this.userData.getUserData();
  }

  updateProfile() {
    this.usersService
      .updateProfile(this.userProfileData?.id, this.userProfileData)
      .subscribe(
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
