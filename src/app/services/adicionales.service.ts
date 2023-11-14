import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class AdicionalesService {

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



   getAdicionales(reqAdicional: any, callback?: any){
    const cb = callback || (() => {});
    return new Promise((resolve, reject) => {
      this.requestService.postRequest(`${environment.folderService}/rest/generalesprd/FSP749`, reqAdicional, false)
      .subscribe(data  => {
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    }); 
  }



  createAdicional(reqAdicional: any, callback?: any){
    const cb = callback || (() => {});
    return new Promise((resolve, reject) => {
      this.requestService.postRequest(`${environment.folderService}/rest/generalesprd/FSP749`, reqAdicional, false)
      .subscribe(data  => {
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    }); 
  }



actualizarAdicional(datosDes: any, callback?: any){
  const cb = callback || (() => {});
  return new Promise((resolve, reject) => {
    this.requestService.postRequest(`${environment.folderService}/rest/generalesprd/FSP749`, datosDes, false)
    .subscribe(data  => {
      resolve(data);
    },
    error  => {
      reject(error);
      return cb(error);
    });
  }); 
}




eliminarAdicional(datosDes: any, callback?: any){
  const cb = callback || (() => {});
  return new Promise((resolve, reject) => {
    this.requestService.postRequest(`${environment.folderService}/rest/generalesprd/FSP749`, datosDes, false)
    .subscribe(data  => {
      resolve(data);
    },
    error  => {
      reject(error);
      return cb(error);
    });
  }); 
}


  getOrdenes(reqAdicional: any, callback?: any) {
    const cb = callback || (() => {});
    return new Promise((resolve, reject) => {
      this.requestService.postRequest(`${environment.folderService}/rest/switchprd/INP139`, reqAdicional, false)
      .subscribe(data  => {
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    }); 
  }

  crearOrden(reqAdicional: any, callback?: any) {
    const cb = callback || (() => {});
    return new Promise((resolve, reject) => {
      this.requestService.postRequest(`${environment.folderService}/rest/generalesprd/FSP839`, reqAdicional, false)
      .subscribe(data  => {
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    }); 
  }

  getOC(id:any,callback?: any){
    const cb = callback || (() => {});
    var route = `sap/c4c/odata/v1/c4codataapi/OpportunityCollection?ProspectPartyID=${id}&$format=json`;
    return new Promise((resolve, reject) => {
      this.requestService.getRequest2('/http/c4croot', route)
      .subscribe(data  => {
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    }); 
  }
  getOCitems(id: any ,callback?: any){
    const cb = callback || (() => {});
    var route = `sap/c4c/odata/v1/c4codataapi/OpportunityCollection('${id}')/OpportunityItem?$format=json`;
    return new Promise((resolve, reject) => {
      this.requestService.getRequest2('/http/c4croot', route)
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