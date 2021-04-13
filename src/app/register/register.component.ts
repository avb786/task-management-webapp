import { Component, OnInit } from '@angular/core';
import { APP_CONSTANTS } from '../constants/app_constants';
import { UserManagementService } from '../services/user-management.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]

})
export class RegisterComponent implements OnInit {
  public contactError: any;
  public contactNumber: any;
  public countryChange: any;
  public contactNumberInput: any;
  public passwordDetails: any;
  public genderValue: any = 'male';
  public minDate: Date;
  public maxDate: Date;
  public showpassword: any;
  public userFirstName: any;
  public userLastName: any;
  public userEmailName: any;
  public userPassword: any;
  public birthDate: any;
  public termAndCondidtion: any;
  public contactValueError: any = true;
  public userImage:any;
  public selectedImage: File;
  constructor(
    private _userMgmtService: UserManagementService,
    private _router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
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
addDateEvent(event: MatDatepickerInputEvent<Date>) {
  this.birthDate = event.value.toDateString();
}
contactBoxError() {
  let contact_no = true;
  if(!this.contactError) {
    contact_no = this.contactError;
    return contact_no;
  }
  return contact_no;

}
saveUserData(form) {
  this.contactValueError = this.contactBoxError();
  if(form.valid && this.contactValueError ) {

    const formData: any = new FormData();
    const body = {}
    body[APP_CONSTANTS.FIRST_NAME] = this.userFirstName;
    body[APP_CONSTANTS.LAST_NAME] = this.userLastName;
    body[APP_CONSTANTS.EMAIL] = this.userEmailName;
    body[APP_CONSTANTS.PASSWORD] = this.userPassword;
    body[APP_CONSTANTS.CONTACT] = this.contactNumber;
    body[APP_CONSTANTS.DOB] = this.birthDate;
    body[APP_CONSTANTS.GENDER] = this.genderValue;
    formData.append('user_data', JSON.stringify(body));
    formData.append('profileImage',  this.selectedImage);
    this._userMgmtService.userSignUp(body, formData).subscribe(response => {
       this.showCustomListMessageDeleted(APP_CONSTANTS.SUCCESS_USER_CREATED);
    }, error => {
      console.log("SignUp error",error);
      
    } )
  }
  else {
    console.log("Error Submit Form", form.invalid);
   
  }
}

showCustomListMessageDeleted(msg) {
  this.messageService.add({ key: 'custom_created', severity: 'success', detail: msg, summary: 'USER CREATED' });
  setTimeout(() =>{ 
    this._router.navigate(['./login']);   
  }, 2000);
}

onFileChange(event) {
  this.userImage;
  if (event.target.files && event.target.files[0]) { // check is any file is there
    const reader = new FileReader(); 
    const file = event.target.files[0] // Get first file as we are not allowing multiple image
    // in case of multiple image use loop on event.target.files and use below code in loop
    reader.onload = (events: any) => { // process to render image at UI for preview
      this.userImage = events.target.result; // get Image to show at UI
      this.selectedImage = file; // get binary image
    };
    reader.readAsDataURL(file);
  }
}
 

}
