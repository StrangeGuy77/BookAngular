import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


// COMPONENTES
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";

// MDBBootstra
import { MDBBootstrapModule } from "angular-bootstrap-md";

@NgModule({
  declarations: [SigninComponent, SignupComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MDBBootstrapModule],
  exports: [FormsModule, ReactiveFormsModule]
})
export class LoginModule { }
