import { CrudService } from 'src/app/services/crud.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, NgModule, AfterViewChecked, DoCheck } from '@angular/core';
import { check_list_detalle, estado_vehiculo, check_list_cab, check_list_vehiculo, observaciones_choques_raspaduras, fotos_vehiculo } from './../../models.module';
import { IonModal, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Capacitor } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { DetallesComponent } from 'src/app/componentes/detalles/detalles.component';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { Router } from '@angular/router';
import SignaturePad from 'signature_pad';
import parseISO from 'date-fns/parseISO';
import { format } from 'date-fns';
import { Camera, CameraResultType } from '@capacitor/camera';
import { IonicSlides } from '@ionic/angular';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types';

let ctx_export: any;
let crud_service: any = CrudService;
export let signature_pad: any;
@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
})
export class ChecklistComponent  implements OnInit, AfterViewInit {
fileSelected($event: Event) {
throw new Error('Method not implemented.');
}
docUpload($event: Event) {
throw new Error('Method not implemented.');
}
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('myCanvasVehiculo') canvasVehiculoRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('myCanvasVehiculo1') fotoVehiculo1!: ElementRef<HTMLCanvasElement>;
  @ViewChild('myCanvasVehiculo2') fotoVehiculo2!: ElementRef<HTMLCanvasElement>;
  @ViewChild('myCanvasVehiculo3') fotoVehiculo3!: ElementRef<HTMLCanvasElement>;
  @ViewChild('myCanvasVehiculo4') fotoVehiculo4!: ElementRef<HTMLCanvasElement>;
  estado_vehiculo: estado_vehiculo[] = ['B' , 'M' , 'NA' , 'NN'];
//   observaciones: { id: number, numero: number, titulo: string, detalles: string, x: number, y: number, medida: number, figura: string }[] = [];
    detalle: { id: number, numero: number, titulo: string, detalles: string, x: number, y: number, medida: number, figura: string }[] = [];
  observacion = {
    id: 0,
    numero: 0,
    titulo: '',
    detalles: '',
    x: 0,
    y: 0,
    medida: 0,
    figura: '',
  };
  check_list_vehiculo: check_list_vehiculo = {
    tipo_vehiculo: '',
    area: '',
    n_economico: 0,
    conductor: '',
    placa: '',
    empresa: '',
    fecha: '',
    vin: '',
    kilometraje: 0,
    marca: '',
  }
  check_list_detalle: check_list_detalle = {
    id: 0,
    gato: '',
    herramientas: '',
    triangulos: '',
    tapetes: '',
    antena: '',
    emblemas: '',
    tapones_rueda: '',
    cables: '',
    estereo: '',
    encendedor: '',
    llanta_relacion: '',
    extintor: '',

    luz_delantera_alta: '',
    luz_delantera_baja: '',
    luces_emergencia: '',
    luces_neblineros: '',
    luz_direccional: '',
    luz_freno_posterior: '',
    parabrisas_delantero: '',
    medallon_trasero: '',
    limpia_parabrisas: '',
    espejos_laterales: '',
    espejo_retrovisor: '',
    estado_tablero: '',
    freno_mano: '',
    freno_servicio: '',
    cinturon_seguridad_chofer: '',
    cinturon_seguridad_copiloto: '',
    cinturon_seguridad_asiento_posterior: '',
    espejo_retrovisor_antideslumbrante: '',
    linterna_mano: '',
    orden_limpieza_cabina: '',
    direccion: '',
    llanta_delantera_derecha: '',
    llanta_delantera_izquierda: '',
    llanta_posterior_derecha: '',
    llanta_posterior_izquierda: '',
    llanta_repuesto: '',
    conos_seguridad: '',
    accesorios_seguridad_extintor: '',
    alarma_retrosesos: '',
    claxon: '',
    tapa_tanque_gasolina: '',
    gato_hidraulico: '',
    herramientas_llaves_ruedas: '',
    cables_pasa_corriente: '',
    observaciones: '',

//    observaciones_choques_raspaduras: [{ id: 0, numero: 0, titulo: '', detalles: '', x: 0, y: 0, medida: 0, figura: '' }],
    observaciones_choques_raspaduras: '',

    autoriza_conductor: '',
    autoriza_supervisor: '',

    fotos_vehiculo: '',
  }
  post_detalle: boolean = true;
  post_vehiculo: boolean = true;

  hideGeneral: boolean = false;
  hideInventario: boolean = false;
  hideSistemaLuces: boolean = false;
  hideParteExterna: boolean = false;
  hideParteInterna: boolean = false;
  hideEstadoLlantas: boolean = false;
  hideAccesoriosSeguridad: boolean = false;
  hideTapasOtros: boolean = false;
  foto: any;

  name: string = '';
  ctx: any;
  ctx1: any;
  ctx2: any;
  ctx3: any;
  ctx4: any;
  apiUrlCheckListDetalle = 'https://tcentral.mx/tc/api_pruebas/api_check_list_detalle.php';
  apiUrlCheckListVehiculo = 'https://tcentral.mx/tc/api_pruebas/api_check_list_vehiculos.php';
//apiUrlCheckListVehiculo = 'https://tcentral.mx/tc/api_pruebas/api_check_list_vehiculos.php';
position: any;
slideOpts = {
  /*
      initialSlide: 0,
      speed: 400,
      loop: true,
      autoplay: 1,
      watchSlidesProgress: true,
  */
    };
  tamañoObservacion: any;

  signaturePad!: SignaturePad;
  @ViewChild('canvas') canvasEl! : ElementRef;
  signatureImg!: string;
  observacion_detalle!: observaciones_choques_raspaduras;

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png",
    maxSize: "1",
    uploadAPI:  {
      url:"https://example-file-upload-api",
      method:"POST",
      headers: {
     "Content-Type" : "text/plain;charset=UTF-8",
      },
      params: {
        'page': '1'
      },
      responseType: 'blob',
      withCredentials: false,
    },
    theme: "dragNDrop",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true,
    fileNameIndex: true,
    autoUpload: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Attach Files...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
};
resetVar: any;
swiperModules = [IonicSlides];
isModalOpen = false;

  constructor(
    public alertController: AlertController,
    public modalController: ModalController,
    public vehiculoService: VehiculoService,
    public interactionService: InteractionService,
    public router: Router,
    public crudService: CrudService,
  ) {
/*
    const swiper = new Swiper('.slides', {
      init: false,
      autoplay: {
        delay: 3000,
      },
     });
 */
    const fecha = new Date();
    console.log('fecha ', fecha);
    const current_year = new Date().getFullYear();
    console.log('current_year ', current_year);
    const current_month = fecha.toLocaleString("en-US", { month: "short" });
    console.log('current_month ', current_month);
    const current_day = new Date().getDate();
    console.log('current_day ', current_day);
    const current_date = current_day+' '+current_month+' '+current_year;
    console.log('current_date ', current_date);

    console.log('crudService.cabecero.vin ', this.crudService.cabecero.vin);
    console.log('crudService.cabecero.id ', this.crudService.cabecero.id);
    if(this.crudService.post_detalle === true){
    this.crudService.detalle.gato = 'false';
    this.crudService.detalle.herramientas = 'false';
    this.crudService.detalle.triangulos = 'false';
    this.crudService.detalle.tapetes = 'false';
    this.crudService.detalle.antena = 'false';
    this.crudService.detalle.emblemas = 'false';
    this.crudService.detalle.tapones_rueda = 'false';
    this.crudService.detalle.cables = 'false';
    this.crudService.detalle.estereo = 'false';
    this.crudService.detalle.encendedor = 'false';
    this.crudService.detalle.llanta_relacion = 'false';
    this.crudService.detalle.extintor = 'false';
    }
//    this.detalle = json_decode(this.vehiculoService.detalle.observaciones);
//      this.detalle = JSON.parse(this.vehiculoService.detalle.observaciones);
      console.log('this.detalle ', this.detalle);
      if(this.crudService.detalle.observaciones_choques_raspaduras){
      const fixedDetalle: string = this.crudService.detalle.observaciones_choques_raspaduras.replace(/'/g, '"').replace(/(\w+):/g, '"$1":');
      this.detalle = JSON.parse(fixedDetalle);
      }
      console.log('detalle JSON.parse ', this.detalle);
console.log('this.vehiculoService.vehiculo ', this.crudService.vehiculo);
console.log('this.vehiculoService.detalle ', this.crudService.detalle);

/*     this.vehiculoService.loadItemChekListVehiculo(this.apiUrlCheckListVehiculo, this.vehiculoService.cabecero.vin);
    this.vehiculoService.loadItemChekListDetalle(this.apiUrlCheckListDetalle, this.vehiculoService.cabecero.id); */
/*
    this.detalle.push({ id: 0, numero: 0, titulo: '', detalles: '', x: 0, y: 0, medida: 0, figura: ''  });
    console.log('detalle.length ', this.detalle.length);
    console.log('detalle ', this.detalle);
 */
    const observacion1 = {
      id: 0,
      numero: 0,
      titulo: 'Golpe',
      detalles: '',
      x: 0,
      y: 0,
      medida: 0,
      figura: '',
    };
  }

  onFileChange(event: any){
    console.log('onFileChange ', event);
//    this.crudService.detalle.autoriza_supervisor = event;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.crudService.detalle.autoriza_supervisor = event.target.files[0];
      console.log('file ', file);
      const formData = new FormData();
      console.log('formData ', formData);
      formData.append('image', file);
      console.log('formData ', formData);
//      this.crudService.uploadImage(formData);
      console.log('formData.append(image, file); ', formData.append('image', file));
    }
  }

  setOpen(isOpen: boolean, observacion: observaciones_choques_raspaduras) {
    this.isModalOpen = isOpen;
    this.observacion_detalle = observacion;
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
              return (ChangePersonaje.numero === this.observacion_detalle.numero);
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
            this.isModalOpen = false;
        }
        },
      }
      ],
    });
    await alert.present();
}

  drawFirma(): void {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
    signature_pad = this.signaturePad;
    console.log('this.canvasEl.nativeElement ', this.canvasEl.nativeElement);
    console.log('this.vehiculoService.cabecero ', this.crudService.cabecero);

    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    console.log('this.crudService.detalle ', this.crudService.detalle);
    console.log('this.crudService.detalle.autoriza_conductor ', this.crudService.detalle.autoriza_conductor);
    this.signaturePad.fromDataURL(this.crudService.detalle.autoriza_conductor, { ratio: 1, width: 300, height: 156, xOffset: 0, yOffset: 0 });
  }

  ngDoCheck(){
  }

  setupCanvas() {
    const img = new Image();
//    img.src = "../../../assets/vehiculo.png";

    const canvas = this.canvasVehiculoRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    if(this.ctx){
      img.onload = () => {
      canvas.width = 400;
      canvas.height = 250;
      this.ctx.drawImage(img, 0, 0, 350, 250);
      console.log('Check List Component vehiculoService.cabecero ', this.crudService.cabecero);
//      drawCircle(this.ctx, 250, 81.0625, 10, this.check_list_detalle.observaciones_choques_raspaduras);
this.vehiculoService.loadItemCheckListVehiculo(this.apiUrlCheckListVehiculo, this.crudService.cabecero.vin);
this.vehiculoService.loadItemCheckListDetalle(this.apiUrlCheckListDetalle, this.crudService.cabecero.id)
    };
    img.src = "https://firebasestorage.googleapis.com/v0/b/tallergeneral-8b096.appspot.com/o/vehiculo.png?alt=media&token=c05ac491-5238-41a1-9e5f-175028ab64e7";
    console.log('img ', img);
  }
  this.crudService.ctx = this.ctx;
  ctx_export = this.ctx;
/*   this.vehiculoService.loadItemChekListVehiculo(this.apiUrlCheckListVehiculo, this.vehiculoService.cabecero.vin);
  this.vehiculoService.loadItemChekListDetalle(this.apiUrlCheckListDetalle, this.vehiculoService.cabecero.id); */
  }
/*
  setupCanvas1() {
    console.log('setupCanvas1()');
    const img = new Image();
    const canvas = this.fotoVehiculo1.nativeElement;
    this.ctx1 = canvas.getContext('2d');
    if(this.ctx1){
      img.onload = () => {
      canvas.width = 400;
      canvas.height = 250;
      this.ctx1.drawImage(img, 0, 0, 400, 250);
    };
    console.log('this.crudService.foto_vehiculo_1 ', this.crudService.foto_vehiculo_1);
    img.src = this.crudService.foto_vehiculo_1.imagen;
    console.log('img.src ', img.src);
    console.log('img ', img);
  }
  }

  setupCanvas2() {
    console.log('setupCanvas2()');
    const img = new Image();
    const canvas = this.fotoVehiculo2.nativeElement;
    this.ctx2 = canvas.getContext('2d');
    if(this.ctx2){
      img.onload = () => {
      canvas.width = 400;
      canvas.height = 250;
      this.ctx2.drawImage(img, 0, 0, 400, 250);
    };
    img.src = this.crudService.foto_vehiculo_2.imagen;
    console.log('this.crudService.foto_vehiculo_2 ', this.crudService.foto_vehiculo_2);
    console.log('img.src ', img.src);
    console.log('img ', img);
  }
  }

  setupCanvas3() {
    console.log('setupCanvas3()');
    const img = new Image();
    const canvas = this.fotoVehiculo3.nativeElement;
    this.ctx3 = canvas.getContext('2d');
    if(this.ctx3){
      img.onload = () => {
      canvas.width = 400;
      canvas.height = 250;
      this.ctx3.drawImage(img, 0, 0, 400, 250);
    };
    img.src = this.crudService.foto_vehiculo_3.imagen;
    console.log('this.crudService.foto_vehiculo_3 ', this.crudService.foto_vehiculo_3);
    console.log('img.src ', img.src);
    console.log('img ', img);
  }
  }

  setupCanvas4() {
    console.log('setupCanvas4()');
    const img = new Image();
    const canvas = this.fotoVehiculo4.nativeElement;
    this.ctx4 = canvas.getContext('2d');
    if(this.ctx4){
      img.onload = () => {
      canvas.width = 400;
      canvas.height = 250;
      this.ctx4.drawImage(img, 0, 0, 400, 250);
    };
    img.src = this.crudService.foto_vehiculo_4.imagen;
    console.log('this.crudService.foto_vehiculo_4 ', this.crudService.foto_vehiculo_4);
    console.log('img.src ', img.src);
    console.log('img ', img);
  }
  }
 */
  startDrawing(event: Event) {
    console.log('startDrawing ', event);
    /*
    changedTouches
:
TouchList
0
:
Touch
clientX
:
43.12919235229492
clientY
:
546.2648315429688
force
:
1
identifier
:
0
pageX
:
43.12919235229492
pageY
:
546.2648315429688
radiusX
:
12.72321605682373
radiusY
:
12.72321605682373
rotationAngle
:
0
screenX
:
43.129188537597656
screenY
:
587.6934204101562
    */
  }

  moved(event: Event) {
  }

  obtenerFecha( event: CustomEvent ){
    console.log('event', event);
    console.log('event.detail.value', event.detail.value);
    const fecha = format(parseISO(event.detail.value), 'dd MMM yyyy');
    console.log('fecha ', fecha);
  }

  async clearPad() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¿Desea borrar la firma?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          id: 'confirm-button',
          handler: (handler) => {
          }
        }, {
          text: 'Borrar',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (alertData) => {
            this.signaturePad.clear();
        },
      }
      ],
    });
    await alert.present();
  }

  savePad() {
    console.log('this.signaturePad.toDataURL(); ', this.signaturePad.toDataURL());
    const base64Data = this.signaturePad.toDataURL();
    const base64DataImage = this.signaturePad.toDataURL('image/png')
    console.log('base64DataImage ', base64DataImage);
    this.signatureImg = base64Data;
    this.crudService.detalle.autoriza_conductor = base64Data;
    console.log('this.signatureImg ', this.signatureImg);
  }

  async ngAfterViewInit() {
    this.drawFirma();
    this.setupCanvas();
/*     const rect = (event.target as HTMLImageElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

/*
    console.log('this.canvasRef ', this.canvasRef);
    if (this.canvasRef) {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');

    if (context) {
      console.log('context ', context);
      const ctx2 = this.canvasRef.nativeElement;
      const ctx = ctx2.getContext('2d');
      context.beginPath();
      context.moveTo(10, 10);
      context.lineTo(100, 100);
      context.stroke();
      if(ctx){
      console.log('ctx ', ctx);
      ctx.fillRect(25, 25, 100, 100);
      ctx.clearRect(45, 45, 60, 60);
      ctx.strokeRect(50, 50, 50, 50);
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#f00";
      ctx.beginPath();
      ctx.moveTo(20, 130);
      ctx.lineTo(230, 20);
      ctx.stroke();
      }
    }
  }
 */
  }

  changeTamañoObservacion(e: any){
    console.log('e ', e);
    this.tamañoObservacion = e;
  }

  async onImageClick(event: MouseEvent) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¿Desea guardar la observación?',
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
          text: 'Guardar',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (alertData) => {
            const rect = (event.target as HTMLImageElement).getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            console.log(`Clicked at x: ${x}, y: ${y}`);
            console.log('crudService.observacionesChoquesRaspaduras.length ', this.crudService.observacionesChoquesRaspaduras.length);
            this.crudService.observacionesChoquesRaspaduras.push({
              id: this.crudService.observacionesChoquesRaspaduras.length+1,
              numero: this.crudService.observacionesChoquesRaspaduras.length+1,
              titulo: alertData.titulo,
              detalles: alertData.detalle,
              foto_detalle: alertData.foto_detalle,
              x, y, medida: 10, figura: 'fill'  });
              console.log('detalle JSON.parse ', this.detalle);
            console.log('checklist.observaciones_choques_raspaduras ', this.check_list_detalle.observaciones_choques_raspaduras);
            const vehiculoJson = JSON.stringify(this.crudService.observacionesChoquesRaspaduras);
            this.crudService.detalle.observaciones_choques_raspaduras = vehiculoJson;
            console.log('crudService.detalle.observaciones_choques_raspaduras = vehiculoJson ', this.crudService.detalle.observaciones_choques_raspaduras);
            drawCircle(this.ctx, x, y, 10, this.crudService.observacionesChoquesRaspaduras.length);
          }
        },
      ],
      inputs: [
          {
            label: 'Título',
            name: 'titulo',
            placeholder: 'Añade un título',
            attributes: {
            },
            handler: (titulo) => {
              console.log('Título ', titulo);
            }
          },
          {
            label: 'Detalle',
            name: 'detalle',
            placeholder: 'Añade algún detalle',
            type: 'textarea',
            attributes: {
            },
            handler: (detalle) => {
              console.log('Detalle ', detalle);
            }
          },
      ]
    });
    await alert.present();

/*    this.check_list_detalle.observaciones_choques_raspaduras.push({ id: this.check_list_detalle.observaciones_choques_raspaduras.length+1, numero: this.check_list_detalle.observaciones_choques_raspaduras.length+1, titulo: 'Raspadura', detalles: 'Raspadura ligera', x: 80, y: 81.6,
      medida: 5, figura: 'fill'  });
    console.log('this.check_list_detalle.observaciones_choques_raspaduras.length ', this.check_list_detalle.observaciones_choques_raspaduras.length); */
  }

  ngOnInit() {}

  changeCheckbox_gato(e: any, check: string){
    //    console.log('this.check_list_detalle[check]: ', this.check_list_detalle[check]);
        console.log('check ', check);
        console.log('e: ', e.detail.checked);
        if(e.detail.checked === true){
          this.crudService.detalle.gato = 'true';
        } else {
          this.crudService.detalle.gato = 'false';
        }
    //    console.log('this.check_list_detalle.gato ', this.check_list_detalle.gato);
      }
      changeCheckbox_herramientas(e: any, check: string){
        console.log('check ', check);
        console.log('e: ', e.detail.checked);
        if(e.detail.checked === true){
          this.crudService.detalle.herramientas = 'true';
        } else {
          this.crudService.detalle.herramientas = 'false';
        }
      }
      changeCheckbox_triangulos(e: any, check: string){
        console.log('check ', check);
        console.log('e: ', e.detail.checked);
        if(e.detail.checked === true){
          this.crudService.detalle.triangulos = 'true';
        } else {
          this.crudService.detalle.triangulos = 'false';
        }
      }
      changeCheckbox_tapetes(e: any, check: string){
        console.log('check ', check);
        console.log('e: ', e.detail.checked);
        if(e.detail.checked === true){
          this.crudService.detalle.tapetes = 'true';
        } else {
          this.crudService.detalle.tapetes = 'false';
        }
      }
      changeCheckbox_antena(e: any, check: string){
        console.log('check ', check);
        console.log('e: ', e.detail.checked);
        if(e.detail.checked === true){
          this.crudService.detalle.antena = 'true';
        } else {
          this.crudService.detalle.antena = 'false';
        }
      }
      changeCheckbox_emblemas(e: any, check: string){
        console.log('check ', check);
        console.log('e: ', e.detail.checked);
        if(e.detail.checked === true){
          this.crudService.detalle.emblemas = 'true';
        } else {
          this.crudService.detalle.emblemas = 'false';
        }
      }
      changeCheckbox_tapones_rueda(e: any, check: string){
        console.log('check ', check);
        console.log('e: ', e.detail.checked);
        if(e.detail.checked === true){
          this.crudService.detalle.tapones_rueda = 'true';
        } else {
          this.crudService.detalle.tapones_rueda = 'false';
        }
      }
      changeCheckbox_cables(e: any, check: string){
        console.log('check ', check);
        console.log('e: ', e.detail.checked);
        if(e.detail.checked === true){
          this.crudService.detalle.cables = 'true';
        } else {
          this.crudService.detalle.cables = 'false';
        }
      }
      changeCheckbox_estereo(e: any, check: string){
        console.log('check ', check);
        console.log('e: ', e.detail.checked);
        if(e.detail.checked === true){
          this.crudService.detalle.estereo = 'true';
        } else {
          this.crudService.detalle.estereo = 'false';
        }
      }
      changeCheckbox_encendedor(e: any, check: string){
        console.log('check ', check);
        console.log('e: ', e.detail.checked);
        if(e.detail.checked === true){
          this.crudService.detalle.encendedor = 'true';
        } else {
          this.crudService.detalle.encendedor = 'false';
        }
      }
      changeCheckbox_llanta_relacion(e: any, check: string){
        console.log('check ', check);
        console.log('e: ', e.detail.checked);
        if(e.detail.checked === true){
          this.crudService.detalle.llanta_relacion = 'true';
        } else {
          this.crudService.detalle.llanta_relacion = 'false';
        }
      }
      changeCheckbox_extintor(e: any, check: string){
        console.log('check ', check);
        console.log('e: ', e.detail.checked);
        if(e.detail.checked === true){
          this.crudService.detalle.extintor = 'true';
        } else {
          this.crudService.detalle.extintor = 'false';
        }
      }




      changeSelect_luz_delantera_alta(event: any, estado_vehiculo: any){
        console.log('changeSelect_luz_delantera_alta = ', event.detail.value);
        this.crudService.detalle.luz_delantera_alta = event.detail.value;
      }
      changeSelect_luz_delantera_baja(event: any, estado_vehiculo: any){
        console.log('changeSelect_luz_delantera_baja = ', event.detail.value);
        this.crudService.detalle.luz_delantera_baja = event.detail.value;
      }
      changeSelect_luces_emergencia(event: any, estado_vehiculo: any){
        console.log('changeSelect_luces_emergencia = ', event.detail.value);
        this.crudService.detalle.luces_emergencia = event.detail.value;
      }
      changeSelect_luces_neblineros(event: any, estado_vehiculo: any){
        console.log('changeSelect_luces_neblineros = ', event.detail.value);
        this.crudService.detalle.luces_neblineros = event.detail.value;
      }
      changeSelect_luz_direccional(event: any, estado_vehiculo: any){
        console.log('changeSelect_luz_direccional = ', event.detail.value);
        this.crudService.detalle.luz_direccional = event.detail.value;
      }
      changeSelect_luz_freno_posterior(event: any, estado_vehiculo: any){
        console.log('changeSelect_luz_freno_posterior = ', event.detail.value);
        this.crudService.detalle.luz_freno_posterior = event.detail.value;
      }
      changeSelect_parabrisas_delantero(event: any, estado_vehiculo: any){
        console.log('changeSelect_parabrisas_delantero = ', event.detail.value);
        this.crudService.detalle.parabrisas_delantero = event.detail.value;
      }
      changeSelect_medallon_trasero(event: any, estado_vehiculo: any){
        console.log('changeSelect_medallon_trasero = ', event.detail.value);
        this.crudService.detalle.medallon_trasero = event.detail.value;
      }
      changeSelect_limpia_parabrisas(event: any, estado_vehiculo: any){
        console.log('changeSelect_limpia_parabrisas = ', event.detail.value);
        this.crudService.detalle.limpia_parabrisas = event.detail.value;
      }
      changeSelect_espejos_laterales(event: any, estado_vehiculo: any){
        console.log('changeSelect_espejos_laterales = ', event.detail.value);
        this.crudService.detalle.espejos_laterales = event.detail.value;
      }
      changeSelect_espejo_retrovisor(event: any, estado_vehiculo: any){
        console.log('changeSelect_espejo_retrovisor = ', event.detail.value);
        this.crudService.detalle.espejo_retrovisor = event.detail.value;
      }
      changeSelect_estado_tablero(event: any, estado_vehiculo: any){
        console.log('changeSelect_estado_tablero = ', event.detail.value);
        this.crudService.detalle.estado_tablero = event.detail.value;
      }
      changeSelect_freno_mano(event: any, estado_vehiculo: any){
        console.log('changeSelect_freno_mano = ', event.detail.value);
        this.crudService.detalle.freno_mano = event.detail.value;
      }
      changeSelect_freno_servicio(event: any, estado_vehiculo: any){
        console.log('changeSelect_freno_servicio = ', event.detail.value);
        this.crudService.detalle.freno_servicio = event.detail.value;
      }
      changeSelect_cinturon_seguridad_chofer(event: any, estado_vehiculo: any){
        console.log('changeSelect_cinturon_seguridad_chofer = ', event.detail.value);
        this.crudService.detalle.cinturon_seguridad_chofer = event.detail.value;
      }
      changeSelect_cinturon_seguridad_copiloto(event: any, estado_vehiculo: any){
        console.log('changeSelect_cinturon_seguridad_copiloto = ', event.detail.value);
        this.crudService.detalle.cinturon_seguridad_copiloto = event.detail.value;
      }
      changeSelect_cinturon_seguridad_asiento_posterior(event: any, estado_vehiculo: any){
        console.log('changeSelect_cinturon_seguridad_asiento_posterior = ', event.detail.value);
        this.crudService.detalle.cinturon_seguridad_asiento_posterior = event.detail.value;
      }
      changeSelect_espejo_retrovisor_antideslumbrante(event: any, estado_vehiculo: any){
        console.log('changeSelect_espejo_retrovisor_antideslumbrante = ', event.detail.value);
        this.crudService.detalle.espejo_retrovisor_antideslumbrante = event.detail.value;
      }
      changeSelect_linterna_mano(event: any, estado_vehiculo: any){
        console.log('changeSelect_linterna_mano = ', event.detail.value);
        this.crudService.detalle.linterna_mano = event.detail.value;
      }
      changeSelect_orden_limpieza_cabina(event: any, estado_vehiculo: any){
        console.log('changeSelect_orden_limpieza_cabina = ', event.detail.value);
        this.crudService.detalle.orden_limpieza_cabina = event.detail.value;
      }
      changeSelect_direccion(event: any, estado_vehiculo: any){
        console.log('changeSelect_direccion = ', event.detail.value);
        this.crudService.detalle.direccion = event.detail.value;
      }
      changeSelect_llanta_delantera_derecha(event: any, estado_vehiculo: any){
        console.log('changeSelect_llanta_delantera_derecha = ', event.detail.value);
        this.crudService.detalle.llanta_delantera_derecha = event.detail.value;
      }
      changeSelect_llanta_delantera_izquierda(event: any, estado_vehiculo: any){
        console.log('changeSelect_llanta_delantera_izquierda = ', event.detail.value);
        this.crudService.detalle.llanta_delantera_izquierda = event.detail.value;
      }
      changeSelect_llanta_posterior_derecha(event: any, estado_vehiculo: any){
        console.log('changeSelect_llanta_posterior_derecha = ', event.detail.value);
        this.crudService.detalle.llanta_posterior_derecha = event.detail.value;
      }
      changeSelect_llanta_posterior_izquierda(event: any, estado_vehiculo: any){
        console.log('changeSelect_llanta_posterior_izquierda = ', event.detail.value);
        this.crudService.detalle.llanta_posterior_izquierda = event.detail.value;
      }
      changeSelect_llanta_repuesto(event: any, estado_vehiculo: any){
        console.log('changeSelect_llanta_repuesto = ', event.detail.value);
        this.crudService.detalle.llanta_repuesto = event.detail.value;
      }
      changeSelect_conos_seguridad(event: any, estado_vehiculo: any){
        console.log('changeSelect_conos_seguridad = ', event.detail.value);
        this.crudService.detalle.conos_seguridad = event.detail.value;
      }
      changeSelect_accesorios_seguridad_extintor(event: any, estado_vehiculo: any){
        console.log('changeSelect_accesorios_seguridad_extintor = ', event.detail.value);
        this.crudService.detalle.accesorios_seguridad_extintor = event.detail.value;
      }
      changeSelect_alarma_retrosesos(event: any, estado_vehiculo: any){
        console.log('changeSelect_alarma_retrosesos = ', event.detail.value);
        this.crudService.detalle.alarma_retrosesos = event.detail.value;
      }
      changeSelect_claxon(event: any, estado_vehiculo: any){
        console.log('changeSelect_claxon = ', event.detail.value);
        this.crudService.detalle.claxon = event.detail.value;
      }
      changeSelect_tapa_tanque_gasolina(event: any, estado_vehiculo: any){
        console.log('changeSelect_tapa_tanque_gasolina = ', event.detail.value);
        this.crudService.detalle.tapa_tanque_gasolina = event.detail.value;
      }
      changeSelect_gato_hidraulico(event: any, estado_vehiculo: any){
        console.log('changeSelect_gato_hidraulico = ', event.detail.value);
        this.crudService.detalle.gato_hidraulico = event.detail.value;
      }
      changeSelect_herramientas_llaves_ruedas(event: any, estado_vehiculo: any){
        console.log('changeSelect_herramientas_llaves_ruedas = ', event.detail.value);
        this.crudService.detalle.herramientas_llaves_ruedas = event.detail.value;
      }
      changeSelect_cables_pasa_corriente(event: any, estado_vehiculo: any){
        console.log('changeSelect_cables_pasa_corriente = ', event.detail.value);
        this.crudService.detalle.cables_pasa_corriente = event.detail.value;
      }
      changeSelect_observaciones(event: any, estado_vehiculo: any){
        console.log('changeSelect_observaciones = ', event.detail.value);
        this.crudService.detalle.observaciones = event.detail.value;
      }
      changeSelect_observaciones_choques_raspaduras(event: any, estado_vehiculo: any){
        console.log('changeSelect_observaciones_choques_raspaduras = ', event.detail.value);
        this.crudService.detalle.observaciones_choques_raspaduras = event.detail.value;
      }
      changeSelect_autoriza_conductor(event: any, estado_vehiculo: any){
        console.log('changeSelect_autoriza_conductor = ', event.detail.value);
        this.crudService.detalle.autoriza_conductor = event.detail.value;
      }
      changeSelect_autoriza_supervisor(event: any, estado_vehiculo: any){
        console.log('changeSelect_autoriza_supervisor = ', event.detail.value);
        this.crudService.detalle.autoriza_supervisor = event.detail.value;
      }



/*  */
  ocultarGeneral(){
    const general = 'hideGeneral';
    this[general] = !this[general];
  }

  ocultarInventario(){
    this.hideInventario = !this.hideInventario;
  }

  ocultarSistemaLuces(){
    this.hideSistemaLuces = !this.hideSistemaLuces;
  }

  ocultarParteExterna(){
    this.hideParteExterna = !this.hideParteExterna;
  }

  ocultarParteInterna(){
    this.hideParteInterna = !this.hideParteInterna;
  }

  ocultarEstadoLlantas(){
    this.hideEstadoLlantas = !this.hideEstadoLlantas;
  }

  ocultarAccesoriosSeguridad(){
    this.hideAccesoriosSeguridad = !this.hideAccesoriosSeguridad;
  }

  ocultarTapasOtros(){
    this.hideTapasOtros = !this.hideTapasOtros;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  changeTime(e: any){
    console.log('e: ', e);
  }

  onWillDismiss(event: Event) {
    this.isModalOpen = false;
    console.log('event ', event);
    this.ctx.reset();
    this.setupCanvas();
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.name = `Hello, ${ev.detail.data}!`;
    }
  }

  async seleccionarDetalle(detalle: observaciones_choques_raspaduras){
    console.log('Detalle ', detalle);
    this.detalle[0] = detalle;
    console.log('this.detalle ', detalle);

    const modal = await this.modalController.create({
      component: DetallesComponent,
      cssClass: 'modal',
//      initialBreakpoint: .5,
      componentProps: {detalle},
    });
    modal.onWillDismiss().then(()=>{
      this.ctx.reset();
      this.setupCanvas();
    });
    return await modal.present();
  }

  goBack(){
      this.router.navigate(['/menu']).then(() => {
      window.location.reload();
    });
  }


  async guardarDetalles(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¿Desea guardar los registros?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          id: 'confirm-button',
          handler: (handler) => {
          }
        }, {
          text: 'Guardar',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (alertData) => {
            this.savePad();
            console.log('this.vehiculoService.cabecero ', this.crudService.cabecero);
            this.crudService.detalle.id = this.crudService.cabecero.id;
            console.log('guardarDetalles() vehiculoService.detalle ', this.crudService.detalle);
            if(this.crudService.post_detalle === true){
            this.post_detalle = true;
            console.log('POST detalle');
            this.crudService.setItemCheckListDetalle(this.apiUrlCheckListDetalle, this.crudService.detalle);
            this.crudService.post_detalle = false;
            this.crudService.detalle.id = this.crudService.cabecero.id;
          } else {
            this.post_detalle = false;
            console.log('PUT detalle');
            this.crudService.updateItemDetalle(this.apiUrlCheckListDetalle, this.crudService.detalle);
          }
            console.log('guardarDetalles() vehiculoService.vehiculo ', this.crudService.vehiculo);
            if(this.crudService.post_vehiculo === true){
              this.post_vehiculo = true;
              console.log('POST vehiculo');
            this.crudService.setItemCheckListVehiculo(this.apiUrlCheckListVehiculo, this.crudService.vehiculo);
            this.crudService.vehiculo.vin = this.crudService.cabecero.vin;
            this.crudService.post_vehiculo = false;
            } else {
              this.post_vehiculo = false;
              console.log('PUT vehiculo');
               this.crudService.updateItemVehiculo(this.apiUrlCheckListVehiculo, this.crudService.vehiculo);
        //    this.crudService.updateItemCheckListVehiculo(this.apiUrlCheckListVehiculo, this.crudService.vehiculo);
            }
            if(this.post_detalle === true && this.post_vehiculo === true){
              this.interactionService.presentAlert('Registro guardado');
            } else {
              this.interactionService.presentAlert('Registro actualizado');
            }
        },
      }
      ],
    });
    await alert.present();


  }

  async newImage(event: any){
    console.log('newImage(e) ', event);

    if(event.target.files && event.target.files[0]){
//      this.newFileCategoria = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {

        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        this.crudService.formData = formData;
/*
        if(image.target){
        this.crudService.detalle.autoriza_supervisor = image.target.result as string;
        } */
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 10,
      resultType: CameraResultType.Base64,
    });
    console.log('image ', image);
    var imageUrl = image.webPath;
    this.foto = image.webPath;
    this.crudService.detalle.autoriza_supervisor = imageUrl!;
  console.log('this.crudService.detalle.autoriza_supervisor ', this.crudService.detalle.autoriza_supervisor);
  console.log('image.exif ', image.exif);

  console.log('imageUrl ', imageUrl);
  console.log('image path ', image.path);
  console.log('image.base64String ', image.base64String);
  const imageData = 'data:image/jpeg;base64,' + image.base64String;
  this.crudService.detalle.autoriza_supervisor = imageData;
  console.log('imageData ', imageData);
  console.log('crudService.detalle.autoriza_supervisor ', this.crudService.detalle.autoriza_supervisor);
  };
  newImageUpload(e:any){
    console.log('e ', e);
  }

  onSlideChange(foto: any){
    console.log('foto ', foto);
  }

}

export function drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, numero: any) {
  console.log('numero ', numero);
  console.log('context ', ctx);
  if (ctx) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.font = "10px serif";
    ctx.strokeText(numero, x-2.5, y+2.5);
    ctx.stroke();
  }

}

export function drawCircleExport(x: number, y: number, radius: number, observaciones_choques_raspaduras: observaciones_choques_raspaduras) {
  console.log('x ', x);
  console.log('y ', y);
  console.log('radius ', radius);
  console.log('drawCircleExport observaciones_choques_raspaduras ', observaciones_choques_raspaduras);

  console.log('context ', ctx_export);
  if (ctx_export) {
    ctx_export.beginPath();
    ctx_export.arc(x, y, radius, 0, 2 * Math.PI);
    ctx_export.strokeStyle = 'red';
    ctx_export.lineWidth = 2;
    ctx_export.font = "10px serif";
    ctx_export.strokeText(observaciones_choques_raspaduras.numero, x-2.5, y+2.5);
    ctx_export.stroke();
  }
}

export function drawCircleInit() {
  if (ctx_export) {
    ctx_export.beginPath();
    ctx_export.arc(250, 81, 10, 0, 2 * Math.PI);
    ctx_export.strokeStyle = 'red';
    ctx_export.lineWidth = 2;
    ctx_export.font = "10px serif";
    ctx_export.strokeText(1, 250-2.5, 81+2.5);
    ctx_export.stroke();
  }
}
/*
export function delete_ctx(){
  this.ctx.reset();
  this.setupCanvas();
}
 */
