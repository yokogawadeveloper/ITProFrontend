import { NgModule } from '@angular/core';
import { NewhireformComponent } from './newhireform.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgToastModule } from 'ng-angular-popup';




@NgModule({
  declarations: [NewhireformComponent],
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgToastModule,

  ],
  exports: [NewhireformComponent],
})
export class NewhireformModule {}