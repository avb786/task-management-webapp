import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserManagementService } from './services/user-management.service';
import { HttpClientModule } from '@angular/common/http';
import {ToastModule} from 'primeng/toast';
import { RegisterComponent } from './register/register.component';
import {InputTextModule} from 'primeng/inputtext';
import {Ng2TelInputModule} from 'ng2-tel-input';
import {PasswordModule} from 'primeng/password';
import {RadioButtonModule} from 'primeng/radiobutton';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    FormsModule ,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    InputTextModule,
    Ng2TelInputModule,
    PasswordModule,
    RadioButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ProgressSpinnerModule

  ],
  providers: [UserManagementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
