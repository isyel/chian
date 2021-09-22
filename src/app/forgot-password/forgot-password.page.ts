import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ForgotPasswordModel, PasswordUpdateModel } from '../models/AuthModel';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { CommonMethods } from '../util/common';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  forgotPasswordForm: FormGroup;
  updatePasswordForm: FormGroup;
  resetPasswordForm = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    public commonMethods: CommonMethods,
    private navController: NavController
  ) {
    this.forgotPasswordForm = this.formBuilder.group({
      emailOrPhonenumber: ['', Validators.required],
    });

    this.updatePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      token: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit() {}

  requestPasswordReset() {
    this.commonMethods.presentLoading();
    const forgotPassword: ForgotPasswordModel = {
      email: this.forgotPasswordForm.value.emailOrPhonenumber,
    };
    this.authService.forgotPassword(forgotPassword).subscribe(
      (result) => {
        this.resetPasswordForm = true;
        this.commonMethods.dismissLoader();
        console.log('Result: ', result);
      },
      (error) => {
        this.commonMethods.dismissLoader();
        console.error(error);
        this.commonMethods.presentAlert(
          this.commonMethods.hasErrorProperties(error),
          'Network or Server Error'
        );
      }
    );
  }

  resetPassword() {
    this.commonMethods.presentLoading();
    const resetPassword: PasswordUpdateModel = {
      email: this.forgotPasswordForm.value.emailOrPhonenumber,
      token: this.forgotPasswordForm.value.token,
      password: this.forgotPasswordForm.value.password,
    };
    this.authService.resetPassword(resetPassword).subscribe(
      (result) => {
        this.commonMethods.dismissLoader();
        console.log('Result: ', result);
        this.navController.navigateRoot('/authentication');
      },
      (error) => {
        this.commonMethods.dismissLoader();
        console.error(error);
        this.commonMethods.presentAlert(
          this.commonMethods.hasErrorProperties(error),
          'Network or Server Error'
        );
      }
    );
  }
}
