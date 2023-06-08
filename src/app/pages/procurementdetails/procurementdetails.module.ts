import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProcurementdetailsPageRoutingModule } from './procurementdetails-routing.module';
import { ProcurementdetailsPage } from './procurementdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProcurementdetailsPageRoutingModule
  ],
  declarations: [ProcurementdetailsPage]
})
export class ProcurementdetailsPageModule {}
