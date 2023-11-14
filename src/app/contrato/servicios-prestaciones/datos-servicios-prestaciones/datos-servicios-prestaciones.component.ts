import { Component, Input, OnInit } from '@angular/core';
import { Adicional, RequestAdicional } from 'src/app/models/adicional';
import { ServicioPrestacion } from 'src/app/models/servicio-prestacion';
import { AdicionalesService } from 'src/app/services/adicionales.service';
import { DataService } from 'src/app/services/data.service';
import { DescuentosntService } from 'src/app/services/descuentosnt.service';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheckCircle, faEdit, faSearch, faSpinner, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faClipboard, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import * as moment from 'moment';
import { ActivacionesService } from 'src/app/services/activaciones.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { RolesService } from 'src/app/services/roles.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-datos-servicios-prestaciones',
  templateUrl: './datos-servicios-prestaciones.component.html',
  styleUrls: ['./datos-servicios-prestaciones.component.scss']
})
export class DatosServiciosPrestacionesComponent implements OnInit {
  loadingProd = false;

  roles : any[] = [];
  permisosRoles: any[] = [];
  rol: any = {};
  rolAdicionales: any = {};
  rolActivaciones: any = {};


  servicio: ServicioPrestacion = {};
  user: string='';

  oportunidades: any[]=[]
  productos: any[]=[];

  oportunityID:any;
  cnt:any='1';

  clienteID:any;

  casaMatriz: boolean;
  cuotas: boolean;
  activaciones: boolean;
  transaccional: boolean;
  descuentos: boolean;
  loading: boolean = false;
  agregando: boolean=false;
  loadingAdi: boolean=false


  showMensaje: boolean = false;
  mensaje: string = '';

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faCheckCircle = faCheckCircle;

  datosDesNoTransac: any;
  descuentosNoTr: any[] = [];

  ordenes:any[]=[]; 
  
  requestAdicional: RequestAdicional = { 
    SDT_SerPreTFST073_Cab: [
      {}
    ]
  };

  adicional: Adicional = {};

  adicionales: Adicional[]=[];

  inputFiltroActFechaDsd: any;
  inputFiltroActFechaHta: any;
  inputFiltroActTpo: any;
  inputFiltroActInsCod: any;
  loadingActivaciones: boolean = true;


  OCId:any='';
  observacion:any='';


  faSpinner = faSpinner;
  faClipboard = faClipboard;
  faSearch = faSearch;


  resActivaciones: any[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private descuentoNTService: DescuentosntService,
    private adicionalService: AdicionalesService,
    private location: Location,
    private router: Router,
    private activacionesService: ActivacionesService,
    private rolesService: RolesService,
    private modalService: NgbModal) {
    this.servicio = dataService.servicio;


    if(this.servicio.FS46CasMat === 'N') this.casaMatriz = false; else this.casaMatriz = true;
    if(this.servicio.FS44PreCuo === 0) this.cuotas = false; else this.cuotas = true;
    if(this.servicio.FS44PreAct === 0) this.activaciones = false; else this.activaciones = true;
    if(this.servicio.FS44TrnStt === 0) this.transaccional = false; else this.transaccional = true;
    if(this.servicio.FS44PreDes === 0) this.descuentos = false; else this.descuentos = true;

    this.getDescuentosNoTransaccionales();

    this.getActivaciones();



    if(this.servicio.FS44PreDif === 1) {
      this.getAdicionales();
    }

   }


  ngOnInit(): void {
    this.user = this.dataService.username;

    console.log(this.servicio.FS44SrvIde)
    console.log(this.servicio.FS44CodPre)

    this.rolesService.getRolesUsuario(this.user).then((data:any)=>{
      data.body.d.results.forEach(rol=>{
        this.roles.push(rol.BusinessRoleID)
        
      })
      this.rolesService.getRoles().then((data:any)=>{
        this.rol = data.body.d.results.filter(permiso => {
          if(this.permisosRoles.length == 0 ){         
            return this.roles.includes(permiso.zRol) && permiso.zMashup.toLowerCase() == 'sw1' && permiso.zEntidad.toLowerCase() == 'descuentos'
          }

          return
        }).sort((a,b)=>b.zConcatenado - a.zConcatenado)[0]

        this.rolAdicionales = data.body.d.results.filter(permiso => {

          if(this.permisosRoles.length == 0 ){
            
            return this.roles.includes(permiso.zRol) && permiso.zMashup.toLowerCase() == 'sw1' && permiso.zEntidad.toLowerCase() == 'adicionales'

          }

          return
        }).sort((a,b)=>b.zConcatenado - a.zConcatenado)[0]

        this.rolActivaciones = data.body.d.results.filter(permiso => {

          if(this.permisosRoles.length == 0 ){
            
            return this.roles.includes(permiso.zRol) && permiso.zMashup.toLowerCase() == 'sw1' && permiso.zEntidad.toLowerCase() == 'activaciones'

          }

          return
        }).sort((a,b)=>b.zConcatenado - a.zConcatenado)[0]

        

      })
     
    })
  }


  getOC(){
    this.loading=true;
    this.adicionalService.getOC(this.dataService.clienteID).then((data:any)=>{

      this.oportunidades = data.body.d.results;
      this.loading=false;
    })
  }

  getDescuentosNoTransaccionales(){
    if(this.servicio.FS44PreDes === 1 && this.servicio.FS47FATId !== 'N') {
      this.datosDesNoTransac = {
        DatosDesNoTransac: {
          FS01CONTPO: this.servicio.FS01CONTPO,
          FS46CONNRO: this.servicio.FS46CONNRO,
          UserWs: `${environment.usuarioBancard}`,
          PassWs: `${environment.claveBancard}`,
          ModoRest: 'GET',
          Usuario: this.user.substring(0, 10)
        }
      }

      this.descuentoNTService.getDescuentosNoTransaccionales(this.datosDesNoTransac)
        .then((data:any) => {
          this.descuentosNoTr = data.DatosRespuesta.DatosConsulta;
        })

    }
  }


  getAdicionales(){
    this.loadingAdi=true;
    this.requestAdicional.SDT_SerPreTFST073_Cab =[
      {
       FS01CONTPO: this.servicio.FS01CONTPO,
       FS46CONNRO: this.servicio.FS46CONNRO,
       FS44SrvIde: this.servicio.FS44SrvIde,
       FS44CodPre: this.servicio.FS44CodPre,
       // FS73NroLin: "1",
       // FS73AdiFch: "16/03/21",
       // FS73AdiCnt: "1",
       // FS73MonCnu: "840",
       // FS73Imp: "17.00",
       // FS73Tpo: "V",
       // FS73DtoImp: "0.00",
       // FS73FchIni: "/ /",
       // FS73FchFin: "/ /",
       FS73CliCod: this.servicio.FS47CliCod,
       FS73CliSuc: this.servicio.FS46CLISUC,
       // FS73ConIns: "0",
       // FS73OrdIns: "100219",
       // FS73ProRrt: "1",
       // FS73InhPrm: "0",
       // FS73MonCuo: "0",
       // FS73ImpCuo: "0.00",
       // FS73CntCuo: "0",
       // FS73FacCuo: "0",
       // FS73UsuUpd: "",
       // FS73FhoUpd: "",
       // FS73DMOCNU: "840",
       UserWs: `${environment.usuarioBancard}`,
       PassWs: `${environment.claveBancard}`,
       ModoRest: "GET",
       Usuario:  this.dataService.username.substring(0, 10)
     }
   ]

     this.adicionalService.getAdicionales(this.requestAdicional)
       .then((data:any) => {
         this.adicionales=data.SDT_SerPreTFST073_Cab;
       })
  }




  getActivaciones(){
    this.loadingActivaciones = true;
    if(this.servicio.FS44PreAct === 1) {
      var request = {
        ParmIn: {
          UserWs: `${environment.usuarioBancard}`,
          PassWs: `${environment.claveBancard}`,
          FS46CONNRO: this.servicio.FS46CONNRO,
          FS44SrvIde: this.servicio.FS44SrvIde,
          FS44CodPre: this.servicio.FS44CodPre,
          FS01CONTPO: this.servicio.FS01CONTPO,
          FechaDesde: this.inputFiltroActFechaDsd,
          FechaHasta: this.inputFiltroActFechaHta,
          FS48TPO: this.inputFiltroActTpo,
          FS48INSCOD: this.inputFiltroActInsCod
        }
      };

      //seteo la fecha a string
      if(this.inputFiltroActFechaDsd) {
        var ano: string = this.inputFiltroActFechaDsd.substring(0, 4);
        var mes: string = this.inputFiltroActFechaDsd.substring(5, 7);
        var dia: string = this.inputFiltroActFechaDsd.substring(8, 10);
        request.ParmIn.FechaDesde = ano + mes + dia;
      }

      //seteo la fecha a string
      if(this.inputFiltroActFechaHta) {
        var ano: string = this.inputFiltroActFechaHta.substring(0, 4);
        var mes: string = this.inputFiltroActFechaHta.substring(5, 7);
        var dia: string = this.inputFiltroActFechaHta.substring(8, 10);
        request.ParmIn.FechaHasta = ano + mes + dia;
      }

      this.activacionesService.getActivaciones(request)
        .then((data:any) => {
          this.resActivaciones = data.ParmOut;
          this.loadingActivaciones = false;
        })
      
    }
  }

  limpiarFiltrosActivaciones(){
    this.inputFiltroActFechaDsd = '';
    this.inputFiltroActFechaHta = '';
    this.inputFiltroActInsCod = '';
    this.inputFiltroActTpo = '';

    this.getActivaciones();
  }

  goBack() {
    this.location.back();
  }


  open(content) {
    this.modalService.open(content);
  }

  
  openLg(content) {
    this.modalService.open(content, {size: 'lg'});
    this.getOC()
  }
  openEliminar(content, adicional){
    this.adicional = adicional;
    this.modalService.open(content);
  }



  openOrden(content, adicional){
    this.adicional = adicional;
    this.cnt=adicional.FS73AdiCnt.trim()
    this.modalService.open(content, {size:'lg'});
  }


  nuevoDescNt() {
    this.router.navigate(['servicios-y-prestaciones', this.servicio.FS44SrvIde, this.servicio.FS44CodPre, 'nuevo-descuento-no-transaccional']);
  }


  nuevoAdic() {
    this.router.navigate(['servicios-y-prestaciones', this.servicio.FS44SrvIde, this.servicio.FS44CodPre, 'nuevo-adicional']);
  }


  editarDescuento(descuento: any) {
    this.dataService.descuento = descuento;

    this.router.navigate(['servicios-y-prestaciones', this.servicio.FS44SrvIde, this.servicio.FS44CodPre, 'editar-descuento-no-transaccional']);
  }

  editarAdicional(adicional: any) {
    this.dataService.adicional = adicional;

    this.router.navigate(['servicios-y-prestaciones', this.servicio.FS44SrvIde, this.servicio.FS44CodPre, 'editar-adicional']);
  }

  eliminarDescuento(descuento: any){

    var dateIn = moment(descuento.FS50FchVig, 'DD-MM-YYYY');  
    var fechaIniString = dateIn.format('YYYY-MM-DD'); 
    
    //seteo la fecha a string
    var anoIni: string = fechaIniString.substring(0, 4);
    var mesIni: string = fechaIniString.substring(5, 7);
    var diaIni: string = fechaIniString.substring(8, 10);
    var fechaInicio = anoIni + mesIni + diaIni;
    
    let descuentoRequest: any = {
      DatosDesNoTransac: {
        FS01CONTPO:this.servicio.FS01CONTPO,
        FS46CONNRO: this.servicio.FS46CONNRO,
        FS44SrvIde: this.servicio.FS44SrvIde,
        FS44CodPre: this.servicio.FS44CodPre,
        FS50FchVig: fechaInicio,
        UserWs:`${environment.usuarioBancard}`,
        PassWs:`${environment.claveBancard}`,
        ModoRest:"DELETE",
        Usuario:this.user.substring(0, 10)
      }
    }

    this.descuentoNTService.eliminarDescuentosNoTransaccionales(descuentoRequest)
      .then((data:any) => {
        this.showMensaje = true;
        this.mensaje = data.DatosRespuesta.DatosOut[0].Mensaje;

        this.getDescuentosNoTransaccionales();
      })



}
eliminarAdicional(){
  
  var date = moment(this.adicional.FS73AdiFch, 'DD-MM-YYYY');  
  var fecha = date.format('YYYY-MM-DD'); 
  
  //seteo la fecha a string
  var anoIni: string = fecha.substring(0, 4);
  var mesIni: string = fecha.substring(5, 7);
  var diaIni: string = fecha.substring(8, 10);
  var fechaAdi = anoIni + mesIni + diaIni;
  let adicionalRequest=
  {
    SDT_SerPreTFST073_Cab :[
    {
     FS01CONTPO: this.servicio.FS01CONTPO,
     FS46CONNRO: this.servicio.FS46CONNRO,
     FS44SrvIde: this.servicio.FS44SrvIde,
     FS44CodPre: this.servicio.FS44CodPre,
     FS73NroLin: this.adicional.FS73NroLin,
     FS73AdiFch: "16/03/21",
     FS73AdiCnt: this.adicional.FS73AdiCnt,
     FS73MonCnu: this.adicional.FS73MonCnu,
     FS73Imp: this.adicional.FS73Imp,
     FS73Tpo: this.adicional.FS73Tpo,
     FS73DtoImp: this.adicional.FS73DtoImp,
     FS73FchIni: "/ /",
     FS73FchFin: "/ /",
     FS73CliCod: this.servicio.FS47CliCod,
     FS73CliSuc: this.servicio.FS46CLISUC,
     FS73ConIns: this.adicional.FS73ConIns,
     FS73OrdIns: this.adicional.FS73OrdIns,
     FS73ProRrt: this.adicional.FS73ProRrt,
     FS73InhPrm: this.adicional.FS73InhPrm,
     FS73MonCuo: this.adicional.FS73MonCuo,
     FS73ImpCuo: this.adicional.FS73ImpCuo,
     FS73CntCuo: this.adicional.FS73CntCuo,
     FS73FacCuo: this.adicional.FS73FacCuo,
     FS73UsuUpd: "",
     FS73FhoUpd: "",
     FS73DMOCNU: this.adicional.FS73DMOCNU,
     UserWs: `${environment.usuarioBancard}`,
     PassWs: `${environment.claveBancard}`,
     ModoRest: "DELETE",
     Usuario: this.user.substring(0, 10)
   }
 ]
  }
  this.adicionalService.eliminarAdicional(adicionalRequest)
    .then((data:any) => {
      this.showMensaje = true;
      this.mensaje = data.DatosOut[0].Mensaje;
      this.getAdicionales();
    })
}

agregarOrden(){

  this.agregando=true
  var obs= this.observacion + ' ' + this.servicio.FS44SrvIde + '/' + this.servicio.FS44CodPre;
  var req=
      {
        "OrdenInstalacion": {
            "FS01CONTPO": this.servicio.FS01CONTPO,
            "FS46CONNRO": this.servicio.FS46CONNRO,
            "FS46CLICOD": this.servicio.FS46CLICOD,
            "FS46CLISUC": this.servicio.FS46CLISUC,
            "GE01EmpCod": this.servicio.FS44EmpCod,
            "FS01DivCod": this.servicio.FS01DivCod,
            "IN23InsObs":obs,
            "IN23InsCnt": this.cnt,
            "IN23CRMOc": this.OCId,
            "FS44SrvIde": this.servicio.FS44SrvIde,
            "FS44CodPre": this.servicio.FS44CodPre,
            "FS47CntAvi": this.adicional.FS73AdiCnt?.trim(),
            "FS73NroLin": this.adicional.FS73NroLin?.trim(),
            "usuario": this.user.substring(0, 10),
            "UserWs": `${environment.usuarioBancard}`,
            "PassWs": `${environment.claveBancard}`,
            "Productos":this.productos
        }
    }

    this.adicionalService.crearOrden(req).then((data:any)=>{
      this.agregando=false;
      if(data.DatosOut[0].CodError!='00'){
        alert(data.DatosOut[0].Mensaje)
        return
      }
      this.modalService.dismissAll()
      this.getAdicionales()
    }).catch((err:any)=>{
      this.agregando=false;
      alert(err)
    })



}

asignarID(id, object){
  this.OCId = id;
  this.getProductos(object)


}
getProductos(id){
  this.loadingProd=true
  this.adicionalService.getOCitems(id).then((data:any)=>{
    this.productos=[];
    data.body.d.results.forEach(element=>{
      var producto = {
        ProductoID: element.ProductID
      }
      this.productos.push(producto)
    })
    this.loadingProd = false;
  })

}

}
