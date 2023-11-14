import { Component, OnInit } from '@angular/core';
import { faEdit, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ServicioPrestacion } from 'src/app/models/servicio-prestacion';
import { DataService } from 'src/app/services/data.service';
import {Location} from '@angular/common';
import * as moment from 'moment';
import { DescuentosntService } from 'src/app/services/descuentosnt.service';
import { RolesService } from 'src/app/services/roles.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar-descuento-no-transaccional',
  templateUrl: './editar-descuento-no-transaccional.component.html',
  styleUrls: ['./editar-descuento-no-transaccional.component.scss']
})
export class EditarDescuentoNoTransaccionalComponent implements OnInit {
  servicio: ServicioPrestacion = {};
  descuentoNoTr: any;
  user: string = '';
  inputMoneda: any;
  inputFechaInicio: any;
  inputFechaFin: any;
  inputPorcentaje: any;
  inputImporte: any;

  campos: any = {}
  roles : any[] = [];
  permisosRoles: any[] = [];
  rol: any = {};

  btnLoading: boolean = false;
  mensaje: string = '';
  showMensaje: boolean = false;
  faSpinner = faSpinner;
  faEdit = faEdit;

  monedas: any[] = [
    {
      value: 600,
      name: "GUARANI"
    },
    {
      value: 840,
      name: 'US DOLLAR'
    }
  ]

  constructor(private dataService: DataService,
              private location: Location,
              private descuentoNTService: DescuentosntService,
              private rolesService:RolesService) {
    this.descuentoNoTr = this.dataService.descuento;
    this.servicio = this.dataService.servicio;

    this.inputImporte = this.descuentoNoTr.FS50DtoImp;
    this.inputMoneda = this.descuentoNoTr.FS50MonCnu;
    this.inputPorcentaje = this.descuentoNoTr.FS50DtoPor;

    var dateIn = moment(this.descuentoNoTr.FS50FchVig, 'DD-MM-YYYY');  
    var fechaIniString = dateIn.format('YYYY-MM-DD'); 
    this.inputFechaInicio = fechaIniString;

    var dateHta = moment(this.descuentoNoTr.FS50FchHta, 'DD-MM-YYYY');
    var fechaHtaString = dateHta.format('YYYY-MM-DD'); 
    this.inputFechaFin = fechaHtaString;
  }

  ngOnInit(): void {
    this.user = this.dataService.username;

    this.rolesService.getRolesUsuario(this.user).then((data:any)=>{
      console.log('rolUser:',data.body.d.results)
      data.body.d.results.forEach(rol=>{
        this.roles.push(rol.BusinessRoleID)
      })
      this.rolesService.getRoles().then((data:any)=>{
        console.log('rolesTabla:',data.body.d.results)
        this.rol = data.body.d.results.filter(permiso => {
          
          if(this.permisosRoles.length == 0 ){
            
            return this.roles.includes(permiso.zRol) && permiso.zMashup.toLowerCase() == 'sw1' && permiso.zEntidad.toLowerCase() == 'editardescuento'

          }
          return
        }).sort((a,b)=>b.zConcatenado - a.zConcatenado)[0]

        if(this.rol.zControlCampo == true){
          this.rolesService.getRolesCrontrolCampo(this.rol.zRol).then((data:any)=>{
            this.roles = data.body.d.results;
            
            this.roles.forEach((element:any) =>{
            
              if(element.zMashup.toLowerCase() == 'sw1' && element.zEntidad.toLowerCase() == 'editardescuento'){
                this.campos[`${element.Campo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`] = element
              }
            })
            console.log('campos:',this.campos) 
          })
        }
             
      })
     
    }) 
  }

  goBack(){
    this.location.back();
  }

  actualizarDescuento(){
    this.btnLoading = true;

    //seteo la fecha a string
    var anoIni: string = this.inputFechaInicio.substring(0, 4);
    var mesIni: string = this.inputFechaInicio.substring(5, 7);
    var diaIni: string = this.inputFechaInicio.substring(8, 10);
    var fechaInicio = anoIni + mesIni + diaIni;

    var anoFin: string = this.inputFechaFin.substring(0, 4);
    var mesFin: string = this.inputFechaFin.substring(5, 7);
    var diaFin: string = this.inputFechaFin.substring(8, 10);
    var fechaFin = anoFin + mesFin + diaFin;


    let descuentoRequest: any = {
      DatosDesNoTransac: {
        FS01CONTPO:this.servicio.FS01CONTPO,
        FS46CONNRO: this.servicio.FS46CONNRO,
        FS44SrvIde: this.servicio.FS44SrvIde,
        FS44CodPre: this.servicio.FS44CodPre,
        FS50FchVig: fechaInicio,
        FS50FchHta: fechaFin,
        FS50DtoPor: this.inputPorcentaje,
        FS50MonCnu: this.inputMoneda,
        FS50DtoImp: this.inputImporte,
        UserWs:`${environment.usuarioBancard}`,
        PassWs:`${environment.claveBancard}`,
        ModoRest:"PUT",
        Usuario: this.user.substring(0,10)
      }
    }

    this.descuentoNTService.actualizarDescuentosNoTransaccionales(descuentoRequest)
      .then((data:any) => {
        this.showMensaje = true;
        this.mensaje = data.DatosRespuesta.DatosOut[0].Mensaje;
        this.btnLoading = false;
      })
  }

}
