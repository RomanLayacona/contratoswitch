import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ContratoService } from 'src/app/services/contrato.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-create-parametro-comision',
  templateUrl: './create-parametro-comision.component.html',
  styleUrls: ['./create-parametro-comision.component.scss']
})
export class CreateParametroComisionComponent implements OnInit {

  contrato: any;
  codigoCliente: any;
  codigoSucursal: any;

  btnLoadingAgregarParamCom: boolean = false;
  mensaje: string = '';
  showMensaje: boolean = false;

  faSpinner = faSpinner;

  origenTipoRelInput: any;
  entidadIntercambioInput: any;
  codMonInput: any;
  frecuenciaLiqInput: any;
  tipoComisionInput: any;
  ctaBcaInput: any;
  porcentajeComInput: any;
  importeComMinInput: any;
  importeComMaxInput: any;
  importeFijoComInput: any;
  importeTranAplFijoInput: any;

  entidadesIntercambio: any[] = [];
  cuentasBancarias: any[] = [];

  origenesTipoRelacion: any[] = [
    {
      value: 1,
      name: "CONTRATO-ESTANDAR"
    },
    {
      value: 3,
      name: "CONTRATO-AFINIDAD"
    },
    {
      value: 4,
      name: "CONTRATO-INTER.INTERCAMBIO"
    },
    {
      value: 5,
      name: "CONTRATO-SERVICIO"
    },
    {
      value: 6,
      name: "CONTRATO-CUOTA SIN INTER."
    },
    {
      value: 7,
      name: "CONTRATO-CUOTA NORMAL"
    },
    {
      value: 8,
      name: "CONTRATO-MARCA"
    }
  ]

  constructor(
    private contratoService: ContratoService,
    private dataService: DataService
  ) {
      this.contrato = this.dataService.contratoProcesadora;
      this.codigoCliente = this.dataService.codigoCliente;
      this.codigoSucursal = this.dataService.codigoSucursal;
   }

  ngOnInit(): void {
    this.getEntidadesIntercambio();
    this.getCuentasBancarias();
  }

  getEntidadesIntercambio(){
    var req = {
      DatosEntidadIntercambio: {
        UserWs: "wscrm",
        PassWs: "CRMTEXT01",
        ModoRest: "GET"
      }
    }

    this.contratoService.entidadesIntercambio(req)
      .then((data:any) => {
        this.entidadesIntercambio = data.EntidadIntercambio;
      })
  }

  getCuentasBancarias(){
    var req = {
      DatosLiquidaCheque: {
        CodigoCliente: this.codigoCliente,
        CodigoSucursal: this.codigoSucursal,
        LiquidaCheque: this.contrato.GP77LiqChq,
        CuentasSelectas: [],
        Usuario: "sistema",
        UserWs: "wscrm",
        PassWs: "CRMTEXT01",
        ModoRest: "GET"
      }
    }

    this.contratoService.liquidaCheque(req)
      .then((data:any) => {
        data.DatosComision[0].CuentasBancarias.forEach(element => {
          if(this.cuentasBancarias.length === 0) this.cuentasBancarias.push(element);
          else {
            var prevCuentaId = this.cuentasBancarias[0].GR17CtaBan;
            if (prevCuentaId !== element.GR17CtaBan){
              this.cuentasBancarias.push(element);
            }
          }
        });
      })
  }

  agregarParamCom() {
    var ctaBancaria: any;
    this.cuentasBancarias.forEach(element => {
      if (element.GR17CtaBan === this.ctaBcaInput) ctaBancaria = element;
    });

    this.btnLoadingAgregarParamCom = true;

    var req = {
      comision: {
        Usuario: "sistema",
        UserWs: "wscrm",
        PassWs: "CRMTEXT01",
        HttpMethod: "POST",
        GP77CliCod: this.codigoCliente,
        GP77CliSuc: this.codigoSucursal,
        GR18MonCnu: this.codMonInput,
        GR16RelId: this.origenTipoRelInput,
        GR18FrcLiq: this.frecuenciaLiqInput,
        GR18TpoCom: this.tipoComisionInput,
        GR18PorCom: this.porcentajeComInput,
        GR18ComMin: this.importeComMinInput,
        GR18ComMax: this.importeComMaxInput,
        GR17BanCod: ctaBancaria.GR17BanCod,
        GR17CtaBan: ctaBancaria.GR17CtaBan,
        GR17SecNro: ctaBancaria.GR17SecNro,
        GR17TpoCta: ctaBancaria.GR17TpoCta,
        GR17SenCod: ctaBancaria.GR17SenCod,
        GR19ValEstDestino: "P",
        GuardaFilas: [],
        vGP77LiqChq: "A",
        Especial: "N",
        GR18MARCOD: "",
        GR18SRVIDE: "",
        GR18ENTCOD: 0,
        GR18ENTAFI: 0,
        GR18AFIID: 0,
        programa: "GRP256",
        GR18IMPFIJ: 0,
        GR18APLFIJ: 0,
        GR18EstAut: "",
        GR18Estado: "",
        ModificaCtaBan: ""
      }
    }
  }

}
