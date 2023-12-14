import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController, iosTransitionAnimation } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  loading: any;

  constructor(public toastController: ToastController,
              public loadingController: LoadingController,
              public alertController: AlertController) { }

  async presentToast(mensaje: string){
      const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      mode: 'ios',
    });
    toast.present();
}
//    backdropDismiss: true,
async presentLoading(mensaje: string) {
  this.loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: mensaje,
    backdropDismiss: true,
    mode: 'ios',
  });
  await this.loading.present();
}

async closeLoading() {
  await this.loading.dismiss();
}

async presentAlert(mensaje: string) {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    message: mensaje,
    mode: 'ios',
    buttons: ['OK'],
  });

  await alert.present();

  const { role } = await alert.onDidDismiss();
  console.log('onDidDismiss resolved with role', role);
}

async presentAdvertencia(mensaje: string,allowClose = false) {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    message: mensaje,
    mode: 'ios',
    backdropDismiss: allowClose,
  });

  await alert.present();

}

}
