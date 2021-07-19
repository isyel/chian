import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthenticationPageRoutingModule } from './authentication-routing.module';

import { AuthenticationPage } from './authentication.page';
import { ComponentsModule } from '../components/components.module';
import { AuthenticationService } from '../services/authentication/authentication.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthenticationPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [AuthenticationPage],
  providers: [AuthenticationService],
})
export class AuthenticationPageModule {}
