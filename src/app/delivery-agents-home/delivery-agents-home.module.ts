import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryAgentsHomePageRoutingModule } from './delivery-agents-home-routing.module';

import { DeliveryAgentsHomePage } from './delivery-agents-home.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryAgentsHomePageRoutingModule,
    ComponentsModule,
  ],
  declarations: [DeliveryAgentsHomePage],
})
export class DeliveryAgentsHomePageModule {}
