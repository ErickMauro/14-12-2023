import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item, check_list_cab, check_list_detalle, check_list_vehiculo, usuario, observaciones_choques_raspaduras, Detalle_post, Vehiculo_post, fotos_vehiculo } from './../models.module';
import { HTTP } from "@awesome-cordova-plugins/http/ngx"
import { drawCircleExport, drawCircle, signature_pad } from '../pages/checklist/checklist.component';
import { Router } from '@angular/router';
import { InteractionService } from './interaction.service';
//var cors = require('cors');
@Injectable({
  providedIn: 'root'
})

export class CrudService {

//  private apiUrl = 'https://tcentral.mx/tc/api_pruebas/api_usuarios.php';
observacionesChoquesRaspaduras: observaciones_choques_raspaduras[] = [];
fotos_vehiculo: fotos_vehiculo[] = [];
fotos: {id: number, imagen: string, nombre: string}[] = [];

usuario: usuario = {
id_usu: 0,
suc_usu: 0,
tipo_usu: 0,
prm_usu: 0,
alias_usu: '',
nom_usu: '',
cuenta_usu: '',
pass_usu: '',
pass_tar_usu: '',
correo_usu: '',
stat_usu: 0,
acc_priv_usu: 0,
en_sesion_usu: 0,
ult_sesion_usu: 0,
app_trasl_usu: 0,
link_ant: '',
id_empleado_usu: 0,
celular_usu: '',
es_asesor_usu: 0,
}

cabecero: check_list_cab = {
  id: 0,
  fecha_creacion: '',
  usuario: '',
  fecha_registro: '',
  vin: '',
};
vehiculo: check_list_vehiculo = {
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
};
vehiculo_post: Vehiculo_post = {
  metodo: '',
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
public detalle: check_list_detalle = {
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

  observaciones_choques_raspaduras: '',

  autoriza_conductor: '',
  autoriza_supervisor: '',
  fotos_vehiculo: '',
};
detalle_post: Detalle_post = {
  metodo: '',
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

  observaciones_choques_raspaduras: '',

  autoriza_conductor: '',
  autoriza_supervisor: '',
  fotos_vehiculo: '',
}
ctx: any;
post_detalle: boolean = true;
post_vehiculo: boolean = true;

foto_vehiculo_1!: fotos_vehiculo;
foto_vehiculo_2!: fotos_vehiculo;
foto_vehiculo_3!: fotos_vehiculo;
foto_vehiculo_4!: fotos_vehiculo;

formData = new FormData();

  constructor(
    private http: HttpClient,
    private http_cordova: HTTP,
    private router: Router,
    public interactionService: InteractionService,
  ) {
//    this.detalle = JSON.parse(this.detalle.observaciones);
  }

  getUsuario(apiURL: any, usuario: usuario){
    let usuarioParam = {
      pass_usu: usuario.pass_usu,
      cuenta_usu: usuario.cuenta_usu,
    };
    const usuarioJson = JSON.stringify(usuario);
    const options = {
      method: "get",
      headers: { "Accept": "application/json", Authorization: 'OAuth2: token' },
      data: { "usuario": usuarioJson, "key2": "abc" },
      serializer: "json",
    };
    const optionsJson = JSON.stringify(options);
    this.http_cordova.setDataSerializer('json');
    this.http_cordova.setHeader("Accept", "application/", "json");
    this.http_cordova.setHeader("Content-Type", "application/", "json");
    //        'Content-Type': 'application/x-www-form-urlencoded'
    //        'Content-Type': 'application/json'
    return this.http_cordova.get(apiURL, usuarioParam, {})
    .then(response => {
      console.log('response ', response);
      console.log('response.data ', response.data);
      console.log('JSON.parse(response.data) ', JSON.parse(response.data));
      let datos = JSON.parse(response.data);
      console.log('datos getItemCheckListUsuario ', datos);
        const item = datos.find( (SearchUsuario: usuario, index: any) => {
          this.usuario = SearchUsuario;
          console.log('SearchUsuario ', SearchUsuario);
          console.log('Ingresó con éxito');
          this.router.navigate(['menu']).then(() => {
          });
          return (SearchUsuario.pass_usu === usuario.pass_usu && SearchUsuario.cuenta_usu === usuario.cuenta_usu);
        });
if(this.usuario.pass_usu !== usuario.pass_usu && this.usuario.cuenta_usu !== usuario.cuenta_usu){
        console.log('Error al ingresar');
        this.interactionService.presentAlert('Usuario y/o contraseña incorrectos');
      }
    })
    .catch(error => {
      console.error('Error en la petición:', error);
    });

/*     const usuarioJson = JSON.stringify(usuario);
    return this.http.get<usuario[]>(`${apiURL}/${usuarioJson}`, {
      responseType: 'json',
    }); */
  }


  setUsuario(apiURL: any, usuario: usuario){
    console.log('usuario ', usuario);
    let usuarioParam = {
      pass_usu: usuario.pass_usu,
      cuenta_usu: usuario.cuenta_usu,
    };
    const usuarioJson = JSON.stringify(usuario);
    const options = {
      method: "post",
      headers: { "Accept": "application/json", Authorization: 'OAuth2: token' },
      data: { "usuario": usuarioJson, "key2": "abc" },
      serializer: "json",
    };
    const optionsJson = JSON.stringify(options);
    this.http_cordova.setDataSerializer('json');
    this.http_cordova.setHeader("Accept", "application/", "json");
    this.http_cordova.setHeader("Content-Type", "application/", "json");
    return this.http_cordova.post(apiURL, usuarioParam, {})
    .then(response => {
      console.log('response ', response);
      console.log('response.data ', response.data);
      console.log('JSON.parse(response.data) ', JSON.parse(response.data));
      let datos = JSON.parse(response.data);
      console.log('datos getItemCheckListUsuario ', datos);
    })
    .catch(error => {
      console.error('Error en la petición:', error);
    });
  }

  getItems(apiURL: any): Observable<Item[]> {
    return this.http.get<Item[]>(apiURL);
  }
  getCheckList(apiURL: any): Observable<check_list_cab[]> {
    return this.http.get<check_list_cab[]>(apiURL);
  }
  getItemCheckList(apiURL: any, vin: string): Observable<check_list_cab> {
    return this.http.get<check_list_cab>(`${apiURL}/${vin}`);
  }

  getItemsCheckListCab(apiURL: any): Observable<check_list_cab[]> {
    return this.http.get<check_list_cab[]>(apiURL);
  }
  getCheckListCab(apiURL: any): Observable<check_list_cab[]> {
    return this.http.get<check_list_cab[]>(apiURL);
  }
  getItemCheckListCab(apiURL: any, vin: string) {
    let vinParam = { vin };
    const vinJson = JSON.stringify(vin);
    const options = {
      method: "get",
      headers: { "Accept": "application/json", Authorization: 'OAuth2: token' },
      data: { "vin": vinJson, "key2": "abc" },
      serializer: "json",
    };
    const optionsJson = JSON.stringify(options);
    this.http_cordova.setDataSerializer('json');
    this.http_cordova.setHeader("Accept", "application/", "json");
    this.http_cordova.setHeader("Content-Type", "application/", "json");
    //        'Content-Type': 'application/x-www-form-urlencoded'
    //        'Content-Type': 'application/json'
    this.interactionService.presentLoading('Cargando');
    return this.http_cordova.get(apiURL, vinParam, {})
    .then(response => {
      let datos = JSON.parse(response.data);
      console.log('response ', response);
      console.log('response.data ', response.data);
      console.log('JSON.parse(response.data) ', JSON.parse(response.data));
      console.log('datos getItemCheckListCab ', datos);
        const item = datos.find( (SearchVin: check_list_cab, index: any) => {
          if(SearchVin.vin){
            this.cabecero = SearchVin;
            console.log('SearchVin ', SearchVin);
            this.router.navigate(['checklist']);
          }
          return (SearchVin.vin === vin);
        });
        this.interactionService.closeLoading();
    })
    .catch(error => {
      console.error('Error en la petición:', error);
      this.interactionService.closeLoading();
    });
//    return this.http.get<check_list_cab[]>(`${apiURL}/${vin}`);
  }
/*
  getItemCheckListCab(apiURL: any, vin: string): Observable<check_list_cab[]> {
    return this.http.get<check_list_cab[]>(`${apiURL}/${vin}`);
  }
*/

  getItemsCheckListDetalle(apiURL: any): Observable<check_list_detalle[]> {
    return this.http.get<check_list_detalle[]>(apiURL);
  }
  getCheckListDetalle(apiURL: any): Observable<check_list_detalle[]> {
    return this.http.get<check_list_detalle[]>(apiURL);
  }
  getItemCheckListDetalle(apiURL: any, id: number) {
    console.log('id ', id);
    var idString = id.toString();
    console.log('idString ', idString);
    let idParam = { idString };
    const idJson = JSON.stringify(id);
    this.http_cordova.setDataSerializer('json');
    this.http_cordova.setHeader("Accept", "application/", "json");
    this.http_cordova.setHeader("Content-Type", "application/", "json");
    this.http_cordova.get(apiURL, idParam, {})
    .then(response => {
      let datos = JSON.parse(response.data);
      console.log('response ', response);
      console.log('response.data ', response.data);
      console.log('JSON.parse(response.data) ', JSON.parse(response.data));
      console.log('datos getItemCheckListDetalle ', datos);
        const item = datos.find( (Searchid: check_list_detalle, index: any) => {
          this.detalle = Searchid;
          this.detalle.autoriza_supervisor = Searchid.autoriza_supervisor;
//          this.detalle.autoriza_supervisor = 'data:image/jpeg;base64,' + btoa(Searchid.autoriza_supervisor);
          console.log('detalle.autoriza_supervisor ', this.detalle.autoriza_supervisor);
          console.log('Searchid ', Searchid);
          if(this.detalle){
            console.log('detalle ', this.detalle);
            this.post_detalle = false;
            signature_pad.fromDataURL(this.detalle.autoriza_conductor, { ratio: 1, width: 300, height: 156, xOffset: 0, yOffset: 0 });
            console.log('Si hay datos precargados');
          } else {
            this.post_detalle = true;
            console.log('No hay datos precargados');
          }
          return (Searchid.id === id);
        });

        if(this.detalle.fotos_vehiculo){
/*         const fixedFotosVehiculo: string = this.detalle.fotos_vehiculo.replace(/'/g, '"').replace(/(\w+):/g, '"$1":');
        console.log('fixedFotosVehiculo ', fixedFotosVehiculo); */
        console.log('JSON.parse(fixedFotosVehiculo) ', JSON.parse(this.detalle.fotos_vehiculo));
        this.fotos_vehiculo = JSON.parse(this.detalle.fotos_vehiculo);
        console.log('fotos_vehiculo ', this.fotos_vehiculo);
        const fotosVehiculoJSON: fotos_vehiculo[] = JSON.parse(this.detalle.fotos_vehiculo);
        console.log('fotosVehiculoJSON ', fotosVehiculoJSON);
        fotosVehiculoJSON.forEach(foto => {
          foto.id,
          foto.imagen,
          foto.nombre
        });
        console.log('fotosVehiculoJSON ', fotosVehiculoJSON);
        console.log('this.fotos_vehiculo ', this.fotos_vehiculo);
        console.log('fotos_vehiculo[0] ', this.fotos_vehiculo[0]);
        this.foto_vehiculo_1 = this.fotos_vehiculo[0];
        console.log('fotos_vehiculo[1] ', this.fotos_vehiculo[1]);
        this.foto_vehiculo_2 = this.fotos_vehiculo[1];
        console.log('fotos_vehiculo[2] ', this.fotos_vehiculo[2]);
        this.foto_vehiculo_3 = this.fotos_vehiculo[2];
        console.log('fotos_vehiculo[3] ', this.fotos_vehiculo[3]);
        this.foto_vehiculo_4 = this.fotos_vehiculo[3];
      }
      if(this.detalle.observaciones_choques_raspaduras){
        console.log('post_detalle ', this.post_detalle);
        const fixedDetalle: string = this.detalle.observaciones_choques_raspaduras.replace(/'/g, '"').replace(/(\w+):/g, '"$1":');
        console.log('fixedDetalle ', fixedDetalle);
        this.observacionesChoquesRaspaduras = JSON.parse(fixedDetalle);
        console.log('this.observacionesChoquesRaspaduras ', this.observacionesChoquesRaspaduras);
        const detalleJSON: observaciones_choques_raspaduras[] = JSON.parse(fixedDetalle);
        console.log('detalleJSON ', detalleJSON);
        detalleJSON.forEach(detalle => {
          console.log('detalle.x ', detalle.x);
          console.log('detalle.y ', detalle.y);
          console.log('detalle.medida ', detalle.medida);
          console.log('detalle ', detalle);
        drawCircleExport(detalle.x, detalle.y, detalle.medida, detalle)
        });
      }
        console.log('post_detalle ', this.post_detalle);
    })
    .catch(error => {
      console.error('Error en la petición:', error);
    });
  }



  getItemsCheckListVehiculo(apiURL: any): Observable<check_list_vehiculo[]> {
    console.log('getItemsCheckListVehiculo');
    return this.http.get<check_list_vehiculo[]>(apiURL);
  }
  getCheckListVehiculo(apiURL: any): Observable<check_list_vehiculo[]> {
    return this.http.get<check_list_vehiculo[]>(apiURL);
  }
  getItemCheckListVehiculo(apiURL: any, vin: string) {
    console.log('vin ', vin);
console.log('getItemCheckListVehiculo ');

    let vinParam = { vin };
    const vinJson = JSON.stringify(vin);
    this.http_cordova.setDataSerializer('json');
    this.http_cordova.setHeader("Accept", "application/", "json");
    this.http_cordova.setHeader("Content-Type", "application/", "json");
    this.http_cordova.get(apiURL, vinParam, {})
    .then(response => {
      console.log('response vehiculo ', response);
      let datos = JSON.parse(response.data);
      console.log('response ', response);
      console.log('response.data ', response.data);
      console.log('JSON.parse(response.data) ', JSON.parse(response.data));
      console.log('datos getItemCheckListVehiculo ', datos);
        const item = datos.find( (Searchvin: check_list_vehiculo, index: any) => {
          this.vehiculo = Searchvin;
          console.log('vehiculo ', this.vehiculo);
          console.log('Searchvin ', Searchvin);
          if(this.vehiculo){
            this.post_vehiculo = false;
            console.log('Si hay datos precargados');
          } else {
            this.post_vehiculo = true;
            console.log('No hay datos precargados');
          }
          return (Searchvin.vin === vin);
        });
        console.log('post_vehiculo ', this.post_vehiculo);
    })
    .catch(error => {
      console.error('Error en la petición:', error);
    });
    this.vehiculo.vin = this.cabecero.vin;
  }

  setItemCheckListVehiculo(apiURL: any, vehiculo: check_list_vehiculo) {
    console.log('vehiculo ', vehiculo);
console.log('getItemCheckListVehiculo ');
var n_economico = vehiculo.n_economico.toString();
var kilometraje = vehiculo.kilometraje.toString();
const vehiculoJson = JSON.stringify(vehiculo);

    let vehiculoParam = {
      tipo_vehiculo: vehiculo.tipo_vehiculo,
      area: vehiculo.area,
      n_economico: n_economico,
      conductor: vehiculo.conductor,
      placa: vehiculo.placa,
      empresa: vehiculo.empresa,
      fecha: vehiculo.fecha,
      vin: vehiculo.vin,
      kilometraje: kilometraje,
      marca: vehiculo.marca,
      metodo: 'post',
     };
    this.http_cordova.setDataSerializer('json');
    this.http_cordova.setHeader("Accept", "application/", "json");
    this.http_cordova.setHeader("Content-Type", "application/", "json");
    return this.http_cordova.post(apiURL, vehiculoParam, {})
    .then(response => {
      console.log('response vehiculo ', response);
      let datos = JSON.parse(response.data);
      console.log('response ', response);
      console.log('response.data ', response.data);
      console.log('JSON.parse(response.data) ', JSON.parse(response.data));
      console.log('datos getItemCheckListVehiculo ', datos);
        const item = datos.find( (Searchvehiculo: check_list_vehiculo, index: any) => {
          this.vehiculo = Searchvehiculo;
          console.log('Searchvehiculo ', Searchvehiculo);
          return (Searchvehiculo.vin === vehiculo.vin);
        });
    })
    .catch(error => {
      console.error('Error en la petición:', error);
    });
  }

  setItemCheckListDetalle(apiURL: any, detalle: check_list_detalle) {
    console.log('setItemCheckListDetalle ', detalle);
    console.log('detalle ', detalle);
console.log('getItemCheckListdetalle ');
//var n_economico = detalle.n_economico.toString();
const detalleJson = JSON.stringify(detalle);
/*
 this.fotos_vehiculo.push({
  id: 1,
  nombre: 'vehiculo1',
  imagen: 'https://tcentral.mx/tc/vehiculos/456/1.jpeg'
 });
 this.fotos_vehiculo.push({
  id: 2,
  nombre: 'vehiculo2',
  imagen: 'https://tcentral.mx/tc/vehiculos/456/2.jpeg'
 });
 this.fotos_vehiculo.push({
  id: 3,
  nombre: 'vehiculo3',
  imagen: 'https://tcentral.mx/tc/vehiculos/456/3.jpeg'
 });
 this.fotos_vehiculo.push({
  id: 4,
  nombre: 'vehiculo4',
  imagen: 'https://tcentral.mx/tc/vehiculos/456/4.jpeg'
 });
let fotos_vehiculo = JSON.stringify(this.fotos_vehiculo)
this.detalle.fotos_vehiculo = fotos_vehiculo;
console.log('fotos_vehiculo ', fotos_vehiculo);
console.log('this.detalle.fotos_vehiculo ', this.detalle.fotos_vehiculo);
 */
    let detalleParam = {
      id: detalle.id.toString(),
      gato: detalle.gato,
      herramientas: detalle.herramientas,
      triangulos: detalle.triangulos,
      tapetes: detalle.tapetes,
      antena: detalle.antena,
      emblemas: detalle.emblemas,
      tapones_rueda: detalle.tapones_rueda,
      cables: detalle.cables,
      estereo: detalle.estereo,
      encendedor: detalle.encendedor,
      llanta_relacion: detalle.llanta_relacion,
      extintor: detalle.extintor,

      luz_delantera_alta: detalle.luz_delantera_alta,
      luz_delantera_baja: detalle.luz_delantera_baja,
      luces_emergencia: detalle.luces_emergencia,
      luces_neblineros: detalle.luces_neblineros,
      luz_direccional: detalle.luz_direccional,
      luz_freno_posterior: detalle.luz_freno_posterior,
      parabrisas_delantero: detalle.parabrisas_delantero,
      medallon_trasero: detalle.medallon_trasero,
      limpia_parabrisas: detalle.limpia_parabrisas,
      espejos_laterales: detalle.espejos_laterales,
      espejo_retrovisor: detalle.espejo_retrovisor,
      estado_tablero: detalle.estado_tablero,
      freno_mano: detalle.freno_mano,
      freno_servicio: detalle.freno_servicio,
      cinturon_seguridad_chofer: detalle.cinturon_seguridad_chofer,
      cinturon_seguridad_copiloto: detalle.cinturon_seguridad_copiloto,
      cinturon_seguridad_asiento_posterior: detalle.cinturon_seguridad_asiento_posterior,
      espejo_retrovisor_antideslumbrante: detalle.espejo_retrovisor_antideslumbrante,
      linterna_mano: detalle.linterna_mano,
      orden_limpieza_cabina: detalle.orden_limpieza_cabina,
      direccion: detalle.direccion,
      llanta_delantera_derecha: detalle.llanta_delantera_derecha,
      llanta_delantera_izquierda: detalle.llanta_delantera_izquierda,
      llanta_posterior_derecha: detalle.llanta_posterior_derecha,
      llanta_posterior_izquierda: detalle.llanta_posterior_izquierda,
      llanta_repuesto: detalle.llanta_repuesto,
      conos_seguridad: detalle.conos_seguridad,
      accesorios_seguridad_extintor: detalle.accesorios_seguridad_extintor,
      alarma_retrosesos: detalle.alarma_retrosesos,
      claxon: detalle.claxon,
      tapa_tanque_gasolina: detalle.tapa_tanque_gasolina,
      gato_hidraulico: detalle.gato_hidraulico,
      herramientas_llaves_ruedas: detalle.herramientas_llaves_ruedas,
      cables_pasa_corriente: detalle.cables_pasa_corriente,

      observaciones: detalle.observaciones,

      observaciones_choques_raspaduras: detalle.observaciones_choques_raspaduras,

      autoriza_conductor: detalle.autoriza_conductor,
      autoriza_supervisor: detalle.autoriza_supervisor,

      fotos_vehiculo: detalle.fotos_vehiculo,

      metodo: 'post',
     };
     console.log('detalleParam ', detalleParam);
    this.http_cordova.setDataSerializer('json');
    this.http_cordova.setHeader("Accept", "application/", "json");
    this.http_cordova.setHeader("Content-Type", "application/", "json");
    return this.http_cordova.post(apiURL, detalleParam, {})
    .then(response => {
      console.log('response detalle ', response);
      let datos = JSON.parse(response.data);
      console.log('response ', response);
      console.log('response.data ', response.data);
      console.log('JSON.parse(response.data) ', JSON.parse(response.data));
      console.log('datos getItemCheckListdetalle ', datos);
        const item = datos.find( (Searchdetalle: check_list_detalle, index: any) => {
          this.detalle = Searchdetalle;
          console.log('Searchdetalle ', Searchdetalle);
          return (Searchdetalle.id === detalle.id);
        });
    })
    .catch(error => {
      console.error('Error en la petición:', error);
    });
  }

  updateItemDetalle(apiURL: any, detalle: any) {
    console.log('updateItemDetalle ', detalle);
    console.log('detalle ', detalle);
console.log('updateItemDetalle ');
//var n_economico = detalle.n_economico.toString();
const detalleJson = JSON.stringify(detalle);
/*
 this.fotos_vehiculo.push({
  id: 1,
  nombre: 'vehiculo1',
  imagen: 'https://tcentral.mx/tc/vehiculos/456/1.jpeg'
 });
 this.fotos_vehiculo.push({
  id: 2,
  nombre: 'vehiculo2',
  imagen: 'https://tcentral.mx/tc/vehiculos/456/2.jpeg'
 });
 this.fotos_vehiculo.push({
  id: 3,
  nombre: 'vehiculo3',
  imagen: 'https://tcentral.mx/tc/vehiculos/456/3.jpeg'
 });
 this.fotos_vehiculo.push({
  id: 4,
  nombre: 'vehiculo4',
  imagen: 'https://tcentral.mx/tc/vehiculos/456/4.jpeg'
 });
let fotos_vehiculo_update = JSON.stringify(this.fotos_vehiculo)
this.detalle.fotos_vehiculo = fotos_vehiculo_update;
console.log('fotos_vehiculo ', fotos_vehiculo_update);
console.log('this.detalle.fotos_vehiculo ', this.detalle.fotos_vehiculo);
 */
    let detalleParam = {
      id: detalle.id.toString(),
      gato: detalle.gato,
      herramientas: detalle.herramientas,
      triangulos: detalle.triangulos,
      tapetes: detalle.tapetes,
      antena: detalle.antena,
      emblemas: detalle.emblemas,
      tapones_rueda: detalle.tapones_rueda,
      cables: detalle.cables,
      estereo: detalle.estereo,
      encendedor: detalle.encendedor,
      llanta_relacion: detalle.llanta_relacion,
      extintor: detalle.extintor,

      luz_delantera_alta: detalle.luz_delantera_alta,
      luz_delantera_baja: detalle.luz_delantera_baja,
      luces_emergencia: detalle.luces_emergencia,
      luces_neblineros: detalle.luces_neblineros,
      luz_direccional: detalle.luz_direccional,
      luz_freno_posterior: detalle.luz_freno_posterior,
      parabrisas_delantero: detalle.parabrisas_delantero,
      medallon_trasero: detalle.medallon_trasero,
      limpia_parabrisas: detalle.limpia_parabrisas,
      espejos_laterales: detalle.espejos_laterales,
      espejo_retrovisor: detalle.espejo_retrovisor,
      estado_tablero: detalle.estado_tablero,
      freno_mano: detalle.freno_mano,
      freno_servicio: detalle.freno_servicio,
      cinturon_seguridad_chofer: detalle.cinturon_seguridad_chofer,
      cinturon_seguridad_copiloto: detalle.cinturon_seguridad_copiloto,
      cinturon_seguridad_asiento_posterior: detalle.cinturon_seguridad_asiento_posterior,
      espejo_retrovisor_antideslumbrante: detalle.espejo_retrovisor_antideslumbrante,
      linterna_mano: detalle.linterna_mano,
      orden_limpieza_cabina: detalle.orden_limpieza_cabina,
      direccion: detalle.direccion,
      llanta_delantera_derecha: detalle.llanta_delantera_derecha,
      llanta_delantera_izquierda: detalle.llanta_delantera_izquierda,
      llanta_posterior_derecha: detalle.llanta_posterior_derecha,
      llanta_posterior_izquierda: detalle.llanta_posterior_izquierda,
      llanta_repuesto: detalle.llanta_repuesto,
      conos_seguridad: detalle.conos_seguridad,
      accesorios_seguridad_extintor: detalle.accesorios_seguridad_extintor,
      alarma_retrosesos: detalle.alarma_retrosesos,
      claxon: detalle.claxon,
      tapa_tanque_gasolina: detalle.tapa_tanque_gasolina,
      gato_hidraulico: detalle.gato_hidraulico,
      herramientas_llaves_ruedas: detalle.herramientas_llaves_ruedas,
      cables_pasa_corriente: detalle.cables_pasa_corriente,

      observaciones: detalle.observaciones,

      observaciones_choques_raspaduras: detalle.observaciones_choques_raspaduras,

      autoriza_conductor: detalle.autoriza_conductor,
      autoriza_supervisor: detalle.autoriza_supervisor,

      fotos_vehiculo: detalle.fotos_vehiculo,

      metodo: 'put',
     };

     this.uploadImage(detalle.autoriza_supervisor);

    this.http_cordova.setDataSerializer('json');
    this.http_cordova.setHeader("Accept", "application/", "json");
    this.http_cordova.setHeader("Content-Type", "application/", "json");
    console.log('detalleParam ', detalleParam);
    return this.http_cordova.post(apiURL, detalleParam, {})
    .then(response => {
      console.log('response detalle ', response);
      let datos = JSON.parse(response.data);
      console.log('response ', response);
      console.log('response.data ', response.data);
      console.log('JSON.parse(response.data) ', JSON.parse(response.data));
      console.log('datos getItemCheckListdetalle ', datos);
//      uploadImage()
/*         const item = datos.find( (Searchdetalle: check_list_detalle, index: any) => {
          this.detalle = Searchdetalle;
          console.log('Searchdetalle ', Searchdetalle);
          return (Searchdetalle.id === detalle.id);
        }); */
    })
    .catch(error => {
      console.error('Error en la petición:', error);
    });
  }
/*
  uploadImage(event: any){
    const file = image.target.files[0];
if (event.target.files.length > 0) {
  const file = event.target.files[0];
  this.formData.append('image', file);
  console.log('formData ', this.formData);
}

}
 */
  uploadImage(file: File) {
    let formDataParam = {
      formData: this.formData,
    }
    this.http.post('https://tcentral.mx/tc/api_pruebas/upload_image.php', formDataParam).subscribe((event) => {
      console.log('done');
      console.log('event ', event);
    });
  }

  setItemCheckListVehiculo2(apiURL: any, vehiculo: any): Observable<any> {
    console.log('vehiculo ', vehiculo);
    console.log('apiURL ', apiURL);
    this.vehiculo_post = vehiculo;
    this.vehiculo_post.metodo = 'POST';
    console.log('vehiculoService.vehiculo_post ', this.vehiculo_post);
    const vehiculoJson = JSON.stringify(this.vehiculo_post);
    console.log('vehiculoJson ', vehiculoJson);
    return this.http.post<any>(apiURL, vehiculoJson, {
      responseType: 'json',
    });
  }

  updateItemVehiculo(apiURL: any, vehiculo: any) {
    console.log('vehiculo ', vehiculo);
console.log('getItemCheckListVehiculo ');
var n_economico = vehiculo.n_economico.toString();
var kilometraje = vehiculo.kilometraje.toString();
const vehiculoJson = JSON.stringify(vehiculo);

let vehiculoParam = {
      tipo_vehiculo: vehiculo.tipo_vehiculo,
      area: vehiculo.area,
      n_economico: n_economico,
      conductor: vehiculo.conductor,
      placa: vehiculo.placa,
      empresa: vehiculo.empresa,
      fecha: vehiculo.fecha,
      vin: vehiculo.vin,
      kilometraje: kilometraje,
      marca: vehiculo.marca,
      metodo: 'put',
     };
    this.http_cordova.setDataSerializer('json');
    this.http_cordova.setHeader("Accept", "application/", "json");
    this.http_cordova.setHeader("Content-Type", "application/", "json");
    return this.http_cordova.post(apiURL, vehiculoParam, {})
    .then(response => {
      console.log('response vehiculo ', response);
      let datos = JSON.parse(response.data);
      console.log('response ', response);
      console.log('response.data ', response.data);
      console.log('JSON.parse(response.data) ', JSON.parse(response.data));
      console.log('datos getItemCheckListVehiculo ', datos);
        const item = datos.find( (Searchvehiculo: check_list_vehiculo, index: any) => {
          this.vehiculo = Searchvehiculo;
          console.log('Searchvehiculo ', Searchvehiculo);
          return (Searchvehiculo.vin === vehiculo.vin);
        });
    })
    .catch(error => {
      console.error('Error en la petición:', error);
    });
  }

  deleteItemDetalle(apiURL: any, id: any){
    console.log('detalle.observaciones_choques_raspaduras ', this.detalle.observaciones_choques_raspaduras);
    console.log('ID delete ', id);
    console.log('getItemCheckListdetalle ');
    console.log('observacionesChoquesRaspaduras ', this.observacionesChoquesRaspaduras);
    //var n_economico = detalle.n_economico.toString();
    let observaciones = JSON.stringify(this.observacionesChoquesRaspaduras)
    if(observaciones === '[]'){
      observaciones = '';
    }
    let detalleParam = {
      id: id,
      observaciones_choques_raspaduras: observaciones,
      metodo: 'delete',
     };
    console.log('deleteItemDetalle ', detalleParam);
    this.http_cordova.setDataSerializer('json');
    this.http_cordova.setHeader("Accept", "application/", "json");
    this.http_cordova.setHeader("Content-Type", "application/", "json");
    return this.http_cordova.post(apiURL, detalleParam, {})
    .then(response => {
      console.log('response detalle ', response);
      let datos = JSON.parse(response.data);
      console.log('response ', response);
      console.log('response.data ', response.data);
      console.log('JSON.parse(response.data) ', JSON.parse(response.data));
      console.log('datos getItemCheckListdetalle ', datos);
        const item = datos.find( (Searchdetalle: check_list_detalle, index: any) => {
          this.detalle = Searchdetalle;
          console.log('Searchdetalle ', Searchdetalle);
          return (Searchdetalle.id === id);
        });
    })
    .catch(error => {
      console.error('Error en la petición:', error);
    });
  }
/*
  getUsuarios(){
  this.http_cordova.get('https://tcentral.mx/tc/api_pruebas/api_usuarios.php', {}, {})
  .then(response => {
    console.log('response ', response);
    console.log('response.status ', response.status);
    console.log('JSON.parse(response.data) ', JSON.parse(response.data));
  })
  .catch(error => {
    console.log('error ', error);
    console.log('error.status ', error.status);
    console.log('error.error ', error.error);
    console.log('error.headers ', error.headers);
  });
  }
 */
/*
  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

  createItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateItem(id: number, item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${id}`, item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteItem(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
 */
}
