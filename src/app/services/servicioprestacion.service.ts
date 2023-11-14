import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DatosCamEstServPrest } from '../models/cambio-estado-sp';
import { EliminarServPres } from '../models/eliminar-sp';
import { TipoContServ } from '../models/tipoContSer';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioprestacionService {

  constructor(
    private requestService : RequestService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      let codigoCliente = params['CodigoCliente'];
      let codigoSucursal = params['CodigoSucursal'];
    });
   }


  cambioEstadoServiciosPrestaciones(datosCambioEstado: DatosCamEstServPrest, callback?: any){
    const cb = callback || (() => {});
    return new Promise((resolve, reject) => {
      this.requestService.postRequest(`${environment.folderService}/rest/generalesprd/FSP719`, datosCambioEstado, false)
      .subscribe(data  => {
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    }); 
  }

  borrarServiciosPrestaciones(eliminarServPres: EliminarServPres, callback?: any){
    const cb = callback || (() => {});
    return new Promise((resolve, reject) => {
      this.requestService.postRequest(`${environment.folderService}/rest/generalesprd/FSP489`, eliminarServPres, false)
      .subscribe(data  => {
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    }); 
  }


  getServiciosByTipoContrato(tipoContSer: TipoContServ, callback?: any){
    const cb = callback || (() => {});
    return new Promise((resolve, reject) => {
      this.requestService.postRequest(`${environment.folderService}/rest/generalesprd/GIP015`, tipoContSer, false)
      .subscribe(data  => {
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    }); 
  }


  getServiciosPrestraciones(request: any, callback?: any){
    const cb = callback || (() => {});
    return new Promise((resolve, reject) => {
      this.requestService.postRequest(`${environment.folderService}/rest/generalesprd/GEP645`, request, false)
      .subscribe(data  => {
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    }); 
  }
}
