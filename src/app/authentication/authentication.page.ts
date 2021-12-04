import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { LoginModel, RegisterModel } from '../models/AuthModel';
import { AuthDataModel } from '../models/UserModel';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { NavparamService } from '../services/navparam/navparam.service';
import { UserData } from '../user-data';
import { CommonMethods } from '../util/common';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {
  showLogin = true;
  signupForm: FormGroup;
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  passwordType = 'password';
  passwordIcon = 'eye-off';
  userType: string;
  referralId: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    public commonMethods: CommonMethods,
    private navController: NavController,
    private navParamService: NavparamService,
    private userData: UserData
  ) {
    this.signupForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(11)]],
    });

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.userType = this.navParamService.navData || 'User';
    this.referralId = this.navParamService.referralId || '';
  }

  switchPage() {
    this.showLogin = !this.showLogin;
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  goToForgotPassword() {
    this.navController.navigateForward(['/forgot-password']);
  }

  handleSignup() {
    this.commonMethods.presentLoading();
    const signupCredentials: RegisterModel = {
      fullName: this.signupForm.value.fullName,
      email: this.signupForm.value.email,
      phoneNumber: this.signupForm.value.phoneNumber,
      password: this.signupForm.value.password,
      referralId: this.referralId || '',
      userType: this.userType,
    };
    this.authService.register(signupCredentials).subscribe(
      async (result) => {
        this.commonMethods.dismissLoader();
        if (result.status) {
          const authData = {
            userDetails: result.data,
          };
          await this.userData.setAuthorizationData(authData);
          if (this.userType === 'User') {
            this.navController.navigateRoot('/tabs/tab1');
          } else {
            this.navController.navigateRoot('/tabs/delivery-agents-home');
          }
        } else {
          this.commonMethods.presentAlert(result.err.message, result.message);
        }
      },
      (error) => {
        this.commonMethods.dismissLoader();
        console.error(error);
        this.commonMethods.presentAlert(
          this.commonMethods.hasErrorProperties(error),
          'Authentication Error'
        );
      }
    );
  }

  handleLogin() {
    this.commonMethods.presentLoading();
    const loginCredentials: LoginModel = {
      emailOrPhoneNumber: this.loginForm.value.email,
      password: this.loginForm.value.password,
      userType: this.userType,
    };
    this.authService.login(loginCredentials).subscribe(
      async (result) => {
        await this.userData.setAuthorizationData(result.data);
        this.commonMethods.dismissLoader();
        if (this.userType === 'User') {
          this.navController.navigateRoot('/tabs/tab1');
        } else {
          this.navController.navigateRoot('/tabs/delivery-agents-home');
        }
      },
      (error) => {
        this.commonMethods.dismissLoader();
        console.error(error);
        this.commonMethods.presentAlert(
          this.commonMethods.hasErrorProperties(error),
          'Authentication Error'
        );
      }
    );
  }
}
