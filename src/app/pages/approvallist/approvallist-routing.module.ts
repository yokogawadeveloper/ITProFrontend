import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApprovallistPage } from './approvallist.page';

const routes: Routes = [
  {
    path: '',
    component: ApprovallistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprovallistPageRoutingModule {}
