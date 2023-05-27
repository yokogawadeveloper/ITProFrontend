import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcurementPage } from './procurement.page';

const routes: Routes = [
  {
    path: '',
    component: ProcurementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcurementPageRoutingModule {}
