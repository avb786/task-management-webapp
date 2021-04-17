import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WebService {
  readonly ROOT_URL;
  readonly HERUKO_URL;

  constructor(private _http: HttpClient, public _route: Router) {
    this.ROOT_URL = 'http://localhost:3000/api/taskmgmt';
    this.HERUKO_URL = 'https://task-webapp.herokuapp.com/api/taskmgmt';
  }

  public linkGeneration(param) {
    // return `${this.ROOT_URL}${param}`;
    return `${this.HERUKO_URL}${param}`;
  }
  public setHeadersWithParams(isFormData?) {
    let headers = new HttpHeaders();
    const authToken = JSON.parse(sessionStorage.getItem('user_details'));
    if (authToken && authToken !== null) {
      headers = headers.set('content-type', 'application/json');
    if(isFormData)  headers = headers.set('Content-type', 'application/x-www-form-urlencoded');
      headers = headers.set('Authorization', 'Bearer ' + authToken.token);
      return headers;
    } else {
      this._route.navigate(['./task-port']);
    }
  }
}
