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
import * as moment from 'moment';


import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { FormControl } from '@angular/forms';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { RolesService } from 'src/app/services/roles.service';
import { ThisReceiver } from '@angular/compiler';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar-adicional',
  templateUrl: './editar-adicional.component.html',
  styleUrls: ['./editar-adicional.component.scss']
})
export class EditarAdicionalComponent implements OnInit {
  contrato : ContratoSwitch = {};
  servicio: ServicioPrestacion = {};
  user: string = '';

  campos: any = {}
  roles : any[] = [];
  permisosRoles: any[] = [];
  rol: any = {};


  adicional: any;
  inputFecha: any;
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
  inputImpCuo: any;
  inputCntCuo: any;
  inputConIns: any;
  inputMonCuo:any;
  conInsVal:any;

  loading: boolean = false;
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
      value: 'V',
      name: 'Venta'
    },
  ]


  constructor(private dataService: DataService,
    private adicionalService: AdicionalesService,
    private location: Location, private modalService: NgbModal, private pipe: DecimalPipe, private contratoService: ContratoService, private rolesService: RolesService) {
    this.adicional = this.dataService.adicional;
    this.servicio = dataService.servicio;
    this.inputCliCod = this.adicional.FS73CliCod.trim();
    this.inputSuc = this.adicional.FS73CliSuc.trim();
    this.inputTipoAdicional = this.adicional.FS73Tpo;
    this.inputProrrateo = this.adicional.FS73ProRrt;
    this.inputTerminoPromocion = this.adicional.FS73InhPrm;
    this.inputMonImp=this.adicional.FS73MonCnu;
    this.inputMonDto=this.adicional.FS73MonCnu;
    this.inputImpDto=this.adicional.FS73DtoImp.trim();
    this.inputImp=this.adicional.FS73Imp.trim();
    this.inputFechaInicio=this.adicional.FS73FchIni;
    this.inputFechaFin=this.adicional.FS73FchFin;
    this.inputFecha=this.adicional.FS73AdiFch;
    this.inputImpCuo=this.adicional.FS73ImpCuo;
    this.inputCntCuo=this.adicional.FS73CntCuo;
    if(this.adicional.FS73ConIns =='1') this.inputConIns=this.adicional.FS73ConIns;
    this.conInsVal = this.adicional.FS73ConIns;
    this.inputMonCuo=this.adicional.FS73MonCuo;
  
    var dateAdi = moment(this.adicional.FS73AdiFch, 'DD-MM-YYYY');  
    var fechaAdiString = dateAdi.format('YYYY-MM-DD'); 
    this.inputFecha=fechaAdiString;

    if (this.inputFechaInicio !=="/ /" || this.inputFechaInicio !==""){
    var dateIn = moment(this.adicional.FS73FchIni, 'DD-MM-YYYY');  
    var fechaIniString = dateIn.format('YYYY-MM-DD'); 
    this.inputFechaInicio = fechaIniString;
    }

    if (this.inputFechaFin !=="/ /" || this.inputFechaFin !==""){
    var dateHta = moment(this.adicional.FS73FchFin, 'DD-MM-YYYY');
    var fechaHtaString = dateHta.format('YYYY-MM-DD'); 
    this.inputFechaFin = fechaHtaString;
    }


    this.inputCantidad=this.adicional.FS73AdiCnt.trim();
    this.inputOrd=this.adicional.FS73OrdIns.trim();



    this.contrato = this.dataService.contrato;

    this.sucursales$ = this.filterSuc.valueChanges.pipe(
      startWith(''),
      map(text => this.searchSucursales(text, this.pipe))
    );

    this.clientes$ = this.filterCli.valueChanges.pipe(
      startWith(''),
      map(text => this.searchClientes(text, this.pipe))
    );
  }

  ngOnInit(): void {
    this.user = this.dataService.username;
    this.getClientes();
    this.getSucursales();


    this.rolesService.getRolesUsuario(this.user).then((data:any)=>{
      data.body.d.results.forEach(rol=>{
        this.roles.push(rol.BusinessRoleID)
      })
      this.rolesService.getRoles().then((data:any)=>{
        this.rol = data.body.d.results.filter(permiso => {
          
          if(this.permisosRoles.length == 0 ){
            
            return this.roles.includes(permiso.zRol) && permiso.zMashup.toLowerCase() == 'sw1' && permiso.zEntidad.toLowerCase() == 'editaradicional'

          }
          return
        }).sort((a,b)=>b.zConcatenado - a.zConcatenado)[0]

        if(this.rol.zControlCampo == true){
          this.rolesService.getRolesCrontrolCampo(this.rol.zRol).then((data:any)=>{
            this.roles = data.body.d.results;
            
            this.roles.forEach((element:any) =>{
            
              if(element.zMashup.toLowerCase() == 'sw1' && element.zEntidad.toLowerCase() == 'editaradicional'){
                this.campos[`${element.Campo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`] = element
              }
            })
            this.loading = true;
          })
        }
        

      })
      this.loading = true;

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


  openSucModal(content) {
    if(this.inputCliCod === '' || this.inputCliCod === undefined) alert("Debe seleccionar un cliente para seleccionar sucursal"); 
    else this.modalService.open(content);
  }

  onChange(){
    this.conInsVal = this.conInsVal == '1' ? '0' : '1';
  }

  actualizarAdicional(){
    this.btnLoading = true;

    //seteo la fecha a string
    var ano: string = this.inputFecha.substring(0, 4);
    var mes: string = this.inputFecha.substring(5, 7);
    var dia: string = this.inputFecha.substring(8, 10);
    var fecha = dia + '/' + mes+ '/' + ano ;
    var fechaFin;
    var fechaInicio;
    if (this.inputFechaInicio !=="/ /" || this.inputFechaInicio !==""){
    var anoIni: string = this.inputFechaInicio.substring(0, 4);
    var mesIni: string = this.inputFechaInicio.substring(5, 7);
    var diaIni: string = this.inputFechaInicio.substring(8, 10);
    fechaInicio = diaIni + '/' + mesIni+ '/' + anoIni ;
    }
    if (this.inputFechaFin !=="/ /" || this.inputFechaFin !==""){
    var anoFin: string = this.inputFechaFin.substring(0, 4);
    var mesFin: string = this.inputFechaFin.substring(5, 7);
    var diaFin: string = this.inputFechaFin.substring(8, 10);
    fechaFin = diaFin + '/' + mesFin+ '/' +anoFin ;
    }
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
            FS73NroLin: this.adicional.FS73NroLin,
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
            FS73ConIns: this.conInsVal,
            FS73OrdIns: this.inputOrd,
            FS73ProRrt: this.inputProrrateo,
            FS73InhPrm: this.inputTerminoPromocion,
            FS73MonCuo: this.inputMonCuo,
            FS73ImpCuo: this.inputImpCuo,
            FS73CntCuo: this.inputCntCuo,
            FS73FacCuo: "",
            FS73UsuUpd: "usuario",
            FS73FhoUpd: "",
            FS73DMOCNU: "",
            UserWs: `${environment.usuarioBancard}`,
            PassWs: `${environment.claveBancard}`,
            ModoRest: "PUT",
            Usuario: this.user.substring(0, 10)
        }
    ]
    }

    this.adicionalService.actualizarAdicional(adicionalRequest)
      .then((data:any) => {
        this.showMensaje = true;
        this.mensaje = data.DatosOut[0].Mensaje;
        this.btnLoading = false;
      })
  }

}
