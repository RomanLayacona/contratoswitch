import { Component, OnInit } from '@angular/core';
import { ContratoService } from 'src/app/services/contrato.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cambio-estado-liq-cheque',
  templateUrl: './cambio-estado-liq-cheque.component.html',
  styleUrls: ['./cambio-estado-liq-cheque.component.scss']
})
export class CambioEstadoLiqChequeComponent implements OnInit {

  contrato: any;
  codigoCliente: any;
  codigoSucursal: any;
  estadoFuturo: any = {};

  cuentasBancarias: any[] = [];


  constructor(
    private dataService: DataService,
    private contratoService: ContratoService) {
      this.contrato = this.dataService.contratoProcesadora;
      this.codigoCliente = this.dataService.codigoCliente;
      this.codigoSucursal = this.dataService.codigoSucursal;

      if(this.contrato.GP77LiqChq === 'S') this.estadoFuturo = { value: 'N', name: 'NO'}; else this.estadoFuturo = { value: 'S', name: 'SI'};
     }

  ngOnInit(): void {
    this.getCuentasLiquidaCheque("S");
  }

  getCuentasLiquidaCheque(liqChe: string) {
    var req = {
      DatosLiquidaCheque: {
        CodigoCliente: this.codigoCliente,
        CodigoSucursal: this.codigoSucursal,
        LiquidaCheque: liqChe,
        CuentasSelectas: [],
        Usuario: "sistema",
        UserWs: "wscrm",
        PassWs: "CRMTEXT01",
        ModoRest: "GET"
      }
    }

    this.contratoService.liquidaCheque(req)
      .then((data:any) => {
        console.log("RESPUESTA:");
        console.log(data);
      })
  }

}
