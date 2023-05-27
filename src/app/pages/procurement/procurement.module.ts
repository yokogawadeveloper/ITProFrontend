import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ProcurementPageRoutingModule } from './procurement-routing.module';

import { ProcurementPage } from './procurement.page';

// Import the module
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewhireformModule } from '../../component/newhireform/newhireform.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProcurementPageRoutingModule,
    NewhireformModule,
  ],
  declarations: [ProcurementPage],

  

  
})
export class ProcurementPageModule {}
