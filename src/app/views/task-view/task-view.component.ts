import { Component, OnInit } from '@angular/core';
import { TaskListService } from 'src/app/services/task-list.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: any;

  constructor(
    private _taskService: TaskListService
  ) { }

  ngOnInit() {
    this.getAllList();
  
    }
  
   
    getAllList(){
      
      this._taskService.getAllList().subscribe(response => {
        this.lists = response;
        console.log("response", response, typeof response)
      }, error =>{
        console.log(error);
        
      })
      
    }
  
  
}
