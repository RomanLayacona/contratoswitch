import { Injectable } from '@angular/core';
import { ContratoSwitch } from '../models/contrato-switch';
import { ServicioPrestacion } from '../models/servicio-prestacion';
import { Adicional } from '../models/adicional';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  public contrato: ContratoSwitch;
  public contratoProcesadora: any;
  public servicio: ServicioPrestacion;
  public descuento: any;
  public adicional: Adicional;
  public codigoCliente: number;
  public codigoSucursal: number;
  public username: string;
  public clienteID:string;

  constructor() {
    this.contrato = {};
    this.servicio = {};
    this.descuento = {};
    this.contratoProcesadora = {};
    this.codigoCliente = -1;
    this.codigoSucursal = -1;
    this.adicional= {};
    this.username="";
    this.clienteID="";

  }
}
