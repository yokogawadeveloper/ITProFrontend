import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ProcurementPageRoutingModule } from './procurement-routing.module';

import { ProcurementPage } from './procurement.page';

// Import the module
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProcurementPageRoutingModule
  ],
  declarations: [ProcurementPage]
})
export class ProcurementPageModule {}
