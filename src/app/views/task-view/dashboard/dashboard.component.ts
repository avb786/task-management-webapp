import { Component, OnInit } from '@angular/core';
import { TaskListService } from 'src/app/services/task-list.service';
import { UserManagementService } from 'src/app/services/user-management.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  lists: any;


  constructor(
    private _taskService :TaskListService,
    private _userService :UserManagementService
  ) { }

  ngOnInit() {
    // this.getAllList();
    this.userDetail();
    
  }

  userDetail() {
    this._userService.getUserDetail().subscribe(response => {
      console.log(response);
      this.lists = response[0].lists;
      
    }, error => {
      console.log(error);
    })
  }
}
