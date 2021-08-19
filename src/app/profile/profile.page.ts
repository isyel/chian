import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private commonMethods: CommonMethods,
    private formBuilder: FormBuilder
  ) {
    this.accountForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          ,
          Validators.maxLength(11),
        ],
      ],
      address: [''],
    });
  }

  async ngOnInit() {
    this.userProfileData = await this.userData.getUserData();
    this.accountForm.value.fullName = this.userProfileData.name;
    this.accountForm.value.email = this.userProfileData.email;
    this.accountForm.value.phoneNumber = this.userProfileData['Phone Number'];
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
