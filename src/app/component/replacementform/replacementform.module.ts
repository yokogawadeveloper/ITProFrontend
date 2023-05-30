import { NgModule } from '@angular/core';
import { ReplacementformComponent } from './replacementform.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [ReplacementformComponent],
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

  ],
  exports: [ReplacementformComponent],
})
export class ReplacementformModule {}