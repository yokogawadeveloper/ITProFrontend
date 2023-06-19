import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatemodificationPage } from './updatemodification.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatemodificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatemodificationPageRoutingModule {}
