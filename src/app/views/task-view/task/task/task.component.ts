import { Component, OnInit } from '@angular/core';
import { TaskListService } from 'src/app/services/task-list.service';
import { APP_CONSTANTS } from "../../../../constants/app_constants";
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  providers: [MessageService]
})
export class TaskComponent implements OnInit {
  listId: any;
  tasks: any;
  headers = ["ID", "Tasks", "Status","Checked","Edit","Delete"];
  displayCreateTask: boolean;
  taskName: any;
  checked = false;
  UpdateDisplay: boolean;
  UpdateTaskName: any;
  UpdateTaskId: any;
  deleteTaskId: any;
  deleteTaskTitle: any;
  listName: any;

  constructor(
    private _taskService: TaskListService,
    private messageService: MessageService,
    public authService: AuthenticationService

  ) { }

  ngOnInit() {
    if (typeof (Storage) !== "undefined") {
      this.listId = sessionStorage.getItem("listId");
      this.listName = sessionStorage.getItem("list_name")
      this.geTaskById(this.listId);
      } 
  }

 
  geTaskById(id) {
    this.authService.enableLoader = true;
    this._taskService.getTaskByList(id).subscribe(response => {
      this.tasks = response;
      this.authService.enableLoader = false;  
    }, error => {
      this.authService.enableLoader = false;
        
    })
  }

  createTask(form) {
    this.authService.enableLoader = true;
    if(form.valid) {
      const body = {};
      body[APP_CONSTANTS.TITLE] = this.taskName;
      this._taskService.createTask(body, this.listId).subscribe(response => {
      this.geTaskById(this.listId);
      this.displayCreateTask = false;
      this.authService.enableLoader = false;
      this.showCustomTaskMessage();
        
      }, error => {
        this.authService.enableLoader = false;        
      })
    }
  }

  taskCheckedValue(taskId, taskCompleted, event) {
    const body = {};
    body[APP_CONSTANTS.TASK_COMPLETED] = event.target.checked;    
    this._taskService.updateTask(body, this.listId, taskId).subscribe(response => {
      if (response !== undefined) {
        this.geTaskById(this.listId);
      }      
    }, error => {
      console.log("CHECK-TASK", error);
    });

  }

  updateTask(form1){
    this.authService.enableLoader = true;
    if (form1.valid) {
      const body = {};
      body[APP_CONSTANTS.TITLE] = this.UpdateTaskName;
      this._taskService.updateTask(body, this.listId, this.UpdateTaskId).subscribe(response => {
        if (response !== undefined) {
          this.UpdateDisplay = false;
          this.geTaskById(this.listId);
          this.authService.enableLoader = false;
          this.showCustomUpdateListMessage();
        }
      }, error => {
        this.authService.enableLoader = false;
      });

    }
  }

  deleteTaskById(taskId) {
    this.authService.enableLoader = true;
    this._taskService.deleteTask(this.listId, taskId).subscribe(response => {
      this.geTaskById(this.listId);
      this.authService.enableLoader = false;

    }, error => {
      this.authService.enableLoader = false;       
    });
  }

  showUpdateDialog(title, id) {
    this.UpdateDisplay = true;
    this.UpdateTaskName = title;
    this.UpdateTaskId = id;  
  }

  showConfirm(title, id) {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure want ' + title + ' to delete?', detail: 'Confirm to proceed'});
    this.deleteTaskId = id;
    this.deleteTaskTitle = title;
}
onConfirm(id?) {
  this.messageService.clear('c');
  this.deleteTaskById(this.deleteTaskId);
  this.showCustomListMessageDeleted();
}

onReject() {
  this.messageService.clear('c');
}

  showCreateDialog(){
    this.displayCreateTask = true;
  }

  showCustomTaskMessage() {
    this.messageService.add({key: 'custom', severity: 'success', summary: 'CREATE:' , detail: this.taskName + ' is created.' });
  }
   
  showCustomUpdateListMessage() {
    this.messageService.add({key: 'custom_update', severity: 'success', summary: 'UPDATE:' , detail: this.UpdateTaskName + ' is updated.' });
  }

  showCustomListMessageDeleted() {
    this.messageService.add({key: 'custom_delete', severity: 'error', detail: this.deleteTaskTitle + ' is deleted.', summary: 'DELETE:'});
  }
}
