import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ContratoFind, ContratoFindExt } from 'src/app/models/contrato-find';
import { ContratoSwitch } from 'src/app/models/contrato-switch';
import { Motivo } from 'src/app/models/motivo';
import { ContratoService } from 'src/app/services/contrato.service';
import { DataService } from 'src/app/services/data.service';
import {Location} from '@angular/common';
import { RolesService } from 'src/app/services/roles.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-estado-contrato',
  templateUrl: './estado-contrato.component.html',
  styleUrls: ['./estado-contrato.component.scss']
})
export class EstadoContratoComponent implements OnInit {
  roles : any[] = [];
  permisosRoles: any[] = [];
  rol: any = {};
  campos: any = {};

  contrato: ContratoSwitch = {};

  motivos: Motivo[] = [
    {
      cod: 1,
      descripcion: 'INACTIVACION ORDEN ADMINISTRATIVA',
    },
    {
      cod: 2,
      descripcion: 'INACTIVACION PARCIAL',
    },
    {
      cod: 3,
      descripcion: 'INACTIVACION - BAJA EMISOR',
    },
    {
      cod: 4,
      descripcion: 'REACTIVACION'
    },
    {
      cod: 5,
      descripcion: 'INACTIVACION AUTOMATICA',
    },
    {
      cod: 6,
      descripcion: 'INACTIVACION ORDEN COMERCIO',
    },
    {
      cod: 7,
      descripcion: 'INACTIVACION ORDEN SEGURIDAD',
    },
    {
      cod: 8,
      descripcion: 'ACTIVACION PARCIAL'
    },
    {
      cod: 9,
      descripcion: 'REACTIVACION PARCIAL'
    },
  ]

  observacion: string = '';
  motivoSeleccionado: number = -1;

  contratoAActualizar: ContratoSwitch = {};

  mensaje: string = '';
  showMensaje: boolean = false;

  btnLoading: boolean = false;
  user: string = "";

  faSpinner = faSpinner;

  constructor(private route: ActivatedRoute, private dataService: DataService, private contratoService: ContratoService, private router: Router, private location: Location, private rolesService: RolesService) {
   }

  ngOnInit(): void {    
      this.contrato = this.dataService.contrato;
      this.user = this.dataService.username;

      this.rolesService.getRolesUsuario(this.user).then((data:any)=>{
        
        data.body.d.results.forEach(rol=>{
          this.roles.push(rol.BusinessRoleID)
        })
        this.rolesService.getRoles().then((data:any)=>{
          this.rol = data.body.d.results.filter(permiso => {
            
            if(this.permisosRoles.length == 0 ){
              
              return this.roles.includes(permiso.zRol) && permiso.zMashup.toLowerCase() == 'sw1' && permiso.zEntidad.toLowerCase() == 'cambiarestado'
  
            }
            return
          }).sort((a,b)=>b.zConcatenado - a.zConcatenado)[0]
  
          if(this.rol.zControlCampo == true){
            this.rolesService.getRolesCrontrolCampo(this.rol.zRol).then((data:any)=>{
              this.roles = data.body.d.results;
              
              this.roles.forEach((element:any) =>{
              
                if(element.zMashup.toLowerCase() == 'sw1' && element.zEntidad.toLowerCase() == 'cambiarestado'){
                  this.campos[`${element.Campo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`] = element
                }
              })
            })
          }     
        })
       
      }) 

  }
    
  actualizarEstado(contrato:ContratoSwitch, motivoSeleccionado: number, observacion: string) {

    this.btnLoading = true;

    var newEstado: string;

    if(contrato.Estado === 'A'){
      newEstado = 'I';
    } else {
      newEstado = 'A';
    }

    this.contratoAActualizar = {
      Motivo : motivoSeleccionado,
      Observacion : observacion,
      Usuario: this.user.substring(0, 10),
      PassWs: `${environment.claveBancard}`,
      UserWs: `${environment.usuarioBancard}`,
      ModoRest: 'PUT',
      CodigoCliente: contrato.CodigoCliente,
      CodigoSucursal: contrato.CodigoSucursal,
      NroContrato: contrato.NroContrato,
      TipoContrato: contrato.TipoContrato,
      Estado: newEstado
    }

    var contratoUpd : ContratoFindExt = {
      DatosContratos: this.contratoAActualizar
    }

    this.contratoService.actualizarEstado(contratoUpd)
    .then((data:any) => {
      this.mensaje = data.DatosOut[0].Mensaje;

      this.showMensaje = true;

      this.btnLoading = false
    })

  }

  goBack() {
    this.location.back();
  }

}
