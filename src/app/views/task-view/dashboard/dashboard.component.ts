import { Component, OnInit } from '@angular/core';
import { TaskListService } from 'src/app/services/task-list.service';
import { UserManagementService } from 'src/app/services/user-management.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
    private _userService :UserManagementService,
    public authService: AuthenticationService

  ) { }

  ngOnInit() {
    this.getAllList();
    
  }
  getAllList() {
    this.authService.enableLoader = true;
    this._taskService.getAllList().subscribe(response => {
    this.lists = response[0].total_lists;
    const lastTime = response[0].total_lists.length - 1;
    this.lastElement = response[0].total_lists[lastTime];   
    this.authService.enableLoader = false;
      
    }, error => {
      window.location.reload();
    this.authService.enableLoader = false;      
    })
  }

  
}
