import { NgModule } from '@angular/core';
import { StockmanagementformComponent } from './stockmanagementform.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgToastModule } from 'ng-angular-popup';



@NgModule({
  declarations: [StockmanagementformComponent],
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgToastModule,

  ],
  exports: [StockmanagementformComponent],
})
export class StockmanagementformModule {}