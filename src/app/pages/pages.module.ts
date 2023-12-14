import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageModule } from '../home/home.module';
import { ChecklistComponent } from './checklist/checklist.component';
import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';

LOAD_WASM().subscribe();

@NgModule({
  declarations: [
    LoginComponent,
    MenuComponent,
    ChecklistComponent,
  ],
  imports: [
    CommonModule,
    HomePageModule,
    IonicModule,
    QRCodeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxScannerQrcodeModule,
  ],
  exports: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule { }
