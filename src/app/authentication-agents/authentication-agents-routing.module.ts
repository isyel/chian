import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationAgentsPage } from './authentication-agents.page';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationAgentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationAgentsPageRoutingModule {}
