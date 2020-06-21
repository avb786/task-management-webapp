import { Component, OnInit } from '@angular/core';
import { TaskListService } from 'src/app/services/task-list.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/constants/app_constants';
import { UserManagementService } from 'src/app/services/user-management.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [MessageService]
})
export class ListComponent implements OnInit {

  public lists: any;
  public tasks = Object;
  public display: boolean;
  public listName: any;
  public deleteId: any;
  public deleteTitle: any;
  public UpdateDisplay: boolean;
  public UpdatelistName: any;
  public UpdatelistId: any;

  constructor(
    private _taskService: TaskListService,
    private _router: Router,
    private messageService: MessageService,
    private _userService: UserManagementService
  ) { }

  ngOnInit() {
    // this.getAllList();
    this.userDetail();
  }

  userDetail() {
    this._userService.getUserDetail().subscribe(response => {
      this.lists = response[0].lists;
    }, error => {
      console.log(error);
    })
  }

  getTask(id, title?) {
    let LIST_ID;
    if (typeof (Storage) !== "undefined") {
      sessionStorage.setItem("listId", id);
      sessionStorage.setItem("list_name", title);
    } else {
      LIST_ID = "Sorry, your browser does not support Web Storage...";
      window.alert(LIST_ID)
    }
  }


  createList(form) {
    if(form.valid) {
    const body={};
    body[APP_CONSTANTS.TITLE] = this.listName;
    this._taskService.createList(body).subscribe(response => {
      if(response !== undefined) {
          this.display = false;
          this.userDetail();
          this.showCustomListMessage();
      }
    }, error => {
        console.log(error);
        
    });
  }
  }

  updateList(form) {
    if(form.valid) {
      const body = {}
      body[APP_CONSTANTS.TITLE] = this.UpdatelistName;
      this._taskService.UpdateList(body, this.UpdatelistId).subscribe(response => {
          this.userDetail();
          this.UpdateDisplay = false;
          this.showCustomUpdateListMessage();
          
      }, error => {
        console.log("Update", error);
      })
    }
  }

  deleteListById(id) {
    this._taskService.deleteList(id).subscribe(response => {
      this.userDetail();
    }, error => {
      console.log("Delete", error);
      
    })
  }

  showConfirm(title, id) {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure want '+title+' to delete?', detail:'Confirm to proceed'});
    this.deleteId = id;
    this.deleteTitle = title;
}

onConfirm(id?) {
  this.messageService.clear('c');
  this.deleteListById(this.deleteId);
  this.showCustomListMessageDeleted();
}

onReject() {
  this.messageService.clear('c');
}

showCustomListMessage() {
  this.messageService.add({key: 'custom', severity:'success', summary:'CREATE:' , detail: this.listName + ' is created.' });
}

showCustomListMessageDeleted() {
  this.messageService.add({key: 'custom_delete', severity:'error', detail: this.deleteTitle + ' is deleted.', summary:'DELETE:'});
}

showCustomUpdateListMessage() {
  this.messageService.add({key: 'custom_update', severity:'success', summary:'UPDATE:' , detail: this.UpdatelistName + ' is updated.' });
}

showDialog() {
    this.display = true;
}
showUpdateDialog(title, id) {
  this.UpdateDisplay = true;
  this.UpdatelistName = title;
  this.UpdatelistId = id;

}

}
