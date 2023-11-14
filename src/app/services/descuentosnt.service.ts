import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class DescuentosntService {

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


  getDescuentosNoTransaccionales(datosDes: any, callback?: any){
    const cb = callback || (() => {});
    return new Promise((resolve, reject) => {
      this.requestService.postRequest(`${environment.folderService}/rest/generalesprd/FSP423`, datosDes, false)
      .subscribe(data  => {
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    }); 
  }

  createDescuentosNoTransaccionales(datosDes: any, callback?: any){
    const cb = callback || (() => {});
    return new Promise((resolve, reject) => {
      this.requestService.postRequest(`${environment.folderService}/rest/generalesprd/FSP423`, datosDes, false)
      .subscribe(data  => {
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    }); 
  }

  actualizarDescuentosNoTransaccionales(datosDes: any, callback?: any){
    const cb = callback || (() => {});
    return new Promise((resolve, reject) => {
      this.requestService.postRequest(`${environment.folderService}/rest/generalesprd/FSP423`, datosDes, false)
      .subscribe(data  => {
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    }); 
  }

  eliminarDescuentosNoTransaccionales(datosDes: any, callback?: any){
    const cb = callback || (() => {});
    return new Promise((resolve, reject) => {
      this.requestService.postRequest(`${environment.folderService}/rest/generalesprd/FSP423`, datosDes, false)
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
