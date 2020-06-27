import { Component, OnInit } from '@angular/core';
import { TaskListService } from 'src/app/services/task-list.service';
import { Router } from '@angular/router';
import { UserManagementService } from 'src/app/services/user-management.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
  providers: [MessageService]
})
export class TaskViewComponent implements OnInit {

  lists: any;
  public listLength: any;
  public logOutMsg: any;
  public user: string;
  public signinButt: any = true;
  public loginButt: any = true;

  constructor(
    private _taskService: TaskListService,
    private _userService: UserManagementService,
    private _router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.user = sessionStorage.getItem('user_details');
    if(this.user) {
      this.signinButt = false;
      this.loginButt = false;
    }
  }
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("menubtn").style.display = "none";
  }
  closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
    document.getElementById("menubtn").style.display = "block";

  }

  goToLogin() {
    this._userService.userLoginOut().subscribe(response => {
      sessionStorage.clear();
      this._router.navigate(['/login']);
    }, error => {
      console.log("LOGOUT", error);

    })
  }

  
}
