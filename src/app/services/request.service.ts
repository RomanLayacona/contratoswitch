import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }


  getHeadersTokenWithBasicAuth(): HttpHeaders {
    return new HttpHeaders({
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization': 'Basic cG9ydGFsLWVudGlkYWRlczowOTFmNTMyOTE5MzIzYWE4MGM3YjRmMTViNTRiOTE4MQ=='
    });
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    });
  }
  getHeadersWithBasicAuth(url?: any): HttpHeaders {
    return new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Authorization':'Basic ' + btoa(`${environment.usuarioCPI}:${environment.claveCPI}`),
      'address': url
    });
  }
  getHeadersBearer(token:any): HttpHeaders {
    return new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' +  token
    });
  }
  
  getToken(source: string) {    
    let body = new HttpParams()
    .set('grant_type', 'password')
    .set('username', `${environment.usuarioBackend}`)
    .set('password', `${environment.claveBackend}`);

    const url = `${environment.apiUrl}${ source }`;
    return this.http.post(url,body, { headers: this.getHeadersTokenWithBasicAuth(), observe: 'body' });
  }

  getRequestBack(source: string, token: any, retrieveHeaders = true) {
    const url = `${environment.apiUrl}${ source }`;
    
    if (retrieveHeaders) {
      return this.http.get(url, { headers: this.getHeadersBearer(token), observe: 'body'});
    }else {
      return this.http.get(url, { headers: this.getHeadersBearer(token)});
    }
  }

  postRequest(source: string, data: any, retrieveHeaders = true) {
    const url = `${environment.apimHost}${environment.routeRediseno}/${ source }`;

    if (retrieveHeaders) {
      return this.http.post(url, data, { headers: this.getHeaders(), observe: 'response'});
    } else {
      return this.http.post(url, data, { headers: this.getHeaders()});
    }
  }


  getRequest(source: string, data?: any, retrieveHeaders = true) {
    const url = `${environment.apimHost}${ source }`;

    if (retrieveHeaders) {
      return this.http.get(url, { headers: this.getHeadersWithBasicAuth(), observe: 'response', responseType : 'text'});
    } else {
      return this.http.get(url, { headers: this.getHeadersWithBasicAuth()});
    }
  }

  getRequest2(source: string, route?: string){
    const url = `${environment.apimHost}${environment.routeCPI}${ source }`;
    return this.http.get(url,  { headers: this.getHeadersWithBasicAuth(route), observe: 'response'});
  }

  getRequestC4C(source: string, retrieveHeaders: boolean) {
    const url = `${environment.apimHost}${ source }`;

    if(retrieveHeaders) {
      return this.http.get(url, { headers: this.getHeadersWithBasicAuth(), observe: 'response'});
    } else {
      return this.http.get(url, { headers: this.getHeadersWithBasicAuth()});
    }
  }


}
