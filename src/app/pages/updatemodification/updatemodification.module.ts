import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatemodificationPageRoutingModule } from './updatemodification-routing.module';

import { UpdatemodificationPage } from './updatemodification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UpdatemodificationPageRoutingModule
  ],
  declarations: [UpdatemodificationPage]
})
export class UpdatemodificationPageModule { }
