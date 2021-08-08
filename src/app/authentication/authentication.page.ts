import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { LoginModel, RegisterModel } from '../models/AuthModel';
import { AuthenticationService } from '../services/authentication/authentication.service';
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

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    public commonMethods: CommonMethods,
    private navController: NavController
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

    this.forgotPasswordForm = this.formBuilder.group({
      emailOrPhonenumber: ['', Validators.required],
    });
  }

  ngOnInit() {}

  switchPage() {
    this.showLogin = !this.showLogin;
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  handleSignup() {
    const signupCredentials: RegisterModel = {
      fullName: this.signupForm.value.fullName,
      email: this.signupForm.value.email,
      phoneNumber: this.signupForm.value.phoneNumber,
      password: this.signupForm.value.password,
      referralId: this.signupForm.value.password || '',
    };
    this.authService.register(signupCredentials).subscribe(
      (result) => {
        console.log('result: ', result);
        this.navController.navigateRoot('/tabs/tab1');
      },
      (error) => {
        console.error(error);
      }
    );
  }

  handleLogin() {
    this.commonMethods.presentLoading();
    const loginCredentials: LoginModel = {
      'email/phone': this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.authService.login(loginCredentials).subscribe(
      (result) => {
        console.log('result: ', result);
        this.navController.navigateRoot('/tabs/tab1');
        this.commonMethods.dismissLoader();
      },
      (error) => {
        console.error(error);
        this.commonMethods.presentToast('Network or Server Error', false);
        this.commonMethods.dismissLoader();
        this.navController.navigateRoot('/tabs/tab1');
      }
    );
  }
}
