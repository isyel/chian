import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthenticationPageRoutingModule } from './authentication-routing.module';

import { AuthenticationPage } from './authentication.page';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { CommonMethods } from '../util/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthenticationPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AuthenticationPage],
  providers: [AuthenticationService, CommonMethods],
})
export class AuthenticationPageModule {}
