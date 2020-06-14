import { Component, OnInit } from '@angular/core';
import { TaskListService } from 'src/app/services/task-list.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';




@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [MessageService]
})
export class ListComponent implements OnInit {

  public lists: Object;
  public tasks = Object;
  public display: boolean;
  public listName: any;
  public deleteId: any;
  deleteTitle: any;

  constructor(
    private _taskService: TaskListService,
    private _router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getAllList()
  }

  getAllList() {
    this._taskService.getAllList().subscribe(response => {
      this.lists = response;
      console.log("response", response, typeof response)
    }, error => {
      console.log(error);

    })
  }

  getTask(id) {
    let LIST_ID;
    if (typeof (Storage) !== "undefined") {
      sessionStorage.setItem("listId", id);
    } else {
      LIST_ID = "Sorry, your browser does not support Web Storage...";
      window.alert(LIST_ID)
    }
  }


  createList(form){
    if(form.valid){
    const body={};
    body['title'] = this.listName;
    this._taskService.createList(body).subscribe(response => {
      if(response !== undefined) {
          this.display = false;
          this.getAllList();
          this.showCustomListMessage();
      }
    }, error => {
        console.log(error);
        
    });
  }
  }

  deleteListById(id) {
    console.log("deele",id);
    
    this._taskService.deleteList(id).subscribe(response => {
      this.getAllList();
      
    }, error => {

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
  this.messageService.add({key: 'custom', severity:'success', summary: this.listName + ' is created.'});
}

showCustomListMessageDeleted() {
  this.messageService.add({key: 'custom_delete', severity:'error', summary: this.deleteTitle + ' is deleted.'});
}

  showDialog() {
    this.display = true;
}

}
