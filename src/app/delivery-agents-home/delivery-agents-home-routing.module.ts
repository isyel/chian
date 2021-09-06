import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryAgentsHomePage } from './delivery-agents-home.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryAgentsHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryAgentsHomePageRoutingModule {}
