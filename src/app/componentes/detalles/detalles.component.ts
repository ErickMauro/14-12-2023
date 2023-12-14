import { observaciones_choques_raspaduras } from './../../models.module';
import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { observaciones } from 'src/app/models.module';
import { CrudService } from 'src/app/services/crud.service';
import { InteractionService } from 'src/app/services/interaction.service';
@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss'],
})
export class DetallesComponent implements OnInit {
@Input() detalle!: observaciones_choques_raspaduras;
@Input() titulo: any;
position: any;
apiUrlCheckListDetalle = 'https://tcentral.mx/tc/api_pruebas/api_check_list_detalle.php';
  constructor(
    public modal: ModalController,
    public crudService: CrudService,
    public interaction: InteractionService,
    public alertController: AlertController,
  ) {
  }

  ngOnInit() {
    console.log('detalles: ', this.crudService.observacionesChoquesRaspaduras);
    console.log('detalle: ', this.detalle);
    console.log('titulo: ', this.titulo);
  }

  closeModal(){
    this.modal.dismiss();
  }

  async eliminarDetalle(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¿Desea eliminar la observación?',
//      message: '¿Desea guardar la observación?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          id: 'confirm-button',
          handler: (handler) => {
          }
        }, {
          text: 'Eliminar',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (alertData) => {
            console.log('eliminarDetalle() this.crudService.observacionesChoquesRaspaduras ', this.crudService.observacionesChoquesRaspaduras);
            const detalle = this.crudService.observacionesChoquesRaspaduras.find( (ChangePersonaje: observaciones_choques_raspaduras, index) => {
              this.position = index;
              console.log('Position ', this.position);
              console.log('Index ', index);
              console.log('ChangePersonaje ', ChangePersonaje);
              return (ChangePersonaje.numero === this.detalle.numero);
            });
            console.log('eliminarDetalle() this.crudService.observacionesChoquesRaspaduras ', this.crudService.observacionesChoquesRaspaduras);
            console.log('detalle ', detalle);
            if(detalle !== undefined){
              console.log('detalle !== undefined');
              console.log('Position ', this.position);
                    this.crudService.observacionesChoquesRaspaduras.splice(this.position, 1);
                    const detalle = this.crudService.observacionesChoquesRaspaduras.find( (ChangePersonaje: observaciones_choques_raspaduras, index) => {
                      if(index >= this.position && index > 0){
                      ChangePersonaje.id = ChangePersonaje.id - 1;
                      ChangePersonaje.numero = ChangePersonaje.numero - 1;
                      }
                      return (index >= this.position);
                    });
            }
            console.log('eliminarDetalle() this.crudService.observacionesChoquesRaspaduras ', this.crudService.observacionesChoquesRaspaduras);
            console.log('detalles: ', this.crudService.observacionesChoquesRaspaduras);
            this.crudService.detalle.observaciones_choques_raspaduras = JSON.stringify(this.crudService.observacionesChoquesRaspaduras);
            console.log('crudService.detalle.observaciones_choques_raspaduras ', this.crudService.detalle.observaciones_choques_raspaduras);
            if(this.crudService.detalle.observaciones_choques_raspaduras = '[]'){
            this.crudService.detalle.observaciones_choques_raspaduras = '';
            this.crudService.deleteItemDetalle(this.apiUrlCheckListDetalle, this.crudService.detalle.id);
            console.log('detalles: ', this.crudService.detalle.observaciones_choques_raspaduras);
            this.modal.dismiss();
        }
        },
      }
      ],
    });
    await alert.present();
}
}


