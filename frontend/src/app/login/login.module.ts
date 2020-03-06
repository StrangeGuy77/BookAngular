import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginComponent, SignupComponent],
  exports: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    MDBBootstrapModule,
  ]
})
export class LoginModule { }
