import { Component, OnInit } from '@angular/core';
import { ServicioPrestacion } from 'src/app/models/servicio-prestacion';
import { AdicionalesService } from 'src/app/services/adicionales.service';
import { DataService } from 'src/app/services/data.service';
import { DescuentosntService } from 'src/app/services/descuentosnt.service';
import {Location} from '@angular/common';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { RolesService } from 'src/app/services/roles.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crear-descuento-no-transaccional',
  templateUrl: './crear-descuento-no-transaccional.component.html',
  styleUrls: ['./crear-descuento-no-transaccional.component.scss']
})
export class CrearDescuentoNoTransaccionalComponent implements OnInit {

  roles : any[] = [];
  permisosRoles: any[] = [];
  rol: any = {};
  campos: any = {}
  cargando: boolean= false;
  servicio: ServicioPrestacion = {};
  user: string = "";

  inputMoneda: any;
  inputFechaInicio: any;
  inputFechaFin: any;
  inputPorcentaje: any;
  inputImporte: any;

  btnLoading: boolean = false;
  mensaje: string = '';
  showMensaje: boolean = false;
  faSpinner = faSpinner;

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
              private descuentoNTService: DescuentosntService,
              private location: Location,
              private rolesService: RolesService) {
    this.servicio = dataService.servicio;
  }

  ngOnInit(): void {
    this.user = this.dataService.username; 
    this.cargando = true;
    this.rolesService.getRolesUsuario(this.user).then((data:any)=>{
      data.body.d.results.forEach(rol=>{
        this.roles.push(rol.BusinessRoleID)
      })
      this.rolesService.getRoles().then((data:any)=>{
        this.rol = data.body.d.results.filter(permiso => {

          if(this.permisosRoles.length == 0 ){
            
            return this.roles.includes(permiso.zRol) && permiso.zMashup.toLowerCase() == 'sw1' && permiso.zEntidad.toLowerCase() == 'creardescuento'

          }

          return
        }).sort((a,b)=>b.zConcatenado - a.zConcatenado)[0]

        if(this.rol.zControlCampo == true){
          this.rolesService.getRolesCrontrolCampo(this.rol.zRol).then((data:any)=>{
            this.roles = data.body.d.results;  
            this.roles.forEach((element:any) =>{
              if(element.zMashup.toLowerCase() == 'sw1' && element.zEntidad.toLowerCase() == 'creardescuento'){
                this.campos[`${element.Campo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`] = element
              }
            })
          })
        }
        console.log(this.campos)
        this.cargando = false;
      })

    }) 

  }

  goBack() {
    this.location.back();
  }

  agregarDescuento(){
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
        ModoRest:"POST",
        Usuario: this.user.substring(0, 10)
      }
    }

    this.descuentoNTService.createDescuentosNoTransaccionales(descuentoRequest)
      .then((data:any) => {
        this.showMensaje = true;
        this.mensaje = data.DatosRespuesta.DatosOut[0].Mensaje;
        this.btnLoading = false;
      })
  }

}
