import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators  } from "@angular/forms";
import { UserService } from '../../data/user.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {

  private notifier: NotifierService;

  signUp = new FormGroup({
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    user_email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  data: any;

  constructor(private userservice: UserService, notifier: NotifierService ) {
    this.send();
    this.notifier = notifier;
  }

  showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  ngOnInit() {}

  send() {
    this.data = this.signUp;
    // console.log(this.data);

    if (this.data.invalid) {
      return;
    }

    this.userservice.createUser(this.data.value).subscribe((res: any) => {
      // console.log(res);

      if (res.userId) {
        this.showNotification('success', res.message);
        this.data.reset();
      } else {
        this.showNotification('error', res.message);
      }
    });
  }
}
