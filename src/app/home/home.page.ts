import { LoginService } from './../services/login.service';
import { InteractionService } from './../services/interaction.service';
import { usuario, Item } from './../models.module';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  private apiUrl = 'https://tcentral.mx/tc/api_pruebas/api_usuarios.php';
  cliente: usuario = {
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

  constructor(
              public router: Router,
//              public http: HttpClient,
              public platform: Platform,
              public crudService: CrudService,
              public interactionService: InteractionService,
              public loginService: LoginService,
              ) {
              }

ngOnInit() {
}

ingresar(){
  this.loginService.loadUsuario(this.cliente);
}

registrarse(){
  this.crudService.setUsuario(this.apiUrl, this.cliente);
}

}
