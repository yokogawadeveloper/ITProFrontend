import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApprovallistPageRoutingModule } from './approvallist-routing.module';

import { ApprovallistPage } from './approvallist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApprovallistPageRoutingModule
  ],
  declarations: [ApprovallistPage]
})
export class ApprovallistPageModule {}
