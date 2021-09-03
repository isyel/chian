import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentPageRoutingModule } from './payment-routing.module';

import { PaymentPage } from './payment.page';
import { ComponentsModule } from '../components/components.module';
import { Angular4PaystackModule } from 'angular4-paystack';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentPageRoutingModule,
    ComponentsModule,
    Angular4PaystackModule.forRoot(
      'pk_test_99174bdc94618967e07f45a39877eb33e54c6545'
    ),
  ],
  declarations: [PaymentPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PaymentPageModule {}
