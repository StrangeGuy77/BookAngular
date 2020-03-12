import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../data/user.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit {
  signin = new FormGroup({
    user_email: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  data: any;

  constructor(private userservice: UserService) {
    this.send();
  }

  ngOnInit() {}

  send() {
    this.data = this.signin;
    // console.log(this.data);

    if (this.data.invalid) {
      return;
    }

    this.userservice.loginUser(this.data.value).subscribe((res: any) => {
      if(res.userExist){
        console.log("hola");
      }

    });
  }
}
