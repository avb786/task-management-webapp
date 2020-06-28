import { Component, OnInit } from '@angular/core';
import { TaskListService } from 'src/app/services/task-list.service';
import { UserManagementService } from 'src/app/services/user-management.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public lists: any;
  public lastElement: any;


  constructor(
    private _taskService :TaskListService,
    private _userService :UserManagementService
  ) { }

  ngOnInit() {
    this.getAllList();
    
  }
  getAllList() {
    this._taskService.getAllList().subscribe(response => {
      console.log("LISTSTSTS", response[0].total_lists);
      this.lists = response[0].total_lists;
     const lastTime = response[0].total_lists.length - 1;
     this.lastElement = response[0].total_lists[lastTime];
     console.log("PEDEDE", this.lastElement);
     
      
    }, error => {
      window.location.reload();
      console.log("ERROR IN ALL LIST", error);
      
    })
  }

  
}
