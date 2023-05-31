import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcurementviewPage } from './procurementview.page';

const routes: Routes = [
  {
    path: '',
    component: ProcurementviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcurementviewPageRoutingModule {}
