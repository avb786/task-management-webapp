import { Component, OnInit, Output } from '@angular/core';
import { UserManagementService } from 'src/app/services/user-management.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { APP_CONSTANTS } from 'src/app/constants/app_constants';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  public userFirstName: any;
  public userLastName: any;
  public userEmailName: any;
  public contactError: any;
  public contactNumber: any;
  public countryChange: any;
  public contactNumberInput: any;
  public showpassword: any;
  public contactValueError: any = true;
  public phoneReq: any;
  public countryCode: any;
  public genderValue: any = 'male';
  public image: any;



  constructor(
    private _userService: UserManagementService,
    private _authService: AuthenticationService,
    public _router: Router
  ) { }

  ngOnInit() {
    this.getUserDetails();
  }

  filterContact() {
    let number = phoneUtil.parseAndKeepRawInput(this.phoneReq);
    this.countryCode = number.getCountryCode();
    this.phoneReq = number.getNationalNumber();  

  }

  getUserDetails() {
    this._authService.enableLoader = true;
    this._userService.getUserDetail().subscribe(response => {
      this.image= response[0].profile_image ? `https://task-webapp.herokuapp.com/public/img/user/${response[0].profile_image}` : 'https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg';
      // this.image=`http://localhost:3000/public/img/user/${response[0].profile_image}`
      this.userFirstName = response[0].name;
      this.userLastName = response[0].lastname;
      this.userEmailName = response[0].email;
      this.phoneReq = response[0].contact;
      this.genderValue = response[0].gender;
      this.filterContact();
      this._authService.enableLoader = false;
    }, error => {
      this._authService.enableLoader = false;
      throw error;
    });
  }
  

  hasError($event) {
    this.contactError = $event;
  }
  getNumber($event) {
    this.contactNumber = $event;
  }
  onCountryChange($event) {
    this.countryChange =$event;    
  }
  telInputObject($event) {
    this.contactNumberInput = $event; 
  }
  hidePass(){
    this.showpassword = false;
  }
  showPass() {
    this.showpassword = true;
  }
isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}
contactBoxError() {
  let contact_no = true;
  if(!this.contactError) {
    contact_no = this.contactError;
    return contact_no;
  }
  return contact_no;
}

updateUserDetails(form) {
  this.contactValueError = this.contactBoxError();
  if (form.valid && this.contactValueError) {
    const bodyJson = [];
    const body = {}
    body[APP_CONSTANTS.FIRST_NAME] = this.userFirstName;
    body[APP_CONSTANTS.LAST_NAME] = this.userLastName;
    body[APP_CONSTANTS.EMAIL] = this.userEmailName;
    body[APP_CONSTANTS.CONTACT] = this.contactNumber;
    body[APP_CONSTANTS.GENDER] = this.genderValue;
    bodyJson.push(body);

    this._userService.updateUserDetails(bodyJson).subscribe(response => {
        window.location.reload(); 
    }, error => {

    })
  }
}

}
