import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { OrderModel } from '../models/OrderModel';
import { AuthDataModel, UserModel } from '../models/UserModel';
import { AuthenticationService } from '../services/authentication/authentication.service';
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
  authData: AuthDataModel;
  orderHistory: OrderModel[];

  constructor(
    private router: Router,
    private navController: NavController,
    private usersService: UsersService,
    private authService: AuthenticationService,
    private userData: UserData,
    private commonMethods: CommonMethods,
    public photoService: PhotoService
  ) {}

  async ngOnInit() {
    this.authData = await this.userData.getAuthorizationData();
    this.getUserProfile();
    await this.photoService.loadSaved();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');

    this.userData.getUserData().then((userData) => {
      this.userProfileData = userData;
      console.log('this.userProfileData: ', this.userProfileData);
    });

    this.userData.getOrderHistory().then((orderHistory) => {
      this.orderHistory = orderHistory || [];
      console.log('this.userProfileData: ', this.userProfileData);
    });
  }

  goToCards() {
    this.router.navigate(['/cards']);
  }

  goToShippingAddresses() {
    this.router.navigate(['/addresses']);
  }

  handleLogout() {
    this.authService.logout().subscribe(
      (result) => {
        console.log('Logout result: ', result);
        this.userData.setisLoggedIn(false);
        this.navController.navigateRoot('/login-options');
      },
      (error) => {
        console.error(error);
        this.commonMethods.presentToast('Network or Server Error', false);
      }
    );
  }

  goToUpdateProfile() {
    this.router.navigate(['/profile']);
  }

  getUserProfile() {
    this.usersService
      .getProfile(this.authData?.userDetails?.userId || this.authData?.userId)
      .subscribe(
        (result) => {
          console.log('result: ', result);
          this.userData.setUserData(result.data);
          this.userProfileData = result.data;
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
