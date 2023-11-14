import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSpinner, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ContratoService } from '../services/contrato.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-contrato-procesadora',
  templateUrl: './contrato-procesadora.component.html',
  styleUrls: ['./contrato-procesadora.component.scss']
})
export class ContratoProcesadoraComponent implements OnInit {

  contrato: any = {};
  codigoCliente: string = '';
  codigoSucursal: string = '';

  loading: boolean = false;
  faSpinner = faSpinner;
  faTrash = faTrash;
  
  showMensaje: boolean = false;
  btnLoadingActualizarDatLiq: boolean = false;
  btnLoadingAgregarPlan: boolean = false;
  btnLoadingAgregarMarca: boolean = false;
  btnLoadingEliminarPlan: boolean = false;
  btnLoadingEliminarMarca: boolean = false;
  mensajeActLiq: string = "";

  conMaquinaOPosInput: any;
  contratoActualizadoInput: any;
  periocidadExtractoInput: any;
  impuestoComisionInput: any;
  retencionIVAInput: any;
  retencionRentaInput: any;
  motivoRetencionExtractoInput: any;
  categoriaCuentaLiqInput: any;
  ctsBancBloqInput: any;
  emisionAutInput: any;

  marcas: any[] = [];
  planes: any[] = [];
  cuentasBancarias: any[] = [];

  conMaquinaOPosOptions: any[] = [
    {
      name: 'Sin Máquina',
      value: 0
    },
    {
      name: 'Con Máquina',
      value: 1
    },
    {
      name: 'Con Pos',
      value: 2
    }
  ]

  planesAceptados: any[] = [
    {
      CODIGOPLAN: "00",
      DESCRIPCION: "COMPRA NORMAL CONTADO"
    },
    {
      CODIGOPLAN: "01",
      DESCRIPCION: "PLAN 1 - NORMAL - FINANCIA ENTIDAD"
    },
    {
      CODIGOPLAN: "02",
      DESCRIPCION: "PLAN 2 - PAGO A 60 DIAS - FINANCIA ENTIDAD"
    },
    {
      CODIGOPLAN: "03",
      DESCRIPCION: "PLAN 3 - CUOTAS S/INTERS - FINANCIA COMERCIO"
    },
    {
      CODIGOPLAN: "20",
      DESCRIPCION: "ADELANTO EFECTIVO - ATM"
    },
    {
      CODIGOPLAN: "21",
      DESCRIPCION: "ADELANTO EFECTIVO - POS"
    },
  ]

  motivosRetencionExtracto: any[] = [
    {
      GR09RETCOD: 'EBC',
      GR09RETDES: 'EBC - RETENER MATRIZ/AREA ADMIN'
    },
    {
      GR09RETCOD: 'EI',
      GR09RETDES: 'EI - GRUPO INTERFISA S.A.E.C.A'
    },
    {
      GR09RETCOD: 'E04',
      GR09RETDES: 'E04 - HSBC BANK PARAGUAY S.A.'
    },
    {
      GR09RETCOD: 'E07',
      GR09RETDES: 'E07 - BANCO ABN AMRO PT S.A.'
    },
    {
      GR09RETCOD: 'E12',
      GR09RETDES: 'E12 - SUDAMERIS BANK S.A.E.C.A'
    },
    {
      GR09RETCOD: 'E14',
      GR09RETDES: 'E14 - INTERBANCO S.A.'
    },
    {
      GR09RETCOD: 'E17',
      GR09RETDES: 'E17 - BANCO INTEGRACION S.A.'
    },
    {
      GR09RETCOD: 'E20',
      GR09RETDES: 'E20 - AGROFINANCIERA'
    },
    {
      GR09RETCOD: 'E21',
      GR09RETDES: 'E21 - COOP. UNIVERSITARIA LTDA'
    },
    {
      GR09RETCOD: 'E22',
      GR09RETDES: 'E22 - BANCO CONTINENTAL SAECA'
    },
    {
      GR09RETCOD: 'E26',
      GR09RETDES: 'E26 - BANCO AMAMBAY S.A.'
    },
    {
      GR09RETCOD: 'E29',
      GR09RETDES: 'E29 - FIN EL COMERCIO S.A.E.C.A.'
    },
    {
      GR09RETCOD: 'E36',
      GR09RETDES: 'E36 - BANCO REGIONAL S.A.E.C.A.'
    },
    {
      GR09RETCOD: 'E37',
      GR09RETDES: 'E37 - BANCO ITAPUA S.A.E.C.A.'
    },
    {
      GR09RETCOD: 'E38',
      GR09RETDES: 'E38 - COOMECIPAR LTDA'
    },
    {
      GR09RETCOD: 'E40',
      GR09RETDES: 'E40 - FINLATINA S.A. DE FINANZAS'
    },
    {
      GR09RETCOD: 'E48',
      GR09RETDES: 'E48 - BBVA PARAGUAY S.A.'
    },
    {
      GR09RETCOD: 'E51',
      GR09RETDES: 'E42 - BANCO ATLAS S.A.E.C.A.'
    },
    {
      GR09RETCOD: 'E54',
      GR09RETDES: 'E54 - BRIOS S.A. DE FINANZAS'
    },
    {
      GR09RETCOD: 'E55',
      GR09RETDES: 'E55 - CRISOL Y ENC. FINANC. S.A.'
    },
    {
      GR09RETCOD: 'E56',
      GR09RETDES: 'E56 - VISION BANCO S.A.E.C.A'
    },
    {
      GR09RETCOD: 'M01',
      GR09RETDES: 'M01 - RETENER MATRIZ/COMERCIOS'
    },
    {
      GR09RETCOD: 'M02',
      GR09RETDES: 'M02 - RETENER MATRIZ/COURIER'
    },
    {
      GR09RETCOD: 'V01',
      GR09RETDES: 'V02'
    },
    {
      GR09RETCOD: 'E24',
      GR09RETDES: 'E24 - BANCO FAMILIAR S.A.E.C.A'
    },
    {
      GR09RETCOD: 'E53',
      GR09RETDES: 'E53 - CITIBANK'
    },
  ]

  planAceptadoInput:any;

  constructor(
    private contratoService: ContratoService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private dataService: DataService,
    private router: Router
  ) {
   }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.codigoCliente = params['CodigoCliente'];
    });

    var longCli = this.codigoCliente.toString().length;
    var preCodSuc = this.codigoCliente.toString().substr(longCli - 3);
    this.codigoSucursal = preCodSuc.replace(/^0+/, '');
    this.codigoCliente = this.codigoCliente.toString().slice(0, -3);

    this.dataService.codigoCliente = +this.codigoCliente;
    this.dataService.codigoSucursal = +this.codigoSucursal;

    this.getContratoProcesadora();

    this.getPlanesMarcas();

  }

  getPlanesMarcas(){
    var requestPlanesMarcas = {
        DatosPlanMarca: {
          CodigoCliente: this.codigoCliente,
          CodigoSucursal: this.codigoSucursal,
          CodigoPlan: "",
          CodigoMarca: "",
          CodigoMCC: "",
          Usuario: "sistema",
          UserWs: "wscrm",
          PassWs: "crmtext01",
          ModoRest: "GET"
      }
    }

    this.contratoService.planesMarcas(requestPlanesMarcas)
      .then((data:any) => {
        this.marcas = data.Marcas;
        this.planes = data.Planes;
        this.btnLoadingEliminarPlan = false;
        this.btnLoadingEliminarMarca = false;
        this.btnLoadingAgregarMarca = false;
        this.btnLoadingAgregarPlan = false;
      })
  }

  getContratoProcesadora(){
    this.loading = true;
    var requestContrato = {
      DatosContrato: {
        CodigoCliente: this.codigoCliente,
        CodigoSucursal: this.codigoSucursal,
        Usuario: 'sistema',
        UserWs: 'wscrm',
        PassWs: 'CRMTEXT01',
        ModoRest: 'GET'
      }
    }

    console.log(requestContrato);

    this.contratoService.contratoProcesadora(requestContrato)
      .then((data: any) => {
        this.contrato = data.ContratoProcesadora;
        console.log(this.contrato);

        this.conMaquinaOPosInput = this.contrato.GP77MaqSel;
        this.contratoActualizadoInput = this.contrato.GP77ConAct;
        this.periocidadExtractoInput = this.contrato.GP77PerExt;
        this.emisionAutInput = this.contrato.GP77DetExt;
        this.ctsBancBloqInput = this.contrato.GP77CBBlo;
        this.categoriaCuentaLiqInput = this.contrato.GP77Cat;
        this.motivoRetencionExtractoInput = this.contrato.GR09RetCod;
        this.retencionRentaInput = this.contrato.GP77RRId;
        this.retencionIVAInput = this.contrato.GP77RIId;
        this.impuestoComisionInput = this.contrato.GP77IvaId;

        this.dataService.contratoProcesadora = this.contrato;
        
        this.getCuentasBancarias();

        this.loading = false;
      })
  }

  actualizarDatosDeLiq(){
    this.btnLoadingActualizarDatLiq = true;

    var requestActContrato = {
      DatosContrato: {
        CodigoCliente: this.codigoCliente,
        CodigoSucursal: this.codigoSucursal,
        CuentaSponsor: "",
        TipoCtaSponsor: "",
        EntidadSponsor: "",
        SucEntidadSponsor: "",
        PeriodExtracto: this.periocidadExtractoInput,
        MotRetExtracto: this.motivoRetencionExtractoInput,
        Categoria: this.categoriaCuentaLiqInput,
        CuentaId: "",
        // DetExtracto: "N",
        ImpComision: this.impuestoComisionInput,
        RetenIVA: this.retencionIVAInput,
        RetenRenta: this.retencionRentaInput,
        CuentaBloq: this.ctsBancBloqInput,
        LiquidaChq: 'N', //cambiar
        MaqPos: this.conMaquinaOPosInput,
        CapturaAut: this.contrato.GP77Cap,
        Usuario: 'sistema',
        UserWs: 'wscrm',
        PassWs: 'CRMTEXT01',
        ModoRest: 'PUT'
      }
    }

    console.log(requestActContrato);

    this.contratoService.contratoProcesadora(requestActContrato)
      .then((data:any) => {
        console.log(data);
        this.mensajeActLiq = data.DatosOut[0].Mensaje;
        this.showMensaje = true;
        this.btnLoadingActualizarDatLiq = false;

        (async () => { 
          // Do something before delay
          await this.delay(4000);
  
          // Do something after
          this.showMensaje = false;
        })();
      })
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  getCuentasBancarias(){
    var req = {
      DatosCuentaBancaria: {
        CodigoCliente: this.codigoCliente,
        CodigoSucursal: this.codigoSucursal,
        NroContrato: "",
        TipoContrato: "C", 
        NumeroPagina: "",
        CantidadRegistro: "",
        UserWs: 'wscrm',
        PassWs: 'CRMTEXT01',
        ModoRest: 'GET'
      }
    }

    console.log(req);

    this.contratoService.cuentasBancariasContrato(req)
      .then((data:any) => {
        this.cuentasBancarias = data.CuentasBancarias[0].Hits.CuentaBancariaPR;
        console.log(data);
        console.log(this.cuentasBancarias);
      })
  }

  deleteMarca(marca) {
    this.btnLoadingEliminarMarca = true;
    var reqDeleteMarca = {
      DatosPlanMarca: {
          CodigoCliente: this.codigoCliente,
          CodigoSucursal: this.codigoSucursal,
          CodigoPlan: "",
          CodigoMarca: marca.GP78MarCod,
          CodigoMCC: "",
          Usuario: "sistema",
          UserWs: "wscrm",
          PassWs: "crmtext01",
          ModoRest: "DELETE"
      }
    }

    this.contratoService.planesMarcas(reqDeleteMarca)
      .then((data:any) => {
        console.log(data);
      })
    
  }

  deletePlan(plan:any){
    this.btnLoadingEliminarPlan = true;
    var reqDeleteMarca = {
      DatosPlanMarca: {
          CodigoCliente: this.codigoCliente,
          CodigoSucursal: this.codigoSucursal,
          CodigoPlan: plan.GP13PLACOD,
          Usuario: "sistema",
          UserWs: "wscrm",
          PassWs: "crmtext01",
          ModoRest: "DELETE"
      }
    }

    console.log(reqDeleteMarca);

    this.contratoService.planesMarcas(reqDeleteMarca)
      .then((data:any) => {
        console.log(data);
        this.getPlanesMarcas();
      })
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  agregarMarca() {
    this.btnLoadingAgregarMarca = true;
    var requestAgrMarca = {
      DatosPlanMarca: {
          CodigoCliente: this.codigoCliente,
          CodigoSucursal: this.codigoSucursal,
          Usuario: "sistema",
          UserWs: "wscrm",
          PassWs: "crmtext01",
          ModoRest: "POST"
      }
    }

    this.contratoService.planesMarcas(requestAgrMarca)
      .then((data:any) => {
        console.log(data);
        this.getPlanesMarcas();
      })
  }

  agregarPlan(){
    this.btnLoadingAgregarPlan = true;
    var requestAgrMarca = {
      DatosPlanMarca: {
          CodigoCliente: this.codigoCliente,
          CodigoSucursal: this.codigoSucursal,
          CodigoPlan: this.planAceptadoInput,
          Usuario: "sistema",
          UserWs: "wscrm",
          PassWs: "crmtext01",
          ModoRest: "POST"
      }
    }

    this.contratoService.planesMarcas(requestAgrMarca)
      .then((data:any) => {
        console.log(data);
        this.getPlanesMarcas();
      })
  }

  cambioEstadoLiqChq() {
    this.dataService.contratoProcesadora = this.contrato;
    this.dataService.codigoCliente = +this.codigoCliente;
    this.dataService.codigoSucursal = +this.codigoSucursal;

    this.router.navigate(['contrato-procesadora', 'cambio-estado-liquida-cheque']);
  }
}
