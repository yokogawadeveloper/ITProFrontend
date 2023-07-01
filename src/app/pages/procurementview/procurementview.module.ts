import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcurementviewPageRoutingModule } from './procurementview-routing.module';

import { ProcurementviewPage } from './procurementview.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProcurementviewPageRoutingModule,
    NgxDatatableModule,
  ],
  declarations: [ProcurementviewPage]
})
export class ProcurementviewPageModule {}
