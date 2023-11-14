import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faBan, faSearch, faSpinner, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { ContratoFindExt } from '../models/contrato-find';
import { ContratoSwitch } from '../models/contrato-switch';
import { ContratoService } from '../services/contrato.service';
import { DataService } from '../services/data.service';
import { RolesService } from '../services/roles.service';


const CONTRATOS: ContratoSwitch[] = [];

const entidad = 'contratos';


@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.scss'],
})
export class ContratoComponent implements OnInit {
  authorized:boolean=false;
  token:string ="";

  page = 1;
  pageSize = 4;
  collectionSize = CONTRATOS.length;
  contratos: ContratoSwitch[] = [];

  @Input() contratoEdit: any; 
  
  existeUsuario: boolean = false;
  roles : any[] = [];
  permisosRoles: any[] = [];
  rol: any = {}

  codigoCliente: number = 0;
  codigoSucursal: number = 0;
  user: string = "";

  nombreCliente: string = "";
  nombreSucursal: string = "";

  showTablaContratos: boolean = false;
  loading: boolean;
  faSpinner = faSpinner;

  contratoFindExt: ContratoFindExt = {
    "DatosContratos": {
      "CodigoCliente":0,
      "CodigoSucursal":0,
      "ModoRest": "GET",
      "Usuario": "",
      "UserWs": `${environment.usuarioBancard}`,
      "PassWs": `${environment.claveBancard}` 
    }
  };

  faToogleOn = faToggleOn;
  faToogleOff = faToggleOff;
  faSearch = faSearch;

  constructor(private dataService: DataService,
              private activatedRoute: ActivatedRoute,
              private contratoService: ContratoService,
              private router: Router,
              private rolesService: RolesService) {
    this.refreshContratos();
    this.loading = true;
  }

  refreshContratos() {
    // this.countries = COUNTRIES
    //   .map((country, i) => ({id: i + 1, ...country}))
    //   .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.queryParams.subscribe(params => {
      this.codigoCliente = params['CodigoCliente'];
      this.user = params['usuario'];
      this.token = params['accessToken'];
      });
      this.getClientID(this.codigoCliente)


    this.contratoService.LoginBack().then((data:any)=>{
      this.contratoService.getTokenBack(this.token,data.data.access_token).then((data:any)=>{
        if(data.data.accessToken == this.token){
          this.authorized=true;
        }
      


      }).catch((err:any)=>{
        if(err.error.code==404 || err.error.code==401 ){
          this.authorized=false;
        }
      })
    })

    var longCli = this.codigoCliente.toString().length;
    var preCodSuc = this.codigoCliente.toString().substr(longCli - 3);
    this.codigoSucursal = +preCodSuc.replace(/^0+/, '');
    this.codigoCliente = +this.codigoCliente.toString().slice(0, -3);
   

    this.contratoFindExt.DatosContratos.CodigoCliente = this.codigoCliente;
    this.contratoFindExt.DatosContratos.CodigoSucursal = this.codigoSucursal;
    this.contratoFindExt.DatosContratos.Usuario=this.user;

    this.contratoService.getContrato(this.contratoFindExt).then((data: any) => {
      //carga de datos que vienen en el GET 
      this.nombreCliente = data.ContratoSwitch[0].FS46CliSNo;
      
      //lleno la lista de contratos
      data.ContratoSwitch.forEach(element => {
        var contrato:ContratoSwitch = {
          TipoContrato : element.FS01CONTPO,
          descTc: element.FS01ConDsc,
          NroContrato: element.FS46CONNRO,
          Estado: element.FS46Sts,
          usuarioIngreso: element.FS46UsuIng,
          fhIngreso: element.FS46FHIng,
          division: element.FS01DivCod,
          razonSocial: element.FS46CliNom,
          rubroId: element.FS46RubId,
          descRubro: element.FS46RubDes,
          codProc: element.FS46CodPro,
          codSwi: element.FS46CodSwi,
          denComercial: element.FS46CliSNo,
          mcc: element.FS46MerCod,
          descMcc: element.FS46DesEsp,
          CodigoCliente: element.FS46CLICOD,
          CodigoSucursal: element.FS46CLISUC
        }
        this.contratos.push(contrato);
      });
      if(this.contratos.length > 0) this.showTablaContratos = true; 
      this.loading = false;
      
    })
    .catch((error:any) => {
      if(this.contratos.length > 0) this.showTablaContratos = true; 
      this.loading = false;
    })
    
 
    this.rolesService.getRolesUsuario(this.user).then((data:any)=>{
      data.body.d.results.forEach(rol=>{
        this.roles.push(rol.BusinessRoleID)  
        if(this.roles.length > 0 ){
          this.existeUsuario = true;
        }
           
      })
      this.rolesService.getRoles().then((data:any)=>{
        this.rol = data.body.d.results.filter(permiso => {

          if(this.permisosRoles.length == 0 ){
            
            return this.roles.includes(permiso.zRol) && permiso.zMashup.toLowerCase() == 'sw1' && permiso.zEntidad.toLowerCase() == 'contratos'

          }
          this.permisosRoles[0].zEntidad = entidad;

          return
        }).sort((a,b)=>b.zConcatenado - a.zConcatenado)[0]

      })
     
    })  

    this.contratoService.LoginBack().then((data:any)=>{
      this.contratoService.getTokenBack(this.token,data.data.access_token).then((data:any)=>{
        if(data.data.accessToken == this.token){
          this.authorized=true;
        }
      


      }).catch((err:any)=>{
        if(err.error.code==404 || err.error.code==401 ){
          this.authorized=false;
        }
      })
    })
     
  }

  
  modificarEstado(contrato: ContratoSwitch) {
    this.showTablaContratos = false;

    this.dataService.contrato = contrato;
    this.dataService.username = this.user;

    this.router.navigate(['contrato', contrato.NroContrato, 'edit']);
  }

  serviciosPrestaciones(contrato: ContratoSwitch) {
    this.dataService.contrato = contrato;
    this.dataService.username = this.user;
    this.router.navigate(['contrato', contrato.NroContrato, contrato.TipoContrato, 'servicios-y-prestaciones']);
  }

  crearContrato(){
    this.dataService.codigoCliente = this.codigoCliente;
    this.dataService.codigoSucursal = this.codigoSucursal;
    this.dataService.username = this.user;
    this.router.navigate(['contrato', 'create']);
  }


  getClientID(id:any){
    this.contratoService.getClienteID(id).then((data:any)=>{
       this.dataService.clienteID=data?.body?.d?.results[0]?.AccountID
    })

  }
}
