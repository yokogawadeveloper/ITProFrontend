import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgToastModule } from 'ng-angular-popup';
// Import the module 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, } from '@angular/common/http';
import { NewhireformModule } from './component/newhireform/newhireform.module';
import { ReplacementformModule } from './component/replacementform/replacementform.module';
import { StockmanagementformModule } from './component/stockmanagementform/stockmanagementform.module';
import { TemporaryformModule } from './component/temporaryform/temporaryform.module';
// attachmentsform component form modal

import { AttachmentsformComponent } from './modal/attachmentsform/attachmentsform.component';






@NgModule({
  declarations: [
    AppComponent,
    AttachmentsformComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxDatatableModule,
    NgToastModule,
    //register component
    NewhireformModule,
    ReplacementformModule,
    StockmanagementformModule,
    TemporaryformModule,

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
