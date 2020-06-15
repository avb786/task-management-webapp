import { Component, OnInit } from '@angular/core';
import { TaskListService } from 'src/app/services/task-list.service';
import { APP_CONSTANTS } from "../../../../constants/app_constants";
import { MessageService } from 'primeng/api';
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
    private messageService: MessageService
  ) { }

  ngOnInit() {
    if (typeof (Storage) !== "undefined") {
      this.listId = sessionStorage.getItem("listId");
      this.listName = sessionStorage.getItem("list_name")
      this.geTaskById(this.listId)
      console.log("task id", this.listId);
      } 
  }

 
  geTaskById(id){
    this._taskService.getTaskByList(id).subscribe(response => {
      this.tasks = response;
      console.log(response);
      
    }, error => {
        console.log(error);
        
    })
  }

  createTask(form) {
    if(form.valid) {
      const body = {};
      body[APP_CONSTANTS.TITLE] = this.taskName;
      this._taskService.createTask(body, this.listId).subscribe(response => {
      this.geTaskById(this.listId);
      this.displayCreateTask = false;
      this.showCustomTaskMessage();
        
      }, error => {
        console.log("CREATE_TASK", error);
        
      })
    }
  }

  taskCheckedValue(taskId, taskCompleted, event) {
    const body = {};
    body[APP_CONSTANTS.TASK_COMPLETED] = event.target.checked;
    console.log("EVENT",event.target.checked);
    
    this._taskService.updateTask(body, this.listId, taskId).subscribe(response => {
      if (response !== undefined) {
        this.geTaskById(this.listId);
      }
      
    }, error => {
      console.log("CHECK-TASK", error);
    })

  }

  updateTask(form1){
    if (form1.valid) {
      const body = {};
      body[APP_CONSTANTS.TITLE] = this.UpdateTaskName;
      this._taskService.updateTask(body, this.listId, this.UpdateTaskId).subscribe(response => {
        if (response !== undefined) {
          this.UpdateDisplay = false;
          this.geTaskById(this.listId);
          this.showCustomUpdateListMessage();
        }
      }, error => {
        console.log("CHECK-UPDATE-TASK", error);
      })

    }
  }

  deleteTaskById(taskId) {
    this._taskService.deleteTask(this.listId, taskId).subscribe(response =>{
      console.log(response);
      this.geTaskById(this.listId);

    }, error =>{
        console.log("DELETE-TASK", error);
        
    })
  }

  showUpdateDialog(title, id) {
    this.UpdateDisplay = true;
    this.UpdateTaskName = title;
    this.UpdateTaskId = id;
  
  }

  showConfirm(title, id) {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure want '+title+' to delete?', detail:'Confirm to proceed'});
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
    this.messageService.add({key: 'custom', severity:'success', summary:'CREATE:' , detail: this.taskName + ' is created.' });
  }
  
  showCustomUpdateListMessage() {
    this.messageService.add({key: 'custom_update', severity:'success', summary:'UPDATE:' , detail: this.UpdateTaskName + ' is updated.' });
  }

  showCustomListMessageDeleted() {
    this.messageService.add({key: 'custom_delete', severity:'error', detail: this.deleteTaskTitle + ' is deleted.', summary:'DELETE:'});
  }
}
