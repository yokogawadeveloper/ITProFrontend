import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApprovallistdetailsPageRoutingModule } from './approvallistdetails-routing.module';

import { ApprovallistdetailsPage } from './approvallistdetails.page';
import { FormGroup ,ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ApprovallistdetailsPageRoutingModule
  ],
  declarations: [ApprovallistdetailsPage]
})
export class ApprovallistdetailsPageModule {}
