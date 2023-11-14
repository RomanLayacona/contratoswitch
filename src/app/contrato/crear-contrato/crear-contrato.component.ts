import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ContratoService } from 'src/app/services/contrato.service';
import {Location} from '@angular/common';
import { ContratoSwitch } from 'src/app/models/contrato-switch';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crear-contrato',
  templateUrl: './crear-contrato.component.html',
  styleUrls: ['./crear-contrato.component.scss']
})
export class CrearContratoComponent implements OnInit {

  tipoContratoInput: any;

  tipoContratos: any[] = [];

  contratos: ContratoSwitch[] = []

  btnLoading: boolean = false;
  showMensaje: boolean = false;
  mensaje: string = '';

  codigoCliente: number = -1;
  codigoSucursal: number = -1;
  user: string= "";

  faSpinner = faSpinner;

  constructor(private contratoService: ContratoService,
    private location: Location,
    private dataService: DataService) { }

  ngOnInit(): void {

    this.codigoCliente = this.dataService.codigoCliente;
    this.codigoSucursal = this.dataService.codigoSucursal;
    this.user = this.dataService.username;

    var reqTipoContratos = {
      ParmIn: {
        UserWs:`${environment.usuarioBancard}`,
        PassWs:`${environment.claveBancard}`
      }
    }

    this.contratoService.getTiposContratos(reqTipoContratos)
      .then((data:any) => {
        data.ParmOut.forEach(element => {
          this.tipoContratos.push(element);
        });
      })
  }

  goBack(){
    this.location.back();
  }

  crearContrato(){
    this.btnLoading = true; 
    
    var datoContrato = {
      DatosContratos: {
        CodigoSucursal: this.codigoSucursal,
        CodigoCliente: this.codigoCliente,
        TipoContrato: this.tipoContratoInput,
        NroContrato: "",
        CodigoAsesor: "",
        Firmante1CCod: "",
        Firmante2CCod: "",
        Firmante3CCod: "",
        Firmante1BCod: "",
        Firmante2BCod: "",
        NroContratoExt: "",
        Estado: "A",
        Motivo: "",
        Observacion: "",
        Usuario: this.user.substring(0, 10),
        UserWs: `${environment.usuarioBancard}`,
        PassWs: `${environment.claveBancard}`,
        ModoRest: "POST"
      }
    }

    this.contratoService.createContrato(datoContrato)
      .then((data:any) => {
        this.showMensaje = true;
        this.mensaje = data.DatosOut[0].Mensaje;
        this.btnLoading = false;
      })
  }

}
