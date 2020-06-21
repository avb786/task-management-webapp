import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../services/user-management.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userLoginId;
  public userLoginpass;
  public userDetail: any;
  public userId: any;

  constructor(
    private _userdetail :UserManagementService,
    private _router: Router
  ) { }

  ngOnInit() {


  }

  UserLoginDetails() {
    const body = {};
    body['email'] = this.userLoginId;
    body['password'] = this.userLoginpass;
    this._userdetail.userLoginDetail(body).subscribe(response => {
      this.userDetail = JSON.stringify(response);
      this.userId = JSON.stringify(response.user.user_id);      
      sessionStorage.setItem("user_details", this.userDetail);
      sessionStorage.setItem("user_id", this.userId);
      this._router.navigate(['/taskView']);
    }, error => {
      console.log(error);
    });
  }

  userSignOut() {
    this._userdetail.userLoginOut().subscribe(response => {
      
    }, error => {
      console.log(error);
      
    });
  }

}
