import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators"; 



@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  constructor(
    private _webService: WebService,
    private _http: HttpClient
    ) { }

    getAllList(){
      let getUrl = this._webService.linkGeneration(environment.taskServiceManagement.getAllList);
      return this._http.get(getUrl)
      .pipe(map(response => {
        return response;
      }));
      
    }

    getTaskByList(listId){
      let getUrl = this._webService.linkGeneration(environment.taskServiceManagement.getAllTaskByListId);
      getUrl = getUrl.replace(':listId', listId);
      return this._http.get(getUrl)
      .pipe(map(response => {
        return response;
      }));
      
    }

    createList(body){
      let postUrl = this._webService.linkGeneration(environment.taskServiceManagement.createList);
      return this._http.post(postUrl, body)
      .pipe(map(response => {
        return response;
      }));
      
    }

    deleteList(id) {
      let deleteUrl = this._webService.linkGeneration(environment.taskServiceManagement.deleteList);
      deleteUrl = deleteUrl.replace(':listId', id);
      console.log(deleteUrl);
      
      return this._http.delete(deleteUrl)
      .pipe(map(response => {
        return response;
      }));
    }

}
