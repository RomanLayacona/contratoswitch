import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContratoService } from 'src/app/services/contrato.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-parametros-comision',
  templateUrl: './parametros-comision.component.html',
  styleUrls: ['./parametros-comision.component.scss']
})
export class ParametrosComisionComponent implements OnInit {

  contrato: any;
  codigoCliente: any;
  codigoSucursal: any;
  estadoFuturo: any = {};

  parametrosComision: any[] = [];

  constructor(
    private dataService: DataService,
    private contratoService: ContratoService,
    private router: Router) {
      this.contrato = this.dataService.contratoProcesadora;
      this.codigoCliente = this.dataService.codigoCliente;
      this.codigoSucursal = this.dataService.codigoSucursal;
    }

  ngOnInit(): void {
    this.getParametrosComision("S");
  }

  getParametrosComision(liqChe: string) {
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

  agregarParametroComision(){
    this.router.navigate(['contrato-procesadora', 'agregar-parametro-comision']);
  }

}
