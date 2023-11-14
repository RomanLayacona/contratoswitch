import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ContratoSwitch } from 'src/app/models/contrato-switch';
import { ServicioPrestacion } from 'src/app/models/servicio-prestacion';
import { TipoContServ } from 'src/app/models/tipoContSer';
import { ContratoService } from 'src/app/services/contrato.service';
import { DataService } from 'src/app/services/data.service';
import { ServicioprestacionService } from 'src/app/services/servicioprestacion.service';
import {Location} from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ingresar-servicio',
  templateUrl: './ingresar-servicio.component.html',
  styleUrls: ['./ingresar-servicio.component.scss']
})
export class IngresarServicioComponent implements OnInit {

  contrato : ContratoSwitch = {};
  
  servicios: ServicioPrestacion[] = [];

  servicioPrestacion: ServicioPrestacion = {};

  requestDatosServicio : any = {
    DatosServicio: this.servicioPrestacion
  }

  inputServicio: string = '';

  btnLoading: boolean = false;
  showMensaje: boolean = false;
  mensaje: string = '';

  faSpinner = faSpinner;

  requestTipoContServ : TipoContServ = {
    ParmIn: {}
  }

  constructor(private dataService: DataService,
    private servicioPresService: ServicioprestacionService,
    private contratoService: ContratoService,
    private location: Location) {
    this.contrato = this.dataService.contrato;

    this.requestTipoContServ.ParmIn = {
      PassWs: `${environment.claveBancard}`,
      UserWs: `${environment.usuarioBancard}`,
      FS01CONTPO: this.contrato.TipoContrato
    }


    this.servicioPresService.getServiciosByTipoContrato(this.requestTipoContServ)
      .then((data:any) => {
      })
   }

  ngOnInit(): void {
    this.servicioPresService.getServiciosByTipoContrato(this.requestTipoContServ)
      .then((data: any) => {
        data.ParmOut.forEach(element => {
          this.servicios.push(element);
        });
      })
  }

  ingresarServicio(){
    this.btnLoading = true;
    this.requestDatosServicio = {
      DatosServicio : {
        FS01ConTpo: this.contrato.TipoContrato,
        FS46ConNro: this.contrato.NroContrato,
        FS44SrvIde: this.inputServicio,
        FS46CliCod: this.contrato.CodigoCliente,
        FS46CliSuc: this.contrato.CodigoSucursal,
        UserWs: `${environment.usuarioBancard}`,
        PassWs: `${environment.claveBancard}`
      }
    }

    this.contratoService.ingresarServicio(this.requestDatosServicio)
      .then((data:any) => {

        data.DatosOut.forEach(element => {
          this.mensaje = element.Mensaje;
          this.mensaje += ', ';
        });
        this.btnLoading = false;
        this.showMensaje = true;
      })
  }

  goBack() {
    this.location.back();
  }

}
