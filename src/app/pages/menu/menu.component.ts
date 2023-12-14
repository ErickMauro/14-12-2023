import { Item, check_list_cab, check_list_detalle, usuario } from './../../models.module';
import { CrudService } from './../../services/crud.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
//import { BarcodeScanner, CameraDirection, SupportedFormat } from '@capacitor-community/barcode-scanner';
//import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
//import { BarcodeScanner, BarcodeFormat, LensFacing,} from '@capacitor-mlkit/barcode-scanning';
import { BarcodeScanner, CameraDirection, SupportedFormat } from '@capacitor-community/barcode-scanner';
import { Platform } from '@ionic/angular';
import { SafeUrl } from '@angular/platform-browser';
import { InteractionService } from 'src/app/services/interaction.service';
import { Router } from '@angular/router';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { LoginService } from 'src/app/services/login.service';
import { ScannerQRCodeConfig, NgxScannerQrcodeService, ScannerQRCodeSelectedFiles, ScannerQRCodeResult, NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
let mostrar_qr: boolean = false;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit, AfterViewInit {
  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
//        facingMode: { exact: "environment" },
      },
    },
  };
  scannedResult: any;
  apiUrlCheckListDetalle = 'https://tcentral.mx/tc/api_pruebas/api_check_list_detalle.php';
  apiUrlCheckListVehiculo = 'https://tcentral.mx/tc/api_pruebas/api_check_list_vehiculos.php';
  content_visibility: any = '';

    enlace: any;
    myAngularxQrCode;
    qrCodeDownloadLink: SafeUrl = "";
    placa: any;
    check_list_cab: check_list_cab = {
      id: 0,
      fecha_creacion: '',
      usuario: '',
      fecha_registro: '',
      vin: '',
    };
    qrScan: boolean = false;
    private apiUrl = 'https://tcentral.mx/tc/api_pruebas/api_check_list_cab.php';
  constructor(
    public crudService: CrudService,
    public interactionService: InteractionService,
    public router: Router,
    public vehiculoService: VehiculoService,
    public loginService: LoginService,
  ) {
    this.didUserGrantPermission();
//    this.crudService.getItemCheckListCab(this.apiUrl, '');
    this.myAngularxQrCode = '';
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    qr_show();
  }

  onChangeURL(url: SafeUrl) {
    console.log('url ', url);
    this.qrCodeDownloadLink = url;
    console.log('qrCodeDownloadLink ', this.qrCodeDownloadLink);
  }

  placaQR() {
    console.log('placaQR() > this.enlace ', this.enlace);

  }

    enviarPlaca() {
      console.log('enviarPlaca() > this.placa ', this.placa);
      this.crudService.cabecero.vin = this.placa;
  //    this.interactionService.presentLoading('Ingresando');
      this.crudService.getItemCheckListCab(this.apiUrl, this.placa).then(()=>{
        if(this.crudService.cabecero.vin === this.placa){
          console.log('Placa verificada');
          this.router.navigate(['checklist']);
        } else {
          this.interactionService.presentToast('Placa no registrada');
          console.log('Placa no registrada');
        }
      });
  //    this.interactionService.closeLoading();
    }

  salir(){
    this.router.navigate(['home']).then(() => {
      window.location.reload();
    });
  }

  async startScan() {
    console.log('startScan()');
    await BarcodeScanner.checkPermission({ force: true });
    const body = document.querySelector('body');
    if (body) {
      body.classList.add('scanner-active');
    }
    BarcodeScanner.hideBackground();

    const result = await BarcodeScanner.startScan({
      cameraDirection: CameraDirection.BACK
//    cameraDirection:  cameraDirection: 'rear',
    }, );

    if (result.hasContent) {
      console.log('result.hasContent ', result.hasContent);
      this.enlace = result.content;
      this.crudService.cabecero.vin = this.enlace;
      this.crudService.getItemCheckListCab(this.apiUrl, this.enlace).then(()=>{
      });
      this.stopScan();
    }
  };

    stopScan() {
      const body = document.querySelector('body');
      if (body) {
        body.classList.remove('scanner-active');
      }
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  };

  async checkPermission(){

    const status = await BarcodeScanner.checkPermission({ force: true });

    if (status.denied) {
      const c = confirm('Si desea otorgar permiso para usar su cámara, habilítelo en la configuración de la aplicación.');
      if (c) {
        BarcodeScanner.openAppSettings();
      }
    }

    if (status.granted) {
      return true;
    }
    return false;
  };

  async didUserGrantPermission() {
    const status = await BarcodeScanner.checkPermission({ force: false });
    if (status.granted) {
      return true;
    }
    if (status.denied) {
      return false;
    }
    if (status.asked) {
    }
    if (status.neverAsked) {
      const c = confirm('Necesitamos su permiso para usar su cámara y poder escanear.');
      if (!c) {
        return false;
      }
    }
    if (status.restricted || status.unknown) {
      return false;
    }
    const statusRequest = await BarcodeScanner.checkPermission({ force: true });
    if (statusRequest.asked) {
    }
    if (statusRequest.granted) {
      return true;
    }
    return false;
  };

}



/*
export default {
  methods: {
    stopScan() {
      BarcodeScanner.showBackground();
      BarcodeScanner.stopScan();
    },
  },

  deactivated() {
    this.stopScan();
  },

  beforeDestroy() {
    this.stopScan();
  },
};
 */
/*
let front = false;
const flip_button = document.getElementById("flip-button");
if(flip_button){
  flip_button.onclick = () => {
  front = !front;
}
}
const constraints = {
  video: { facingMode: front ? "user" : "environment" },
};
 */
function qr_show(){
/* const btn_qr = document.getElementById("btn_qr");
console.log('btn_qr');
if(btn_qr){
  btn_qr.onclick = () => {
    if(mostrar_qr === true){
      mostrar_qr = false;
      } else {
        mostrar_qr = true;
      }
      console.log('mostrar_qr ', mostrar_qr);
    console.log('ngx_scanner_qrcode');
    const ngx_scanner_qrcode = document.getElementById("ngx-scanner-qrcode");
    if(ngx_scanner_qrcode){
      console.log('mostrar_qr ', mostrar_qr);
      if(mostrar_qr === true){
      console.log('ngx_scanner_qrcode = block');
      ngx_scanner_qrcode.style.display="block";
      } else {
        console.log('ngx_scanner_qrcode = none');
        ngx_scanner_qrcode.style.display="none";
      }
    }
}
} */
}



