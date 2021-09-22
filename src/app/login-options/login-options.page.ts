import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavparamService } from '../services/navparam/navparam.service';

@Component({
  selector: 'app-login-options',
  templateUrl: './login-options.page.html',
  styleUrls: ['./login-options.page.scss'],
})
export class LoginOptionsPage implements OnInit {
  constructor(
    private router: Router,
    private navParamService: NavparamService
  ) {}

  ngOnInit() {}

  goToLogin(userType: string) {
    this.navParamService.navData = userType;
    this.router.navigate(['/authentication']);
  }
}
