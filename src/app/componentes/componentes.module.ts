import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';
import { FormsModule } from '@angular/forms';
import { DetallesComponent } from './detalles/detalles.component';
import { FotosVehiculoComponent } from './fotos-vehiculo/fotos-vehiculo.component';

@NgModule({
  declarations: [
    DetallesComponent,
    FotosVehiculoComponent,
  ],
  imports: [
    CommonModule,
    QRCodeModule,
    IonicModule,
    FormsModule,
  ]
})
export class ComponentesModule { }
