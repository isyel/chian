import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular';
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
  accountForm: FormGroup;
  passwordType = 'password';
  passwordIcon = 'eye-off';

  constructor(
    private usersService: UsersService,
    private userData: UserData,
    private commonMethods: CommonMethods,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.userData.getUserData().then((userData) => {
      this.userProfileData = userData;
      this.accountForm = new FormGroup({
        fullName: new FormControl(
          this.userProfileData.fullName,
          Validators.required
        ),
        email: new FormControl(this.userProfileData.email, [
          Validators.required,
          Validators.email,
        ]),
        phoneNumber: new FormControl(this.userProfileData.phoneNumber, [
          Validators.required,
          Validators.minLength(11),
          ,
          Validators.maxLength(11),
        ]),
        address: new FormControl(this.userProfileData.address),
      });
    });
  }

  updateProfile() {
    this.commonMethods.presentLoading('Updating Profile');
    const updatedProfileData = {
      fullName: this.accountForm.value.fullName,
      email: this.accountForm.value.email,
      phoneNumber: this.accountForm.value.phoneNumber,
      address: this.accountForm.value.address,
    };
    this.usersService
      // eslint-disable-next-line no-underscore-dangle
      .updateProfile(this.userProfileData?._id, updatedProfileData)
      .subscribe(
        async (result) => {
          console.log('result: ', result);
          await this.userData.setUserData(result.data);
          this.commonMethods.dismissLoader();
          this.navController.pop();
        },
        (error) => {
          console.error(error);
          this.commonMethods.presentToast('Network or Server Error', false);
          this.commonMethods.dismissLoader();
        }
      );
  }
}
