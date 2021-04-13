import { Component, OnInit } from '@angular/core';
import { TaskListService } from 'src/app/services/task-list.service';
import { Router } from '@angular/router';
import { UserManagementService } from 'src/app/services/user-management.service';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
  providers: [MessageService]
})
export class TaskViewComponent implements OnInit {

  public lists: any;
  public listLength: any;
  public logOutMsg: any;
  public user: any;
  public signinButt: any = true;
  public loginButt: any = true;
  public userLastName: any;
  public userFirstName: any;
  image: string;

  constructor(
    private _taskService: TaskListService,
    private _userService: UserManagementService,
    private _router: Router,
    private messageService: MessageService,
    public authService: AuthenticationService
  ) { }

  async ngOnInit() {
    this.user = await JSON.parse(sessionStorage.getItem('user_details'));
    this.getUserDetails();  
  }
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("menubtn").style.display = "none";
  }
  closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
    document.getElementById("menubtn").style.display = "block";

  }
  
  goToUser() {
    this._router.navigate(['/taskView/userDetails'])
  }

  getUserDetails() {
    this._userService.getUserDetail().subscribe(response => {
      this.userFirstName = response[0].name;
      this.userLastName = response[0].lastname;
      this.image= response[0].profile_image ? `https://task-webapp.herokuapp.com/public/img/user/${response[0].profile_image}` : 'https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg';
    }, error => {
      
    });
  }

  goToLogin() {
    this.authService.enableLoader = true;
    this._userService.userLoginOut().subscribe(response => {
      sessionStorage.clear();
      this._router.navigate(['/login']);
      this.authService.enableLoader = false;

    }, error => {
      this.authService.enableLoader = false;
      console.log("LOGOUT", error);

    })
  }

  changeTheme() {
    const d = document.getElementsByTagName('body')[0].classList.toggle("dark-mode");;
    
  }

  
}
