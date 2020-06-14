import { Component, OnInit } from '@angular/core';
import { TaskListService } from 'src/app/services/task-list.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  taskId: any;
  tasks: any;
  headers = ["ID", "Tasks", "Status"];

  constructor(
    private _taskService: TaskListService
  ) { }

  ngOnInit() {
    if (typeof (Storage) !== "undefined") {
      this.taskId = sessionStorage.getItem("listId");
      this.geTaskById(this.taskId)
      console.log("task id", this.taskId);
      } 
  }

 
  geTaskById(id){
    this._taskService.getTaskByList(id).subscribe(response => {
      this.tasks = response;
    }, error => {
        console.log(error);
        
    })

  }

}
