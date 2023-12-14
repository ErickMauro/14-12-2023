import { Injectable } from '@angular/core';
import { Item, check_list_cab, check_list_detalle, check_list_vehiculo, observaciones_choques_raspaduras, Detalle_post } from '../models.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { InteractionService } from './interaction.service';
import { CrudService } from './crud.service';
import { Router } from '@angular/router';
import { drawCircleExport } from '../pages/checklist/checklist.component';
//console.log(detalles);
@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  observacionesChoquesRaspaduras: observaciones_choques_raspaduras[] = [];
  ctx: any;
  subscriberVehiculo!: Subscription;
  subscribeDetalle!: Subscription;
  constructor(
    private http: HttpClient,
    public interactionService: InteractionService,
    public crudService: CrudService,
    public router: Router,
  ) {
  }

  loadItemCheckListVehiculo(apiUrl: any, id: string) {
    console.log('id ', id);
    console.log('loadItem()');
   this.crudService.getItemCheckListVehiculo(apiUrl, id);
  }


  loadItemCheckListDetalle(apiUrl: any, id: any) {
    console.log('loadItemCheckListDetalle id ', id);
    console.log('loadItem()');
    this.crudService.getItemCheckListDetalle(apiUrl, id);
  }
}
/*
export function json(detalle: string){
  console.log('JSON detalle ', detalle);
  const fixedDetalle = detalle.replace(/'/g, '"').replace(/(\w+):/g, '"$1":');
  observacionesChoquesRaspaduras = JSON.parse(fixedDetalle);
  console.log('JSON parse observacionesChoquesRaspaduras ', observacionesChoquesRaspaduras);
}
 */
