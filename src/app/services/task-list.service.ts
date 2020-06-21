import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  public user_id = sessionStorage.getItem('user_id');

  constructor(
    private _webService: WebService,
    private _http: HttpClient
    ) { }
  
    getAllList() {
      let getUrl = this._webService.linkGeneration(environment.taskServiceManagement.getAllList);
      getUrl = getUrl.replace(':userId', this.user_id );      
      return this._http.get(getUrl, { 'headers': this._webService.setHeadersWithParams()})
      .pipe(map(response => {
        return response;
      }));
      
    }
    getTaskByList(listId) {
      let getUrl = this._webService.linkGeneration(environment.taskServiceManagement.getAllTaskByListId);
      getUrl = getUrl.replace(':listId', listId);
      getUrl = getUrl.replace(':userId', this.user_id);
      return this._http.get(getUrl, { headers : this._webService.setHeadersWithParams() } )
      .pipe(map(response => {
        return response;
      }));
      
    }

    createList(body) {
      let postUrl = this._webService.linkGeneration(environment.taskServiceManagement.createList);
      postUrl = postUrl.replace(':userId', this.user_id);
      return this._http.post(postUrl, body, { headers : this._webService.setHeadersWithParams() })
      .pipe(map(response => {
        return response;
      }));
      
    }

    deleteList(id) {
      let deleteUrl = this._webService.linkGeneration(environment.taskServiceManagement.deleteList);
      deleteUrl = deleteUrl.replace(':listId', id);
      deleteUrl = deleteUrl.replace(':userId', this.user_id);
      console.log(deleteUrl);
      
      return this._http.delete(deleteUrl, { headers : this._webService.setHeadersWithParams() })
      .pipe(map(response => {
        return response;
      }));
    }

    UpdateList(body, id) {
      let updateUrl = this._webService.linkGeneration(environment.taskServiceManagement.deleteList);
      updateUrl = updateUrl.replace(':listId', id);
      updateUrl = updateUrl.replace(':userId', this.user_id);          
      return this._http.put(updateUrl, body, { headers : this._webService.setHeadersWithParams() })
      .pipe(map(response => {
        return response;
      }));
    }

    createTask(body, id) {
      let postUrl = this._webService.linkGeneration(environment.taskServiceManagement.createTask);
      postUrl = postUrl.replace(':listId', id);
      return this._http.post(postUrl, body)
      .pipe(map(response => {
        return response;
      }));
      
    }

    updateTask(body, listId, taskId) {
      let postUrl = this._webService.linkGeneration(environment.taskServiceManagement.updateTask);
      postUrl = postUrl.replace(':listId', listId);
      postUrl = postUrl.replace(':taskId', taskId);
      return this._http.put(postUrl, body)
      .pipe(map(response => {
        return response;
      }));
      
    }
    

    deleteTask(listId, taskId) {
      let deleteUrl = this._webService.linkGeneration(environment.taskServiceManagement.deleteATask);
      deleteUrl = deleteUrl.replace(':listId', listId);
      deleteUrl = deleteUrl.replace(':taskId', taskId);
      console.log(deleteUrl);
      
      return this._http.delete(deleteUrl)
      .pipe(map(response => {
        return response;
      }));
    }


}
