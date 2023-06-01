import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

// Import the module
import { HttpClientModule } from '@angular/common/http';
import { NgToastModule, } from 'ng-angular-popup';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    HttpClientModule,
    NgToastModule,


  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
