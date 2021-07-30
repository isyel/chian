import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthenticationAgentsPageRoutingModule } from './authentication-agents-routing.module';

import { AuthenticationAgentsPage } from './authentication-agents.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AuthenticationAgentsPageRoutingModule,
  ],
  declarations: [AuthenticationAgentsPage],
})
export class AuthenticationAgentsPageModule {}
