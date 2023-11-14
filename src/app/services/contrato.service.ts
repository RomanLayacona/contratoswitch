import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ContratoFindExt, DatosContSerPre } from '../models/contrato-find';
import { ContratoSwitch } from '../models/contrato-switch';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

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

  getContrato(contratoExt: ContratoFindExt,  callback?: any) {
    const cb = callback || (() => {});

    return new Promise((resolve, reject) => {
      this.requestService.postRequest(`${environment.folderService}/rest/generalesprd/GIP011`, contratoExt, false)
      .subscribe(data  => {
        // console.log(data);
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    });
  }

  LoginBack( callback?: any) {
    const cb = callback || (() => {});

    return new Promise((resolve, reject) => {
      this.requestService.getToken(`api/oauth2/access_token`)
      .subscribe(data  => {
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    });
  }


  getTokenBack(tokenMashup:any,token: any,  callback?: any) {
    const cb = callback || (() => {});

    return new Promise((resolve, reject) => {
      this.requestService.getRequestBack(`api/tokenMashup/${tokenMashup}`,token)
      .subscribe(data  => {
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    });
  }

  createContrato(contratoExt: any,  callback?: any) {
    const cb = callback || (() => {});

    return new Promise((resolve, reject) => {
      this.requestService.postRequest(`${environment.folderService}/rest/generalesprd/GIP011`, contratoExt, false)
      .subscribe(data  => {
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    });
  }
  actualizarEstado(contrato: ContratoFindExt, callback?: any) {
    const cb = callback || (() => {});
    return new Promise((resolve, reject) => {
      this.requestService.postRequest(`${environment.folderService}/rest/generalesprd/GIP011`, contrato, false)
      .subscribe(data  => {
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    });
  }

  getServiciosPrestaciones(contrato: DatosContSerPre, callback?: any){
    const cb = callback || (() => {});
    return new Promise((resolve, reject) => {
      this.requestService.postRequest(`${environment.folderService}/rest/generalesprd/FSP686`, contrato, false)
      .subscribe(data  => {
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    }); 
  }

  putServiciosPrestaciones(contrato: DatosContSerPre, callback?: any){
    const cb = callback || (() => {});
    return new Promise((resolve, reject) => {
      this.requestService.postRequest(`${environment.folderService}/rest/generalesprd/FSP686`, contrato, false)
      .subscribe(data  => {
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    }); 
  }

  postServiciosPrestaciones(contrato: DatosContSerPre, callback?: any){
    const cb = callback || (() => {});
    return new Promise((resolve, reject) => {
      this.requestService.postRequest(`${environment.folderService}/rest/generalesprd/FSP686`, contrato, false)
      .subscribe(data  => {
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    }); 
  }

  ingresarServicio(ingServicio: any, callback?: any){
    const cb = callback || (() => {});
    return new Promise((resolve, reject) => {
      this.requestService.postRequest(`${environment.folderService}/rest/generalesprd/FSP722`, ingServicio, false)
      .subscribe(data  => {
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    }); 
  }

  getTiposContratos(reqTipoContratos: any, callback?: any){
    const cb = callback || (() => {});
    return new Promise((resolve, reject) => {
      this.requestService.postRequest(`${environment.folderService}/rest/generalesprd/GIP013`, reqTipoContratos, false)
      .subscribe(data  => {
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    }); 
  }

  contratoProcesadora(reqContratoProcesadora: any, callback?: any){
    const cb = callback || (() => {});
    return new Promise((resolve, reject) => {
      this.requestService.postRequest(`${environment.folderService}/rest/procesadoraprd/PIP002`, reqContratoProcesadora, false)
      .subscribe(data  => {
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    }); 
  }

  planesMarcas(req: any, callback?: any){
    const cb = callback || (() => {});
    return new Promise((resolve, reject) => {
      this.requestService.postRequest(`${environment.folderService}/rest/procesadoraprd/PIP001`, req, false)
      .subscribe(data  => {
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    }); 
  }
 

  cuentasBancariasContrato(req: any, callback?: any){
    const cb = callback || (() => {});
    return new Promise((resolve, reject) => {
      this.requestService.postRequest(`${environment.folderService}/rest/generalesprd/GIP007`, req, false)
      .subscribe(data  => {
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    }); 
  }

  liquidaCheque(req: any, callback?: any){
    const cb = callback || (() => {});
    return new Promise((resolve, reject) => {
      this.requestService.postRequest(`${environment.folderService}/rest/procesadoraprd/PIP003`, req, false)
      .subscribe(data  => {
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    }); 
  }

  parametrosComision(req: any, callback?: any){
    const cb = callback || (() => {});
    return new Promise((resolve, reject) => {
      this.requestService.postRequest(`${environment.folderService}/rest/procesadoraprd/GRP256`, req, false)
      .subscribe(data  => {
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    }); 
  }

  entidadesIntercambio(req: any, callback?: any){
    const cb = callback || (() => {});
    return new Promise((resolve, reject) => {
      this.requestService.postRequest(`${environment.folderService}/rest/generalesprd/GIP022`, req, false)
      .subscribe(data  => {
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    }); 
  }

  clientes(req: any, callback?: any){
    const cb = callback || (() => {});
    return new Promise((resolve, reject) => {
      this.requestService.postRequest(`${environment.folderService}/rest/generalesprd/GIP030`, req, false)
      .subscribe(data  => {
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    }); 
  }

  sucursales(req: any, callback?: any){
    const cb = callback || (() => {});
    return new Promise((resolve, reject) => {
      this.requestService.postRequest(`${environment.folderService}/rest/generalesprd/GIP008`, req, false)
      .subscribe(data  => {
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    }); 
  }

  tarifarios(req: any, callback?: any){
    const cb = callback || (() => {});
    return new Promise((resolve, reject) => {
      this.requestService.postRequest(`${environment.folderService}/rest/generalesprd/GIP032`, req, false)
      .subscribe(data  => {
        resolve(data);
      },
      error  => {
        reject(error);
        return cb(error);
      });
    }); 
  }
    getClienteID(id: any ,callback?: any){
    var url = `sap/c4c/odata/v1/c4codataapi/CorporateAccountCollection?$filter=ExternalID%20eq%20'${id}'&$format=json`;
    const cb = callback || (() => {});
    return new Promise((resolve, reject) => {
      this.requestService.getRequest2('/http/c4croot', url)
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
