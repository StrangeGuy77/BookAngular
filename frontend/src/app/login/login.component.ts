import { Component } from '@angular/core';
import { FakeDataService } from '../data/fake-data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  email: string;
  password: string;
  regex: RegExp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  userData = new FakeDataService().arrayTest;

  onClick (event: Event): void {
    event.preventDefault();
    const testEmail: boolean = this.regex.test(this.email);
    if (testEmail && this.email)
    {
      this.userData.push({
        email: this.email,
        password: this.password
      });
    } else
    {

    }
  };

}
