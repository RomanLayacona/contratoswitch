import { Component, OnInit, PipeTransform } from '@angular/core';
import { ServicioPrestacion } from 'src/app/models/servicio-prestacion';
import { AdicionalesService } from 'src/app/services/adicionales.service';
import { ContratoSwitch } from 'src/app/models/contrato-switch';
import { ServicioModel } from 'src/app/models/contrato-find';
import { DataService } from 'src/app/services/data.service';
import { DecimalPipe,Location } from '@angular/common';
import { faSpinner, faSearch, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { ServicioprestacionService } from 'src/app/services/servicioprestacion.service';
import { ContratoService } from 'src/app/services/contrato.service';

const entidad = 'adicionales';


import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { FormControl } from '@angular/forms';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { RolesService } from 'src/app/services/roles.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crear-adicional',
  templateUrl: './crear-adicional.component.html',
  styleUrls: ['./crear-adicional.component.scss']
})
export class CrearAdicionalComponent implements OnInit {

  roles : any[] = [];
  permisosRoles: any[] = [];
  rol: any = {}
  campos: any = {}
  

  contrato : ContratoSwitch = {};
  servicio: ServicioPrestacion = {};
  user: string = "";


  inputFecha: any;
  inputPorcentaje: any;
  inputCliCod: any;
  inputCantidad: any;
  inputOrd: any;
  inputTipoAdicional: any;
  inputSuc: any;
  inputProrrateo: any;
  inputTerminoPromocion: any;
  inputMonImp: any;
  inputMonDto: any;
  inputImp: any;
  inputImpDto: any;
  inputFechaInicio: any;
  inputFechaFin: any;
  inputCobIns: any;
  inputImpCuo: any;
  inputCntCuo: any;
  inputMonCuo: any;
  inputCobInsVal: any;

  btnLoading: boolean = false;
  mensaje: string = '';
  showMensaje: boolean = false;
  faSpinner = faSpinner;
  faSearch = faSearch;
  faCheckCircle = faCheckCircle;

  loading: boolean = false

  filterSuc = new FormControl('');
  filterCli = new FormControl('');
  filterTar = new FormControl('');
  filterOrd = new FormControl('');


  clientes: any[] = [];
  clientes$: Observable<any[]>;
  sucursales: any[] = [];
  sucursales$: Observable<any[]>;
  orden: any;
  ordenes: any[]=[];
  ordenes$: Observable<any[]>;


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
  tpoAdicional: any[] = [
    {
      value: 'V',
      name: 'Valor Contrato'
    },
    {
      value: 'P',
      name: 'Promocion'
    },
    {
      value: 'G',
      name: 'Gratuito'
    },
    {
      value: 'C',
      name: 'Venta'
    },
  ]


  constructor(private dataService: DataService,
              private adicionalService: AdicionalesService,
              private location: Location, 
              private modalService: NgbModal, 
              private pipe: DecimalPipe, 
              private contratoService: ContratoService,
              private rolesService:RolesService) {

    this.servicio = dataService.servicio;
    this.inputCliCod = this.servicio.FS47CliCod;
    this.inputSuc = this.servicio.FS46CLISUC;
    this.inputTipoAdicional = "V";
    this.inputProrrateo = '0';
    this.inputTerminoPromocion = '0';
    this.inputMonImp='';
    this.inputMonDto='';
    this.inputFechaInicio="";
    this.inputFechaFin="";
    this.inputFecha=new Date().toISOString().slice(0, 10);




    this.contrato = this.dataService.contrato;

    this.sucursales$ = this.filterSuc.valueChanges.pipe(
      startWith(''),
      map(text => this.searchSucursales(text, this.pipe))
    );

    this.clientes$ = this.filterCli.valueChanges.pipe(
      startWith(''),
      map(text => this.searchClientes(text, this.pipe))
    );
    this.ordenes$ = this.filterOrd.valueChanges.pipe(
      startWith(''),
      map(text => this.searchOrdenes(text, this.pipe))
    );
  }

  ngOnInit(): void {
    this.user = this.dataService.username;
  
    this.getClientes();
    this.getSucursales();
    this.getOrdenes()

    this.rolesService.getRolesUsuario(this.user).then((data:any)=>{
      data.body.d.results.forEach(rol=>{
        this.roles.push(rol.BusinessRoleID)
      })
      this.rolesService.getRoles().then((data:any)=>{
        this.rol = data.body.d.results.filter(permiso => {

          if(this.permisosRoles.length == 0 ){
            
            return this.roles.includes(permiso.zRol) && permiso.zMashup.toLowerCase() == 'sw1' && permiso.zEntidad.toLowerCase() == 'agregaradicional'

          }

          return
        }).sort((a,b)=>b.zConcatenado - a.zConcatenado)[0]
        console.log('rol', this.rol)
        if(this.rol.zControlCampo == true){

          this.rolesService.getRolesCrontrolCampo(this.rol.zRol).then((data:any)=>{
            this.roles = data.body.d.results;
            
            this.roles.forEach((element:any) =>{
              
              if(element.zMashup.toLowerCase() == 'sw1' && element.zEntidad.toLowerCase() == 'agregaradicional'){
                this.campos[`${element.Campo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`] = element
              }
            })
          })
          console.log(this.campos)
      }
      })
     

    })
  }

  goBack() {
    this.location.back();
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


  searchOrdenes(text: any, pipe: PipeTransform): any[] {
    return this.ordenes.filter(orden => {
      const term = text.toLowerCase();
      return orden.CodigoInstalacion.toLowerCase().includes(term)
    });
  }

  getOrdenes(){
    this.loading=true
    var req={
      
        "InInstalaciones": {
            "ModoInstalacion": "GET",
            "CodigoCliente": this.servicio.FS46CLICOD,
            "CodigoSucursal": this.servicio.FS46CLISUC,
            "EstadoInstalacion": "N",
            "IncluirTerminales": "S",
            "UsrId": `${environment.usuarioBancard}`,
            "UsrPwd": `${environment.claveBancard}`        
        }
    
    }

    this.adicionalService.getOrdenes(req).then((data:any)=>{

      this.ordenes = data.OutInstalaciones.sort((a,b)=>b.CodigoInstalacion - a.CodigoInstalacion)

      this.orden = [data.OutInstalaciones.sort((a,b)=>b.CodigoInstalacion - a.CodigoInstalacion)[0]]
      
      this.inputOrd= this.ordenes[0] == undefined ? '0' : this.ordenes[0].CodigoInstalacion
      this.inputCantidad = this.ordenes[0] == undefined ? '0' : this.ordenes[0].CantidadPosInstalar
      this.loading=false;
    }).catch((err:any)=>{
      this.loading=false;

      alert(err)
    })
    }
  asignarOrden(orden:any,cant:any){
    this.inputOrd=orden;
    this.inputCantidad=cant;
  }

  getSucursales(){
    var req = {
      DatosComercio: {
          CodigoCliente: this.inputCliCod,
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
  seleccionarCliente(cliente: any) {
    this.inputCliCod = cliente.GE23CLICOD;
    this.getSucursales();
    this.modalService.dismissAll();
  }

  seleccionarSucursal(sucursal: any) {
    this.inputCliCod = sucursal.GE24CLISUC;
    this.modalService.dismissAll();
  }

  
  open(content) {
    this.modalService.open(content);
  }
    
  openLg(content) {
    this.modalService.open(content, {size: 'lg'});
    this.getOrdenes()
  }


  openSucModal(content) {
    if(this.inputCliCod === '' || this.inputCliCod === undefined) alert("Debe seleccionar un cliente para seleccionar sucursal"); 
    else this.modalService.open(content);
  }

  agregarAdicional(e:any){
    this.btnLoading = true;


    if(this.inputCobIns==true){
      this.inputCobInsVal='1';
    }else{
      this.inputCobInsVal='0'
    }


    //seteo la fecha a string
    var ano: string = this.inputFecha.substring(0, 4);
    var mes: string = this.inputFecha.substring(5, 7);
    var dia: string = this.inputFecha.substring(8, 10);
    var fecha = dia + '/' + mes+ '/' + ano ;


    var anoIni: string = this.inputFechaInicio.substring(0, 4);
    var mesIni: string = this.inputFechaInicio.substring(5, 7);
    var diaIni: string = this.inputFechaInicio.substring(8, 10);
    var fechaInicio = diaIni + '/' + mesIni+ '/' + anoIni ;

    var anoFin: string = this.inputFechaFin.substring(0, 4);
    var mesFin: string = this.inputFechaFin.substring(5, 7);
    var diaFin: string = this.inputFechaFin.substring(8, 10);
    var fechaFin = diaFin + '/' + mesFin+ '/' +anoFin ;
    if(fechaFin===''){
      fechaFin="/ /"
    }
    if(fechaInicio===''){
      fechaInicio="/ /"
    }

    let adicionalRequest: any = {
      SDT_SerPreTFST073_Cab: [
        {
            FS01CONTPO: this.servicio.FS01CONTPO,
            FS46CONNRO: this.servicio.FS46CONNRO,
            FS44SrvIde: this.servicio.FS44SrvIde,
            FS44CodPre: this.servicio.FS44CodPre,
            FS73NroLin: "0",
            FS73AdiFch: fecha,
            FS73AdiCnt: this.inputCantidad,
            FS73MonCnu: this.inputMonImp,
            FS73Imp: this.inputImp,
            FS73Tpo: this.inputTipoAdicional,
            FS73DtoImp: this.inputImpDto,
            FS73FchIni: fechaInicio,
            FS73FchFin: fechaFin,
            FS73CliCod: this.inputCliCod,
            FS73CliSuc: this.inputSuc,
            FS73ConIns: this.inputCobInsVal,
            FS73OrdIns: this.inputOrd,
            FS73ProRrt: this.inputProrrateo,
            FS73InhPrm: this.inputTerminoPromocion,
            FS73MonCuo: this.inputMonCuo,
            FS73ImpCuo: this.inputImpCuo,
            FS73CntCuo: this.inputCntCuo,
            FS73FacCuo: "0",
            FS73UsuUpd: this.user.substring(0, 10),
            FS73FhoUpd: "",
            FS73DMOCNU: this.inputMonDto,
            UserWs: `${environment.usuarioBancard}`,
            PassWs: `${environment.claveBancard}`,
            ModoRest: "POST",
            Usuario: this.user.substring(0, 10)
        }
    ]
    }
    this.adicionalService.createAdicional(adicionalRequest)
      .then((data:any) => {
        this.showMensaje = true;
        this.mensaje = data.DatosOut[0].Mensaje;
        this.btnLoading = false;
      }).catch((err:any)=>{
        this.showMensaje = true;
        this.mensaje="Hubo un error al crear el adicional, intente nuevamente."
        this.btnLoading = false;
      })
  }


}


