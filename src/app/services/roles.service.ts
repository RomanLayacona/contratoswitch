import { Injectable } from '@angular/core';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private requestService: RequestService) { }

  getRoles(callback?: any){
    const cb = callback || (() => {});
    var route = 'sap/c4c/odata/cust/v1/privilegios_rol_tabla1/BO_PrivilegiosRolTabla1RootCollection';
    return new Promise((resolve, reject) => {
      this.requestService.getRequest2('/http/c4croot', route)
      .subscribe(data  => {
        resolve(data);
      }, error  => {
        reject(error);
        return cb(error);
      });
    }); 
  }
  getRolesUsuario(user:string, callback?: any){
    const cb = callback || (() => {});
    var route = `sap/c4c/odata/v1/c4codataapi/BusinessUserBusinessRoleAssignmentCollection?$filter=UserID eq '${user}'&$format=json`;
    return new Promise((resolve, reject) => {
      this.requestService.getRequest2('/http/c4croot', route)
      .subscribe(data  => {
        resolve(data);
      }, error  => {
        reject(error);
        return cb(error);
      });
    }); 
  }
  getRolesCrontrolCampo(rol:any ,callback?: any){
    const cb = callback || (() => {});
    var route = `sap/c4c/odata/cust/v1/privilegios_rol_tabla2/BO_PrivilegiosRolTabla2RootCollection?$filter=zRol eq '${ rol }'`
    return new Promise((resolve, reject) => {
      this.requestService.getRequest2('/http/c4croot', route)
      .subscribe(data  => {
        resolve(data);
      }, error  => {
        reject(error);
        return cb(error);
      });
    }); 
  }
}

