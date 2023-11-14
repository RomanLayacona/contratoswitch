import { Component, OnInit, PipeTransform } from '@angular/core';
import { faCheckCircle, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { ContratoSwitch } from 'src/app/models/contrato-switch';
import { Prestacion, ServicioConPrestaciones, ServicioPrestacion } from 'src/app/models/servicio-prestacion';
import { DataService } from 'src/app/services/data.service';
import {DecimalPipe, Location} from '@angular/common';
import { ServicioModel } from 'src/app/models/contrato-find';
import { ContratoService } from 'src/app/services/contrato.service';
import { ServicioprestacionService } from 'src/app/services/servicioprestacion.service';


import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


import { FormControl } from '@angular/forms';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { RolesService } from 'src/app/services/roles.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-editar-servicios-prestaciones',
  templateUrl: './editar-servicios-prestaciones.component.html',
  styleUrls: ['./editar-servicios-prestaciones.component.scss']
})
export class EditarServiciosPrestacionesComponent implements OnInit {

  contrato : ContratoSwitch = {};
  servicio : ServicioPrestacion = {};
  user: string = "";

  

  roles : any[] = [];
  permisosRoles: any[] = [];
  rol: any = {};
  campos: any = {}


  inputSrvIde: any;
  inputCodPre: any;
  inputCliente: any;
  inputSucursal: any;
  inputCntCon: any;
  formaTarifaAplicadaNombre: any;
  formaTarifaAplicadaValue: any;
  inputPorcentajeFijo: any;
  inputMonedaFija: any;
  inputImporteFijo: any;
  inputTarifario: any;
  inputFechaInicio: any;
  inputAgrTransaccion: any;

  btnLoading: boolean = false;
  mensaje: string = '';
  showMensaje: boolean = false;
  faSpinner = faSpinner;
  faSearch = faSearch;
  faCheckCircle = faCheckCircle;

  filterSuc = new FormControl('');
  filterCli = new FormControl('');
  filterTar = new FormControl('');


  clientes: any[] = [];
  clientes$: Observable<any[]>;
  sucursales: any[] = [];
  sucursales$: Observable<any[]>;
  tarifarios: any[] = [];
  tarifarios$: Observable<any[]>;


  ftas: any[] = [
    {
      nombre: 'NO APLICA',
      value: 'N'
    },
    {
      nombre: 'TARIFARIO',
      value: 'T'
    },
    {
      nombre: 'FIJO',
      value: 'F'
    },
    {
      nombre: 'AGRUPAMIENTO TRANSACCIONES',
      value: 'A'
    },
  ];

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
  
  agrTransacciones: any[] = [
    {
      value: 'ACC',
      name: 'GRUPO DE ACCIONISTAS'
    },
    {
      value: 'ANC',
      name: 'BANCO NACIONAL DE FOMENTO'
    },
    {
      value: 'PES',
      name: 'PESA'
    },
    {
      value: 'YAC',
      name: 'YACYRETA'
    },
  ]

  serviciosConPrestaciones: ServicioConPrestaciones[] = [];


  prestaciones: Prestacion[] = [];
  
  
  contratoServicios: ServicioModel = {
    "DatosContSerPre": {
      "ModoRest": "PUT",
      "PassWs": `${environment.claveBancard}`,
      "UserWs": `${environment.usuarioBancard}`,
      "Usuario": "",
    }
  }

    requestServicioPrestacion: any = {
    ServicioPrestacion: {
        GE42SRVIDE: "",
        GE44CodPre: "",
        GE44DesPre: "",
        GE44Sts: "A",
        Usuario: "",
        Modo: "GET",
        UserWs: `${environment.usuarioBancard}`,
        PassWs: `${environment.claveBancard}`
    }
  };

  constructor(private dataService: DataService, 
              private location: Location, 
              private contratoService: ContratoService, 
              private modalService: NgbModal, 
              private pipe: DecimalPipe, 
              private servPresService: ServicioprestacionService,
              private rolesService: RolesService) {
    this.contrato = this.dataService.contrato;
    this.servicio = this.dataService.servicio;

    this.inputCliente = this.servicio.FS46CLICOD;
    this.inputSucursal = this.servicio.FS46CLISUC;
    this.inputCntCon = this.servicio.FS47CntCon;
    this.formaTarifaAplicadaNombre = this.servicio.FS47FATNom;
    this.formaTarifaAplicadaValue = this.servicio.FS47FATId;
    this.inputPorcentajeFijo = this.servicio.FS47TarPor;
    this.inputMonedaFija = this.servicio.FS47MonCnu;
    this.inputImporteFijo = this.servicio.FS47TarImp;
    this.inputTarifario = this.servicio.FS45TarCod;
    this.inputFechaInicio = this.servicio.FS47IniCob;


    this.sucursales$ = this.filterSuc.valueChanges.pipe(
      startWith(''),
      map(text => this.searchSucursales(text, this.pipe))
    );

    this.clientes$ = this.filterCli.valueChanges.pipe(
      startWith(''),
      map(text => this.searchClientes(text, this.pipe))
    );

    this.tarifarios$ = this.filterTar.valueChanges.pipe(
      startWith(''),
      map(text => this.searchTarifarios(text, this.pipe))
    );
   }



   getSucursales(){
    var req = {
      DatosComercio: {
          CodigoCliente: this.inputCliente,
          CodigoSucursal: "",
          NombreFantasia: "",
          RazonSocial: "",
          RUC: "",
          Rubro: "",
          Telefono: "",
          Direccion: "",
          Departamento: "",
          Ciudad: "",
          ZonaComercial: "",
          Tipo: "",
          Accion: "GET",
          TipoCliente: "",
          CodigoMCC: "",
          GrupoEconomico: "",
          FechaPerfil: "",
          FechaEntMaterial: "",
          CodigoCourier: "",
          ZonaCourier: "",
          CasaMatriz: "",
          Categoria: "",
          NivelCliente: "",
          DescNivelCliente: "",
          EsKAM: "",
          PaqueteCliente: "",
          DescPaqueteCliente: "",
          IntegroCajaPOS: "",
          NumeroPagina: "",
          CantidadRegistro: "",
          Usuario: this.user.substring(0, 10),
          UsrId: `${environment.usuarioBancard}`,
          UsrPwd: `${environment.claveBancard}`
      }
    }
    this.contratoService.sucursales(req)
    .then((data: any) => {
      this.sucursales = data.DatosCliente[0].Hits.Sucursales;
      this.sucursales$ = this.filterSuc.valueChanges.pipe(
        startWith(''),
        map(text => this.searchSucursales(text, this.pipe))
      );
    })
  }

  ngOnInit(): void {


    this.user = this.dataService.username;
    this.requestServicioPrestacion.ServicioPrestacion.Usuario= this.user;
    this.contratoServicios.DatosContSerPre.Usuario = this.user.substring(0, 10); 



    this.servPresService.getServiciosPrestraciones(this.requestServicioPrestacion)
    .then((data:any) => {
        this.serviciosConPrestaciones = data.Servicios;
    });

    this.getClientes();
    this.getSucursales();
    this.getTarifarios();

    
    this.rolesService.getRolesUsuario(this.user).then((data:any)=>{
      data.body.d.results.forEach(rol=>{
        this.roles.push(rol.BusinessRoleID)
      })
      this.rolesService.getRoles().then((data:any)=>{
        this.rol = data.body.d.results.filter(permiso => {

          if(this.permisosRoles.length == 0 ){
            
            return this.roles.includes(permiso.zRol) && permiso.zMashup.toLowerCase() == 'sw1' && permiso.zEntidad.toLowerCase() == 'editarserv'

          }

          return
        }).sort((a,b)=>b.zConcatenado - a.zConcatenado)[0]

        if(this.rol.zControlCampo == true){
          this.rolesService.getRolesCrontrolCampo(this.rol.zRol).then((data:any)=>{
            this.roles = data.body.d.results;  
            this.roles.forEach((element:any) =>{
              if(element.zMashup.toLowerCase() == 'sw1' && element.zEntidad.toLowerCase() == 'editarserv'){
                this.campos[`${element.Campo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`] = element
              }
            })
          })
          console.log('campos:',this.campos)

        }

      })

    }) 

  }

  goBack() {
    this.location.back();
  }

  actualizarServicio(servicio: ServicioPrestacion) {
    this.btnLoading = true;

    this.contratoServicios.DatosContSerPre.FS47CntAvi = servicio.FS47CntAvi;
    this.contratoServicios.DatosContSerPre.FS47CntAct = servicio.FS47CntAct;
    this.contratoServicios.DatosContSerPre.FS47Sts = servicio.FS47Sts; 

    this.contratoServicios.DatosContSerPre.FS46CONNRO = servicio.FS46CONNRO;
    this.contratoServicios.DatosContSerPre.FS01CONTPO = servicio.FS01CONTPO;

    this.contratoServicios.DatosContSerPre.FS44SrvIde = servicio.FS44SrvIde;
    this.contratoServicios.DatosContSerPre.FS44CodPre = servicio.FS44CodPre;

    //seteo la fecha a string
    var ano: string = this.inputFechaInicio.substring(0, 4);
    var mes: string = this.inputFechaInicio.substring(5, 7);
    var dia: string = this.inputFechaInicio.substring(8, 10);
    this.contratoServicios.DatosContSerPre.FS47IniCob = ano + mes + dia;

    this.contratoServicios.DatosContSerPre.FS47CliCod = this.inputCliente;
    this.contratoServicios.DatosContSerPre.FS47CliSuc = this.inputSucursal;
    this.contratoServicios.DatosContSerPre.FS47CntCon = this.inputCntCon;
    
    switch (this.formaTarifaAplicadaValue) {
      case 'N':
        this.contratoServicios.DatosContSerPre.FS47FATId = this.formaTarifaAplicadaValue;
        break;
      case 'T':
        this.contratoServicios.DatosContSerPre.FS47FATId = this.formaTarifaAplicadaValue;
        this.contratoServicios.DatosContSerPre.FS45TarCod = this.inputTarifario;
        break;
      case 'A':
        this.contratoServicios.DatosContSerPre.FS47FATId = this.formaTarifaAplicadaValue;
        this.contratoServicios.DatosContSerPre.FS47AgTId = this.inputAgrTransaccion;
        break;
      case 'F':
        this.contratoServicios.DatosContSerPre.FS47FATId = this.formaTarifaAplicadaValue;
        this.contratoServicios.DatosContSerPre.FS47TarPor = this.inputPorcentajeFijo;
        this.contratoServicios.DatosContSerPre.FS47TarImp = this.inputImporteFijo;
        this.contratoServicios.DatosContSerPre.FS47MonCnu = this.inputMonedaFija;
        break;
    }


    this.contratoService.putServiciosPrestaciones(this.contratoServicios)
      .then((data:any)=> {
        this.mensaje = data.DatosOut[0].Mensaje;

        this.showMensaje = true;

        this.btnLoading = false
      });
  }
  searchSucursales(text: any, pipe: PipeTransform): any[] {
    return this.sucursales.filter(sucursal => {
      const term = text.toLowerCase();
      return sucursal.GE24CliSNo.toLowerCase().includes(term)
          || pipe.transform(sucursal.GE24CLISUC).includes(term);
    });
  }

  searchClientes(text: any, pipe: PipeTransform): any[] {
    return this.clientes.filter(cliente => {
      const term = text.toLowerCase();
      return cliente.GE23CliNom.toLowerCase().includes(term)
          || pipe.transform(cliente.GE23CLICOD).includes(term)
          || cliente.GE23PJRuc.toLowerCase().includes(term);
    });
  }

  searchTarifarios(text: any, pipe: PipeTransform): any[] {
    return this.tarifarios.filter(tarifario => {
      const term = text.toLowerCase();
      return tarifario.NombreTarifario.toLowerCase().includes(term)
          || pipe.transform(tarifario.CodTarifario).includes(term)
          || tarifario.CodPrestacion.toLowerCase().includes(term)
          || tarifario.CodServicio.toLowerCase().includes(term);
    });
  }


  open(content) {
    this.modalService.open(content);
  }
  
  openSucModal(content) {
    if(this.inputCliente === '' || this.inputCliente === undefined) alert("Debe seleccionar un cliente para seleccionar sucursal"); 
    else this.modalService.open(content);
  }


  seleccionarCliente(cliente: any) {
    this.inputCliente = cliente.GE23CLICOD;
    this.getSucursales();
    this.modalService.dismissAll();
  }

  seleccionarSucursal(sucursal: any) {
    this.inputSucursal = sucursal.GE24CLISUC;
    this.modalService.dismissAll();
  }

  seleccionarTarifario(tarifario: any) {
    this.inputTarifario = tarifario.CodTarifario;
    this.modalService.dismissAll();
  }


  getClientes(){
    var req = {
        ClientesIN: {
            CodigoCliente: this.contrato.CodigoCliente,
            UserWs: `${environment.usuarioBancard}`,
            PassWs: `${environment.claveBancard}`,
            ModoRest: "GET"
      }
    }

    this.contratoService.clientes(req)
      .then((data: any) => {
        this.clientes = data.DatosClientes.Datos;
    
        this.clientes$ = this.filterCli.valueChanges.pipe(
          startWith(''),
          map(text => this.searchClientes(text, this.pipe))
        );
      })
  }
  
  getTarifarios(){
    var req = 
      {
        ParmIn: {
            UserWs:`${environment.usuarioBancard}`,
            PassWs:`${environment.claveBancard}`,
            FS44SrvIde: this.servicio.FS44SrvIde ,
            FS44CodPre:this.servicio.FS44CodPre,
            TipoContrato: this.contrato.TipoContrato
        }
      }

    this.contratoService.tarifarios(req)
      .then((data: any) => {
        this.tarifarios = data.ParmOut;
      })
  }
  

}

