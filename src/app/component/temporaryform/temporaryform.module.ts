import { NgModule } from '@angular/core';
import { TemporaryformComponent } from './temporaryform.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgToastModule } from 'ng-angular-popup';



@NgModule({
  declarations: [TemporaryformComponent],
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

  ],
  exports: [TemporaryformComponent],
})
export class TemporaryformModule {}