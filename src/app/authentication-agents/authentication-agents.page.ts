import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from '../models/AuthModel';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'app-authentication-agents',
  templateUrl: './authentication-agents.page.html',
  styleUrls: ['./authentication-agents.page.scss'],
})
export class AuthenticationAgentsPage implements OnInit {
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  passwordType = 'password';
  passwordIcon = 'eye-off';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  handleLogin() {
    const loginCredentials: LoginModel = {
      'email/phone': this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.authService.login(loginCredentials).subscribe(
      (result) => {
        console.log('result: ', result);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
