import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../services/user-management.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from '../constants/app_constants';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  public userLoginId;
  public userLoginpass;
  public userDetail: any;
  public userId: any;
  public logOutMsg: any;

  constructor(
    private _userdetail: UserManagementService,
    private _router: Router,
    private messageService: MessageService,
    public authService: AuthenticationService

  ) { }

  ngOnInit() {
  }

  UserLoginDetails() {
    const body = {};
    body[APP_CONSTANTS.EMAIL] = this.userLoginId;
    body[APP_CONSTANTS.PASSWORD] = this.userLoginpass;
    this.authService.enableLoader = true;
    this._userdetail.userLoginDetail(body).subscribe(response => {
      this.userDetail = JSON.stringify(response);
      this.userId = response;
      sessionStorage.setItem("user_details", this.userDetail);
      sessionStorage.setItem("user_id", this.userId.user.user_id);
      setTimeout(() => { 
        this._router.navigate(['/taskView']);
        this.authService.enableLoader = false;
      }, 2000);
      
    }, error => {
      if (error.error.error_loactaion === 'body') {
        this.showCustomListMessageDeleted(error.error.error_msg);
      }
      else {
        this.showCustomListMessageDeleted(error.error.error);
      }
      this.authService.enableLoader = false;
    });
  }

  userSignOut() {
    this._userdetail.userLoginOut().subscribe(response => {
      console.log(response);
      
      sessionStorage.clear();
    }, error => {
      console.log(error);

    });
  }

  showCustomListMessageDeleted(error) {
    this.messageService.add({ key: 'custom_delete', severity: 'error', detail: error, summary: 'ERROR' });
  }

  loginWithGoogle() {
    this._userdetail.userGoogleLogin().subscribe(response => {
      this.userDetail = JSON.stringify(response);
      this.userId = response;
      sessionStorage.setItem("user_details", this.userDetail);
      sessionStorage.setItem("user_id", this.userId.user.user_id);
      setTimeout(() => { 
        this._router.navigate(['/taskView']);
        this.authService.enableLoader = false;
      }, 2000);
    }, error => {
      if (error.error.error_loactaion === 'body') {
        this.showCustomListMessageDeleted(error.error.error_msg);
      }
      else {
        this.showCustomListMessageDeleted(error.error.error);
      }
      this.authService.enableLoader = false;
    })
  }
  
  gotoRegister() {
    this._router.navigate(['./register']);
  }
  goToForgetPassword() {
    this._router.navigate(['./forgot-password']);
  }

}
