import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { QRCodeModule } from 'angularx-qrcode';
import { PagesModule } from './pages/pages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentesModule } from './componentes/componentes.module';

import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';
import { HTTP } from "@awesome-cordova-plugins/http/ngx"
import { register } from 'swiper/element/bundle';

register();

LOAD_WASM().subscribe();
@NgModule({
  declarations: [AppComponent],
  imports: [
  BrowserModule,
  IonicModule.forRoot(),
  AppRoutingModule,
  QRCodeModule,
  PagesModule,
  ComponentesModule,
  FormsModule,
  ReactiveFormsModule,
  NgxScannerQrcodeModule,
],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, HTTP],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
