import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  userProfileData: UserModel | any;
  accountForm: FormGroup;
  passwordType = 'password';
  passwordIcon = 'eye-off';

  constructor(
    private usersService: UsersService,
    private userData: UserData,
    private commonMethods: CommonMethods
  ) {}

  ngOnInit() {
    this.userData.getUserData().then((userData) => {
      this.userProfileData = userData;
      this.accountForm = new FormGroup({
        fullName: new FormControl(
          this.userProfileData.fullName || this.userProfileData.Name,
          Validators.required
        ),
        email: new FormControl(
          this.userProfileData.email || this.userProfileData.Email,
          [Validators.required, Validators.email]
        ),
        phoneNumber: new FormControl(
          this.userProfileData.phoneNumber ||
            this.userProfileData['Phone Number'],
          [
            Validators.required,
            Validators.minLength(11),
            ,
            Validators.maxLength(11),
          ]
        ),
        address: new FormControl(this.userProfileData.address),
      });
    });
  }

  updateProfile() {
    this.usersService
      .updateProfile(this.userProfileData?.id, this.userProfileData)
      .subscribe(
        (result) => {
          console.log('result: ', result);
          this.userData.setUserData(result);
        },
        (error) => {
          console.error(error);
          this.commonMethods.presentToast('Network or Server Error', false);
        }
      );
  }
}
