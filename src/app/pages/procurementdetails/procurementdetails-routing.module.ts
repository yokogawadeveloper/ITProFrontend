import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcurementdetailsPage } from './procurementdetails.page';

const routes: Routes = [
  {
    path: '',
    component: ProcurementdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcurementdetailsPageRoutingModule {}
