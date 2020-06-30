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
  public role: any;
  public userDetail: any;
  public getAllListsLength: any;
  public lastElementAdminsList: any;
  public getAllTasksLength: any;
  public lastElementAdminsTasks: any;


  constructor(
    private _taskService :TaskListService,
    private _userService :UserManagementService,
    public authService: AuthenticationService

  ) { }

  ngOnInit() {
    this.getAllList();
    this.userDetail = JSON.parse(sessionStorage.getItem('user_details'));
    this.role = this.userDetail.user.role;
    console.log(this.role);
    this.getAllLists();
    this.getAllTasks();
    
    
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

  getAllLists() {
    this._taskService.getAllLists().subscribe(response => {
      this.getAllListsLength = response;
      let lastTime = response.length - 1;
      this.lastElementAdminsList = response[lastTime];   
      
       
    }, error => {

    })
  }

  getAllTasks() {
    this._taskService.getAllTasks().subscribe(response => {
      this.getAllTasksLength = response;
      let lastTime = response.length - 1;
      this.lastElementAdminsTasks = response[lastTime]; 
    }, error => {

    })
  }

  
}
