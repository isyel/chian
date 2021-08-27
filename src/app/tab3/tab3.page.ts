import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserModel } from '../models/UserModel';
import { PhotoService } from '../services/photo/photo.service';
import { UsersService } from '../services/users/users.service';
import { UserData } from '../user-data';
import { CommonMethods } from '../util/common';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  userProfileData: UserModel | any;

  constructor(
    private router: Router,
    private navController: NavController,
    private usersService: UsersService,
    private userData: UserData,
    private commonMethods: CommonMethods,
    public photoService: PhotoService
  ) {}

  ngOnInit() {
    this.initPage();
  }

  async initPage() {
    this.userProfileData = await this.userData.getUserData();
    this.getUserProfile();
    await this.photoService.loadSaved();
  }

  goToCards() {
    this.router.navigate(['/cards']);
  }

  handleLogout() {
    this.userData.setisLoggedIn(false);
    this.navController.navigateRoot('/login-options');
  }

  goToUpdateProfile() {
    this.router.navigate(['/profile']);
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

  changeProfilePics() {
    this.photoService.addNewPhoto();
  }
}
