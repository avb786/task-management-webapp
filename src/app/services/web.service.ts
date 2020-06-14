import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WebService {
  readonly ROOT_URL;

  constructor(private _http: HttpClient) { 
    this.ROOT_URL = 'http://localhost:3000/api/taskmgmt';
  }

  public linkGeneration(param){
    return `${this.ROOT_URL}/${param}`
  }
}
