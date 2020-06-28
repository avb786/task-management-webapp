import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WebService {
  readonly ROOT_URL;
  readonly HERUKO_URL;

  constructor(private _http: HttpClient) { 
    this.ROOT_URL = 'http://localhost:3000/api/taskmgmt';
    this.HERUKO_URL = '/api/taskmgmt';
  }

  public linkGeneration(param){
    // return `${this.ROOT_URL}${param}`;
    return `${this.HERUKO_URL}${param}`;
  }
  

  public setHeadersWithParams() {
    let headers = new HttpHeaders();
    const authToken = JSON.parse(sessionStorage.getItem('user_details'));
    headers = headers.set('content-type', 'application/json')
    headers = headers.set('Authorization', 'Bearer ' + authToken.token);
    console.log('HEADERS', headers);
    return headers;
  }
}
