import { Item, usuario } from './../models.module';
import { Injectable } from '@angular/core';
import { InteractionService } from './interaction.service';
import { CrudService } from './crud.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { HTTP } from "@awesome-cordova-plugins/http/ngx"
let password: any;
let password_encode: any;
let apiUrl = 'https://tcentral.mx/tc/api_pruebas/api_usuarios.php';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'https://tcentral.mx/tc/api_pruebas/api_usuarios.php';
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
  suscriberUserInfo = Subscription;

  constructor(
    public interactionService: InteractionService,
    public crudService: CrudService,
    public router: Router,
    public http: HttpClient,
  ) {
  }

  loadUsuario(usuario: usuario) {
    console.log('this.usuario ', usuario);
    console.log('Usuario: ', usuario);
    console.log('loadItems()');
//    this.interactionService.presentLoading('Ingresando');
    this.crudService.getUsuario(this.apiUrl, usuario).then(()=>{
    });
      console.log('usuario.cuenta_usu ', usuario.cuenta_usu);
      console.log('this.usuario.cuenta_usu ', this.usuario.cuenta_usu);
      console.log('usuario.pass_usu ', usuario.pass_usu);
      console.log('this.usuario.pass_usu ', this.usuario.pass_usu);

//      this.interactionService.closeLoading();
  }
}
/*
export function login(){
  password
}
 */



/*
        $id = $_GET['id'] ?? '';
        if ($id) {
            $stmt = $conn->prepare("SELECT * FROM usuarios WHERE (cuenta_usu = ?) AND (pass_usu = ?)");
            $stmt->bind_param("ss", $usuario, $password);
        } else {
            $stmt = $conn->prepare("SELECT * FROM usuarios");
        }
        $stmt->execute();
        $result = $stmt->get_result();
        $usuarios = $result->fetch_all(MYSQLI_ASSOC);

        echo json_encode($usuarios);

        En esa parte del código, cómo hacer un 		$pass=md5(base64_encode($pass)); y regresar la contraseña al frontend
*/

async function fetchUsuarios(): Promise<any> {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}
