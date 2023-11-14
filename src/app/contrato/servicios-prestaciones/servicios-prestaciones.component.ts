import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { DatosContSerPre } from 'src/app/models/contrato-find';
import { ContratoSwitch } from 'src/app/models/contrato-switch';
import { ServicioPrestacion } from 'src/app/models/servicio-prestacion';
import { ContratoService } from 'src/app/services/contrato.service';
import { DataService } from 'src/app/services/data.service';
import { PipeTransform, Pipe } from "@angular/core";
import { DatoCamEstServPrest, DatosCamEstServPrest } from 'src/app/models/cambio-estado-sp';
import { ServicioprestacionService } from 'src/app/services/servicioprestacion.service';
import { Division } from 'src/app/models/division';
import { Estado } from 'src/app/models/estado';
import { EliminarServPres } from 'src/app/models/eliminar-sp';
import {Location} from '@angular/common';
import { Observable } from 'rxjs';
import { MyFilterPipe } from 'src/app/myfilter.pipe';
import { RolesService } from 'src/app/services/roles.service';
import { environment } from 'src/environments/environment';

const entidad = 'serviciosPrestaciones';


@Component({
  selector: 'app-servicios-prestaciones',
  templateUrl: './servicios-prestaciones.component.html',
  styleUrls: ['./servicios-prestaciones.component.scss']
})
export class ServiciosPrestacionesComponent implements OnInit {
  roles : any[] = [];
  permisosRoles : any[] = [];
  rol: any = {};

  page = 1;
  pageSize = 12;
  collectionSize = 0;

  user: string = "";

  inputSrv: string;
  inputPrs: string;
  inputDiv: number;
  inputEst: string;
  servicios: ServicioPrestacion[] = [];
  serviciosFiltrados: ServicioPrestacion[] = [];

  numeroContrato: number = 0;
  tipoContrato: string = '';

  SERVICIOS : ServicioPrestacion[] = []; 

  showFiltros: boolean = false;
  filterargs: ServicioPrestacion = {};

  contrato: ContratoSwitch = {};

  contratoServicios: DatosContSerPre = {
    "DatosContSerPre": {
      "ModoRest": "GET",
      "PassWs": `${environment.claveBancard}`,
      "UserWs": `${environment.usuarioBancard}`,
      "Usuario": "",
    }
  }

  divisiones: Division[] = [
    {
      id: 1,
      nombre: "INFONET" 
    },
    {
      id: 2,
      nombre: "PROCESADORA" 
    },
    {
      id: 3,
      nombre: "INFONET - PROCESADORA" 
    },
    {
      id: 4,
      nombre: "FACTURACION ADQUIRENCIA" 
    },
    {
      id: 5,
      nombre: "USUARIO FINAL" 
    }
  ];

  estados: Estado[] = [
    {
      nombre: "Activo",
      value: 'A'
    },
    {
      nombre: 'Inactivo',
      value: 'I'
    }
  ]

  datosCamEstServPrest: DatosCamEstServPrest = { 
    'DatosCamEstServPrest' : []
  }

  eliminarServPres: EliminarServPres = {
    Autenticacion: {
      Usuario: `${environment.usuarioBancard}`,
      Contrasenha: `${environment.claveBancard}`

    },
    DatosServPres: []
  }

  showConfirmaCambioEstado: boolean = false;
  mensajeCambioEstado: string = '';
  loadingCambioEstado: boolean = false;
  loadingServicios: boolean = false;
  loadingBorrar: boolean = false;
  mensajeBorrar: string = '';
  mensaje: string = '';

  faSearch = faSearch;
  faEdit = faEdit;
  faSpinner = faSpinner;

  constructor(private activatedRoute: ActivatedRoute, private contratoService : ContratoService, private dataService: DataService, private router: Router, private servicioPrestService: ServicioprestacionService, private location: Location, private filterPipe : MyFilterPipe, private rolesService: RolesService) {
    this.inputSrv = '';
    this.inputPrs = ''; 
    this.inputDiv = 0;
    this.inputEst = '';
   }

  ngOnInit(): void {
    this.contrato = this.dataService.contrato;
    this.user = this.dataService.username;
    this.numeroContrato = this.activatedRoute.snapshot.params.id;
    this.tipoContrato = this.activatedRoute.snapshot.params.tipoContrato;

    this.contratoServicios.DatosContSerPre.Usuario = this.user.substring(0, 10);
    this.contratoServicios.DatosContSerPre.FS46CONNRO = this.numeroContrato;
    this.contratoServicios.DatosContSerPre.FS01CONTPO = this.tipoContrato;
    
    this.getServiciosPrestaciones();
    
    
    this.rolesService.getRolesUsuario(this.user).then((data:any)=>{
      data.body.d.results.forEach(rol=>{
        this.roles.push(rol.BusinessRoleID)
      })
      this.rolesService.getRoles().then((data:any)=>{
        this.rol = data.body.d.results.filter(permiso => {

          if(this.permisosRoles.length == 0 ){
            
            return this.roles.includes(permiso.zRol) && permiso.zMashup.toLowerCase() == 'sw1' && permiso.zEntidad.toLowerCase() == 'servpres'

          }
          this.permisosRoles[0].zEntidad = entidad;

          return
        }).sort((a,b)=>b.zConcatenado - a.zConcatenado)[0]


      })
     
    })  
   
    
  }

  getServiciosPrestaciones(){
    this.loadingServicios=true;
    this.servicios = [];
    this.contratoService.getServiciosPrestaciones(this.contratoServicios)
      .then((data: any) => {
        
        data.DatosServicioPrestacion.forEach(element => {
          // console.log(element);
          var servicioPrestacion: ServicioPrestacion = element;
          this.servicios.push(servicioPrestacion);
        });
        this.collectionSize = this.servicios.length;
        this.SERVICIOS = this.servicios;
        this.refreshList();
        this.loadingServicios=false;
      })
  }

  refreshList() {
    this.servicios = this.SERVICIOS
      .map((servicio, i) => ({id: i + 1, ...servicio}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  showFiltrosFn() {
    if (!this.showFiltros){
      this.showFiltros = true;
    } else {
      this.showFiltros = false;
    }
  } 

  filtrarServicios(){

    if(this.inputSrv) {
    this.contratoServicios.DatosContSerPre.FS44SrvIde = this.inputSrv;
    }else{
      this.contratoServicios.DatosContSerPre.FS44SrvIde = '';
    }
    if(this.inputPrs){
      this.contratoServicios.DatosContSerPre.FS44CodPre = this.inputPrs;
    }else{
      this.contratoServicios.DatosContSerPre.FS44CodPre = '';
    }
    if(this.inputDiv){
      this.contratoServicios.DatosContSerPre.FS44DivCod = this.inputDiv;
    }else{
      this.contratoServicios.DatosContSerPre.FS44DivCod = 0;
    }
    if(this.inputEst){
      this.contratoServicios.DatosContSerPre.FS47Sts = this.inputEst;

    }else{
      this.contratoServicios.DatosContSerPre.FS47Sts = '';
    }
    this.getServiciosPrestaciones();
    // console.log("SERVICIO FILTRADOS");
    this.serviciosFiltrados = this.servicios;
    // console.log(this.servicios);
  }

  limpiarFiltros() {
    this.filterargs = {};
    this.inputEst = '';
    this.inputDiv = 0;
    this.inputPrs = '';
    this.inputSrv = '';
    this.contratoServicios.DatosContSerPre.FS44DivCod = this.inputDiv;
    this.contratoServicios.DatosContSerPre.FS44SrvIde = this.inputSrv;
    this.contratoServicios.DatosContSerPre.FS47Sts = this.inputEst;
    this.contratoServicios.DatosContSerPre.FS44CodPre= this.inputPrs;

    this.getServiciosPrestaciones();
  }

  editarServicio(servicio: any){

    this.dataService.servicio = servicio;

    this.router.navigate(['servicios-y-prestaciones', 'servicio', servicio.FS44SrvIde ,'editar']);
  }

  crearServicioPrestacion() {
    this.router.navigate(['servicios-y-prestaciones', 'servicio','crear']);
  }

  onCheckboxChange(e, servicio: ServicioPrestacion) {
    if (e.target.checked) {

      var datoEnvioCambioEstServ: DatoCamEstServPrest = {
        FS01ConTpo: servicio.FS01CONTPO,
        FS46ConNro: servicio.FS46CONNRO,
        FS44SrvIde: servicio.FS44SrvIde,
        FS44CodPre: servicio.FS44CodPre
      }
      
      if (servicio.FS47Sts === 'A') {
        datoEnvioCambioEstServ.EstadoAnterior = 'A';
        datoEnvioCambioEstServ.EstadoNuevo = 'I';
      } else {
        datoEnvioCambioEstServ.EstadoAnterior = 'I';
        datoEnvioCambioEstServ.EstadoNuevo = 'A';
      }

      this.datosCamEstServPrest.DatosCamEstServPrest?.push(datoEnvioCambioEstServ);
      this.eliminarServPres.DatosServPres?.push(datoEnvioCambioEstServ);

      // console.log(this.eliminarServPres);

    } else {
       var srv = servicio.FS44SrvIde;
       var codPre = servicio.FS44CodPre;

      this.datosCamEstServPrest.DatosCamEstServPrest?.forEach((element, index) => {
         if (element.FS44SrvIde === srv && element.FS44CodPre === codPre) this.datosCamEstServPrest.DatosCamEstServPrest?.splice(index, 1);
       });

      this.eliminarServPres.DatosServPres?.forEach((element,index) => {
        if (element.FS44SrvIde === srv && element.FS44CodPre === codPre) this.eliminarServPres.DatosServPres?.splice(index, 1);
      });
      // console.log(this.eliminarServPres); 
    }
  }

  modificarEstados(){
      this.showConfirmaCambioEstado = true;
      (async () => { 
        // Do something before delay
        await this.delay(250);

        window.scrollTo(0, 500);
    })();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  confirmaCambioEstado() {
    this.loadingCambioEstado = true
    this.servicioPrestService.cambioEstadoServiciosPrestaciones(this.datosCamEstServPrest)
      .then((data: any)=> {
        // console.log(data);
        this.loadingCambioEstado = false;
        this.mensaje = data.DatosOut[0].Mensaje;
        this.showConfirmaCambioEstado = false;
        this.getServiciosPrestaciones();
      })
  }

  cancelarCambioEstado() {
    this.showConfirmaCambioEstado = false;
  }

  goBack(){
    this.location.back();
  }

  eliminarServicios(){
    this.loadingBorrar = true;

    this.servicioPrestService.borrarServiciosPrestaciones(this.eliminarServPres)
      .then((data: any) => {
        // console.log(data);
        this.loadingBorrar = false;
        this.mensaje = data.DatosOut[1].Mensaje;
        this.getServiciosPrestaciones();
      })
  }

  ingresarServicio(){
    this.router.navigate(['servicios-y-prestaciones', 'servicio','ingresar'])
  }

  verDatosServicio(servicio: any){
    this.dataService.servicio = servicio;

    this.router.navigate(['servicios-y-prestaciones', servicio.FS44SrvIde, servicio.FS44CodPre ]);
  }

   


}
