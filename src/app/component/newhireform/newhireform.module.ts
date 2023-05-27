import { NgModule } from '@angular/core';
import { NewhireformComponent } from './newhireform.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [NewhireformComponent],
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

  ],
  exports: [NewhireformComponent],
})
export class NewhireformModule {}