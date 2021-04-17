import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebService } from './web.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  public user_id = sessionStorage.getItem('user_id');

  constructor(
    public _http: HttpClient,
    private _webService: WebService,
  ) { }

  userLoginDetail(body) {
    let postUrl = this._webService.linkGeneration(environment.UserManagement.userSignin);
    return this._http.post(postUrl, body)
    .pipe(map(response => {
      return response;
    }));
  }

  getUserDetail() {
    let getUrl = this._webService.linkGeneration(environment.UserManagement.getUserDetail);
    getUrl = getUrl.replace(':userId', this.user_id);
    return this._http.get(getUrl, { headers : this._webService.setHeadersWithParams() })
    .pipe(map(response => {
      return response;
    }));
  }
  
  userLoginOut() {
    let getUrl = this._webService.linkGeneration(environment.UserManagement.userSignOut)
    return this._http.get(getUrl)
    .pipe(map(response => {
      return response;
    }));
  }

  userSignUp(body, formData) {
    const isFormData = true;
    let postUrl = this._webService.linkGeneration(environment.UserManagement.userSignUp);
    return this._http.post(postUrl, formData, { headers : this._webService.setHeadersWithParams(isFormData) } )
    .pipe(map(response => {
      return response;
    }));
  }

  updateUserDetails(body) {
    let putUrl = this._webService.linkGeneration(environment.UserManagement.updateUser);
    putUrl = putUrl.replace(':userId', this.user_id)
    return this._http.put(putUrl, body, { headers : this._webService.setHeadersWithParams() })
    .pipe(map(response => {
      return response;
    }));
  }
}
