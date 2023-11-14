import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class ActivacionesService {

  constructor(
    private requestService : RequestService,
    private http: HttpClient
  ) {}

  getActivaciones(reqActivacion: any, callback?: any){
    const cb = callback || (() => {});
    return new Promise((resolve, reject) => {
      this.requestService.postRequest(`${environment.folderService}/rest/generalesprd/GIP014`, reqActivacion, false)
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
