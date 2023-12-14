import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, FormBuilder, FormGroup, FormControl, NgControl, Validators, FormControlName } from '@angular/forms';

import { HomePageRoutingModule } from './home-routing.module';
import { QRCodeModule } from 'angularx-qrcode';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomePage } from './home.page';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    QRCodeModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
