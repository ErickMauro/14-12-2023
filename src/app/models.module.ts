export interface Info{
  qr: string;
}

export interface usuario {
/*
  id: number;
  usuario: string;
  contrasena: string;
*/
id_usu: number,
suc_usu: number,
tipo_usu: number,
prm_usu: number,
alias_usu: string,
nom_usu: string,
cuenta_usu: string,
pass_usu: string,
pass_tar_usu: string,
correo_usu: string,
stat_usu: number,
acc_priv_usu: number,
en_sesion_usu: number,
ult_sesion_usu: number,
app_trasl_usu: number,
link_ant: string,
id_empleado_usu: number,
celular_usu: string,
es_asesor_usu: number,
}

export interface Item {
  id: number;
  usuario: string;
  contrasena: string;
}

export interface check_list_cab {
  id: number;
  fecha_creacion: string;
  usuario: string,
  fecha_registro: string,
  vin: string,
}

export interface check_list_vehiculo {
  tipo_vehiculo: string,
  area: string,
  n_economico: number,
  conductor: string,
  placa: string,
  empresa: string,
  fecha: string,
  vin: string,
  kilometraje: number,
  marca: string,
}

export interface check_list_detalle {
  id: number,
  gato: string,
  herramientas: string,
  triangulos: string,
  tapetes: string,
  antena: string,
  emblemas: string,
  tapones_rueda: string,
  cables: string,
  estereo: string,
  encendedor: string,
  llanta_relacion: string,
  extintor: string,

  luz_delantera_alta: string,
  luz_delantera_baja: string,
  luces_emergencia: string,
  luces_neblineros: string,
  luz_direccional: string,
  luz_freno_posterior: string,
  parabrisas_delantero: string,
  medallon_trasero: string,
  limpia_parabrisas: string,
  espejos_laterales: string,
  espejo_retrovisor: string,
  estado_tablero: string,
  freno_mano: string,
  freno_servicio: string,
  cinturon_seguridad_chofer: string,
  cinturon_seguridad_copiloto: string,
  cinturon_seguridad_asiento_posterior: string,
  espejo_retrovisor_antideslumbrante: string,
  linterna_mano: string,
  orden_limpieza_cabina: string,
  direccion: string,
  llanta_delantera_derecha: string,
  llanta_delantera_izquierda: string,
  llanta_posterior_derecha: string,
  llanta_posterior_izquierda: string,
  llanta_repuesto: string,
  conos_seguridad: string,
  accesorios_seguridad_extintor: string,
  alarma_retrosesos: string,
  claxon: string,
  tapa_tanque_gasolina: string,
  gato_hidraulico: string,
  herramientas_llaves_ruedas: string,
  cables_pasa_corriente: string,

  observaciones: string,

//  observaciones_choques_raspaduras: { id: number, numero: number, titulo: string, detalles: string, x: number, y: number, medida: number, figura: string }[],
observaciones_choques_raspaduras: string,

  autoriza_conductor: string,
  autoriza_supervisor: string,

  fotos_vehiculo: string,
}

export interface Detalle_post extends check_list_detalle {
  metodo: string,
}

export interface Vehiculo_post extends check_list_vehiculo {
  metodo: string,
}

export interface observaciones_choques_raspaduras {
  id: number,
  numero: number,
  titulo: string,
  detalles: string,
  x: number,
  y: number,
  medida: number,
  figura: string
}

export interface fotos_vehiculo {
  id: number,
  nombre: string,
  imagen: string,
}


export interface observaciones {
  id: number,
  numero: number,
  titulo: string,
  detalles: string,
  x: number,
  y: number,
  medida: number,
  figura: string;
}

export type estado_vehiculo = 'B' | 'M' | 'NA' | 'NN';
